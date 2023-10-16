import { useNavigate, useParams } from "react-router-dom";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import { useEffect, useState } from "react";
import { AxiosInstance } from "../../apis/api";

const DetailFormItemsRequest = () => {
  const { id_item_req } = useParams();
  const [dataDetailPengajuan, setDataDetailPengajuan] = useState();
  useEffect(() => {
    AxiosInstance.get(`pengajuan/form/${id_item_req}`)
      .then((res) => {
        setDataDetailPengajuan(res.data.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const navigate = useNavigate();
  const backToMenu = () => {
    navigate(-1);
  };
  return (
    <Sidebar>
      <LayoutContentDashboard>
        <section className="w-full flex flex-col gap-4">
          <div>
            <button onClick={backToMenu} className="button">
              Back
            </button>
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
                <p>Tgl: {data.item_req_date.slice(0, 10)} </p>
                <p>Bagian: {data.name_division} </p>
              </div>
              <div className="flex flex-col justify-between gap-2  ">
                <table className=" bg-transparent border">
                  <tr className="border py-0 m-0 pl-2">
                    <th className="border py-0 m-0 border-black">No</th>
                    <th className="border py-0 m-0 border-black">
                      Nama Barang
                    </th>
                    <th className="border py-0 m-0 border-black">QTY</th>
                    <th className="border py-0 m-0 border-black">Keterangan</th>
                  </tr>
                  {(data.submissionData || Array(5).fill(null)).map(
                    (sub, index) => (
                      <tr key={index} className="border">
                        <td className="border py-0 m-0 border-black">
                          {sub ? index + 1 : <p className="text-white">null</p>}
                        </td>
                        <td className="border py-0 m-0 border-black">
                          {sub ? sub.stock_description : ""}
                        </td>
                        <td className="border py-0 m-0 border-black">
                          {sub ? sub.qty : ""}
                        </td>
                        <td className="border py-0 m-0 border-black">
                          {sub ? sub.note : ""}
                        </td>
                      </tr>
                    )
                  )}
                  {data.submissionData?.length < 5 &&
                    // Mengisi baris kosong jika data kurang dari 5
                    new Array(5 - data.submissionData.length)
                      .fill(null)
                      .map((_, index) => (
                        <tr
                          key={index + data.submissionData.length}
                          className="border"
                        >
                          <td className="border py-0 m-0 border-black">
                            <p className=" text-white">a</p>
                          </td>
                          <td className="border py-0 m-0 border-black"></td>
                          <td className="border py-0 m-0 border-black"></td>
                          <td className="border py-0 m-0 border-black"></td>
                        </tr>
                      ))}
                </table>

                <div className="flex justify-around justify-self-end ">
                  <div className="h-32 flex flex-col items-center justify-between">
                    <p>Pemohon</p>
                    <p className=" font-semibold">Nama Jelas</p>
                  </div>
                  <div className="h-32 flex flex-col items-center justify-between">
                    <p>Diketahui</p>
                    <p className=" font-semibold">Nama Jelas</p>
                  </div>
                  <div className="h-32  flex flex-col items-center justify-between">
                    <p>DiSetujui</p>
                    <p className=" font-semibold">Nama Jelas</p>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </section>
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default DetailFormItemsRequest;
