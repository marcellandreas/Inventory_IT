import { useNavigate, useParams } from "react-router-dom";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import { useEffect, useState } from "react";
import { AxiosInstance } from "../../apis/api";
import QRCode from "qrcode.react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataDetailPengajuan } from "../../Redux/Feature/ItemsRequest";

const DetailFormItemsRequest = () => {
  const { id_item_req } = useParams();
  const role = localStorage.getItem("role");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const dataDetailPengajuan = useSelector(
    (state) => state.dataSliceItemReq.dataDetailPengajuan
  );
  const loading = useSelector((state) => state.dataSliceItemReq.loading);
  const error = useSelector((state) => state.dataSliceItemReq.error);

  useEffect(() => {
    dispatch(fetchDataDetailPengajuan(id_item_req));
  }, [dispatch, id_item_req]);

  const handleAction = (actionType) => {
    AxiosInstance.put(`form/${actionType}/${id_item_req}`)
      .then((res) => {
        dispatch(fetchDataDetailPengajuan(id_item_req)); // Mengambil data kembali setelah tindakan berhasil
        alert("Berhasil");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (dataDetailPengajuan) {
      dataDetailPengajuan.forEach((data) => {
        setStatus(data.status);
      });
    }
  }, [dataDetailPengajuan]);

  const navigate = useNavigate();
  const backToMenu = () => {
    navigate(-1);
  };

  function generateTableRows(submissionData) {
    return (submissionData || Array(5).fill(null)).map((sub, index) => (
      <tr key={index} className="border">
        <td className="border py-0 m-0 border-black">
          {sub ? index + 1 : <p className="text-white">null</p>}
        </td>
        <td className="border py-0 m-0 border-black">
          {sub ? sub.stock_description : ""}
        </td>
        <td className="border py-0 m-0 border-black">{sub ? sub.qty : ""}</td>
        <td className="border py-0 m-0 border-black">{sub ? sub.note : ""}</td>
      </tr>
    ));
  }

  function renderEmptyRows(submissionData) {
    const emptyRows = [];

    if (submissionData && submissionData.length < 5) {
      for (let i = 0; i < 5 - submissionData.length; i++) {
        emptyRows.push(
          <tr key={i + submissionData.length} className="border">
            <td className="border py-0 m-0 border-black">
              <p className="text-white">a</p>
            </td>
            <td className="border py-0 m-0 border-black"></td>
            <td className="border py-0 m-0 border-black"></td>
            <td className="border py-0 m-0 border-black"></td>
          </tr>
        );
      }
    }

    return emptyRows;
  }

  function TableHeaderRow() {
    return (
      <tr className="border py-0 m-0 pl-2">
        <th className="border py-0 m-0 border-black">No</th>
        <th className="border py-0 m-0 border-black">Nama Barang</th>
        <th className="border py-0 m-0 border-black">QTY</th>
        <th className="border py-0 m-0 border-black">Keterangan</th>
      </tr>
    );
  }

  return (
    <Sidebar>
      <LayoutContentDashboard>
        {role == 1 ? (
          <section className="w-full flex flex-col gap-4">
            <div className="flex justify-between">
              <button onClick={backToMenu} className="button">
                Back
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => handleAction("approve1")}
                  disabled={
                    status === "Disetujui1" ||
                    status === "Disetujui2" ||
                    status === "Selesai"
                  }
                  className="button disabled:bg-slate-300"
                >
                  Setuju
                </button>
                <button
                  onClick={() => handleAction("reject")}
                  disabled={
                    status === "Disetujui1" ||
                    status === "Disetujui2" ||
                    status === "Selesai" ||
                    status === "Ditolak"
                  }
                  className="button disabled:bg-slate-300"
                >
                  Tolak
                </button>
              </div>
            </div>
            {dataDetailPengajuan?.map((data, i) => (
              <section
                key={i}
                className="flex bg-white gap-3 flex-col border max-h-[500px] w-full  border-black p-2 "
              >
                <div className=" font-semibold text-center">
                  <h3 className=" text-xl">
                    Form Pengajuan Barang IT {id_item_req}
                  </h3>
                  <p className=" font-normal">Atas beban PT {data.name_pt} </p>
                </div>
                <div className=" font-semibold ">
                  <p>No: {data.no_pengajuan} </p>
                  <p>Tgl: {data.post_date.slice(0, 10)} </p>
                  <p>Bagian: {data.name_division} </p>
                </div>
                <div className="flex flex-col justify-between gap-2  ">
                  <table className=" bg-transparent border">
                    <TableHeaderRow />
                    {generateTableRows(data.submissionData)}
                    {renderEmptyRows(data.submissionData)}
                  </table>

                  <div className="flex justify-around justify-self-end ">
                    <div className="h-32 flex flex-col items-center justify-between">
                      <p>Pemohon</p>
                      {status !== "Ditolak" ? (
                        <QRCode
                          value={`${data.post_username} - ${data.no_pengajuan}`}
                          size={50}
                          fgColor="#000"
                          bgColor="#fff"
                        />
                      ) : null}
                      <p className=" font-semibold">{data.post_username}</p>
                    </div>
                    <div className="h-32 flex flex-col items-center justify-between">
                      <p>Diketahui</p>
                      {status === "Disetujui1" ||
                      status === "Disetujui2" ||
                      status === "Selesai" ? (
                        <QRCode
                          value={`${data.approved_1} - ${data.date_approved_1}`}
                          size={50}
                          fgColor="#000"
                          bgColor="#fff"
                        />
                      ) : null}
                      <p className=" font-semibold">{data.approved_1}</p>
                    </div>
                    <div className="h-32  flex flex-col items-center justify-between">
                      <p>DiSetujui</p>
                      {status === "Disetujui2" || status === "Selesai" ? (
                        <QRCode
                          value={`${data.approved_2} - ${data.date_approved_2}`}
                          size={50}
                          fgColor="#000"
                          bgColor="#fff"
                        />
                      ) : null}
                      <p className=" font-semibold">{data.approved_2}</p>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </section>
        ) : role == 2 ? (
          <section className="w-full flex flex-col gap-4">
            <div className="flex justify-between">
              <button onClick={backToMenu} className="button">
                Back
              </button>

              {status === "Disetujui2" || status === "Selesai" ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAction("finish")}
                    disabled={status === "Selesai"}
                    className="button disabled:bg-slate-300"
                  >
                    Di Terima
                  </button>
                </div>
              ) : null}
            </div>
            {dataDetailPengajuan?.map((data, i) => (
              <section
                key={i}
                className="flex bg-white gap-3 flex-col border max-h-[500px] w-full  border-black p-2 "
              >
                <div className=" font-semibold text-center">
                  <h3 className=" text-xl">
                    Form Pengajuan Barang IT {id_item_req}
                  </h3>
                  <p className=" font-normal">Atas beban PT {data.name_pt} </p>
                </div>
                <div className=" font-semibold ">
                  <p>No: {data.no_pengajuan} </p>
                  <p>Tgl: {data.post_date.slice(0, 10)} </p>
                  <p>Bagian: {data.name_division} </p>
                </div>
                <div className="flex flex-col justify-between gap-2  ">
                  <table className=" bg-transparent border">
                    <TableHeaderRow />
                    {generateTableRows(data.submissionData)}
                    {renderEmptyRows(data.submissionData)}
                  </table>

                  <div className="flex justify-around justify-self-end ">
                    <div className="h-32 flex flex-col items-center justify-between">
                      <p>Pemohon</p>
                      {status !== "Ditolak" ? (
                        <QRCode
                          value={`${data.post_username} - ${data.no_pengajuan}`}
                          size={50}
                          fgColor="#000"
                          bgColor="#fff"
                        />
                      ) : null}
                      <p className=" font-semibold">{data.post_username}</p>
                    </div>
                    <div className="h-32 flex flex-col items-center justify-between">
                      <p>Diketahui</p>
                      {status === "Disetujui1" ||
                      status === "Disetujui2" ||
                      status === "Selesai" ? (
                        <QRCode
                          value={`${data.approved_1} - ${data.date_approved_1}`}
                          size={50}
                          fgColor="#000"
                          bgColor="#fff"
                        />
                      ) : null}
                      <p className=" font-semibold">{data.approved_1}</p>
                    </div>
                    <div className="h-32  flex flex-col items-center justify-between">
                      <p>DiSetujui</p>
                      {status === "Disetujui2" || status === "Selesai" ? (
                        <QRCode
                          value={`${data.approved_2} - ${data.date_approved_2}`}
                          size={50}
                          fgColor="#000"
                          bgColor="#fff"
                        />
                      ) : null}
                      <p className=" font-semibold">{data.approved_2}</p>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </section>
        ) : role == 3 ? (
          <section className="w-full flex flex-col gap-4">
            <div className="flex justify-between">
              <button onClick={backToMenu} className="button">
                Back
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => handleAction("approved2")}
                  disabled={
                    status === "Disetujui2" ||
                    status === "Selesai" ||
                    status === "Diajukan"
                  }
                  className="button disabled:bg-slate-300"
                >
                  Setuju
                </button>
                <button
                  onClick={() => handleAction("reject")}
                  disabled={
                    status === "Disetujui2" ||
                    status === "Ditolak" ||
                    status === "Selesai"
                  }
                  className="button disabled:bg-slate-300"
                >
                  Tolak
                </button>
              </div>
            </div>
            {dataDetailPengajuan?.map((data, i) => (
              <section
                key={i}
                className="flex bg-white gap-3 flex-col border max-h-[500px] w-full  border-black p-2 "
              >
                <div className=" font-semibold text-center">
                  <h3 className=" text-xl">
                    Form Pengajuan Barang IT {id_item_req}
                  </h3>
                  <p className=" font-normal">Atas beban PT {data.name_pt} </p>
                </div>
                <div className=" font-semibold ">
                  <p>No: {data.no_pengajuan} </p>
                  <p>Tgl: {data.post_date.slice(0, 10)} </p>
                  <p>Bagian: {data.name_division} </p>
                </div>
                <div className="flex flex-col justify-between gap-2  ">
                  <table className=" bg-transparent border">
                    <TableHeaderRow />
                    {generateTableRows(data.submissionData)}
                    {renderEmptyRows(data.submissionData)}
                  </table>
                  <div className="flex justify-around justify-self-end ">
                    <div className="h-32 flex flex-col items-center justify-between">
                      <p>Pemohon</p>
                      {status !== "Ditolak" ? (
                        <QRCode
                          value={`${data.post_username} - ${data.no_pengajuan} `}
                          size={50}
                          fgColor="#000"
                          bgColor="#fff"
                        />
                      ) : null}
                      <p className=" font-semibold">{data.post_username}</p>
                    </div>
                    <div className="h-32 flex flex-col items-center justify-between">
                      <p>Diketahui</p>
                      {status === "Disetujui1" ||
                      status === "Disetujui2" ||
                      status === "Selesai" ? (
                        <QRCode
                          value={`${data.approved_1} - ${data.date_approved_1}`}
                          size={50}
                          fgColor="#000"
                          bgColor="#fff"
                        />
                      ) : null}
                      <p className=" font-semibold">{data.approved_1}</p>
                    </div>
                    <div className="h-32  flex flex-col items-center justify-between">
                      <p>DiSetujui</p>
                      {status === "Disetujui2" || status === "Selesai" ? (
                        <QRCode
                          value={`${data.approved_2} - ${data.date_approved_2}`}
                          size={50}
                          fgColor="#000"
                          bgColor="#fff"
                        />
                      ) : null}
                      <p className=" font-semibold">{data.approved_2}</p>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </section>
        ) : null}
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default DetailFormItemsRequest;
