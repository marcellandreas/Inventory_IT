import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosInstance } from "../../apis/api";
import {
  AdminReqSub,
  UserReqSub,
  ManagerReqSub,
} from "../../components/templates";
import { MainLayout, ContentLayout } from "../../components/templates";
import { BackButton } from "../../components/atoms";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataDetailPengajuan } from "../../Redux/Feature/ItemsRequest";
import FormPengajuan from "../../components/templates/RequestSubmission";

const DetailFormItemsRequest = () => {
  const { id_item_req } = useParams();
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  // menampung data
  const [dataStockReq, setDataStockReq] = useState([]);
  console.log(dataStockReq);
  const [dataStockSub, setDataStockSub] = useState([]);
  const [status, setStatus] = useState("");
  const [requestType, setRequestType] = useState("");
  const dispatch = useDispatch();
  const dataDetailPengajuan = useSelector(
    (state) => state.dataSliceItemReq.dataDetailPengajuan
  );

  useEffect(() => {
    dispatch(fetchDataDetailPengajuan(id_item_req));
  }, [dispatch, id_item_req]);

  const handleAction = (actionType) => {
    AxiosInstance.put(`form/${actionType}/${id_item_req}`)
      .then((res) => {
        setLoading(true);
        dispatch(fetchDataDetailPengajuan(id_item_req));
      })
      .catch((err) => console.log(err));
  };

  const [usernamePengguna, setUsernamePengguna] = useState("");
  const [adminUsername, setAdminUserName] = useState("");
  const [managerUsername, setManagerUsername] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(`/form/id/${id_item_req}`);
        setUsernamePengguna(response.data.data.post_username);
        setAdminUserName(response.data.data.approved_1);
        setManagerUsername(response.data.data.approved_2);
        setStatus(response.data.data.status);
        setRequestType(response.data.data.request_type);

        if (response.data.data.request_type === "REQUEST") {
          const response2 = await AxiosInstance.get(
            `pengajuan/req/${id_item_req}`
          );

          setDataStockReq(response2.data.data);
        } else if (response.data.data.request_type === "SUBMISSION") {
          const response1 = await AxiosInstance.get(
            `pengajuan/sub/${id_item_req}`
          );
          setDataStockSub(response1.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [loading, id_item_req]);

  // KODE UNTUK MENDAPATKAN NAMA LENGKAP BERDASARKAN USERNAME NYA

  const [userFullName, setUserFullName] = useState("");
  const [AdminFullName, setAdminFullName] = useState("");
  const [managerFullName, setManagerFullName] = useState("");

  useEffect(() => {
    const fetchDataByUsername = async (username, setFullName) => {
      if (username) {
        try {
          const response = await AxiosInstance.get(
            `/auth/datausername/${username}`
          );
          setFullName(response.data.full_name);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchDataByUsername(adminUsername, setAdminFullName);
    fetchDataByUsername(usernamePengguna, setUserFullName);
    fetchDataByUsername(managerUsername, setManagerFullName);
  }, [adminUsername, usernamePengguna, managerUsername]);

  // =======================================================================
  console.log(userFullName);

  // const stockNos = dataStockReq[0]?.submissionData.map((item) => item.stock_no);
  // const stockNosSub = dataStockSub[0]?.submissionData.map(
  //   (item) => item.stock_no
  // );

  // console.log("req", dataStockReq);
  // const dataDetailPost = dataStockReq[0]?.submissionData.map((item) => ({
  //   id_detail_stock: item.Id_submission_items || null,
  //   qty: item.qty || null,
  // }));

  const stockNos = dataStockReq[0]?.submissionData.map((item) => item.stock_no);
  const stockNosSub = dataStockSub[0]?.submissionData.map(
    (item) => item.stock_no
  );

  const dataDetailPost = dataStockReq[0]?.submissionData.map((item) => ({
    id_detail_stock: item.id_detail_stock, // kenapa bisa null
    qty: item.qty,
  }));

  console.log(dataDetailPost, "data detail ");
  console.log(stockNos, "data stock");

  const [MAX_QTY, SET_MAX_QTY] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      if (dataDetailPost.length > 0) {
        try {
          const res = await AxiosInstance.get(
            `/det-stock/id/${dataDetailPost[0]?.id_detail_stock}`
          );
          SET_MAX_QTY(res.data.data.qty);
          console.log(res.data.data.qty);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [dataDetailPost]);

  const handleQtyMinus = async () => {
    const qtyUser = dataDetailPost[0]?.qty <= MAX_QTY;
    if (requestType === "REQUEST") {
      if (qtyUser) {
        try {
          await AxiosInstance.put(`/det-stock/update-multiple`, dataDetailPost);
          alert("berhasil approved");

          console.log(dataDetailPost);
          handleAction("approve1");

          const stockNoPromises = stockNos.map((stockNo) => {
            return AxiosInstance.put(`/stocks/${stockNo}/stock_qty`);
          });

          await Promise.all(stockNoPromises);
        } catch (error) {
          console.error(error);
        }
      } else {
        alert(
          `maaf, jumlah qty tidak menyukupi untuk melakukan approved. sisa barang: ${MAX_QTY}`
        );
      }
    } else if (requestType === "SUBMISSION") {
      try {
        const dataDetailPost = dataStockSub[0]?.submissionData.map((item) => ({
          stock_no: item.stock_no,
          stock_detail_description: item.stock_description,
          qty: item.qty,
          brand: item.brand,
          additional_info: item.additional_info || null,
          note: item.note,
        }));
        await AxiosInstance.post("/det-stock", dataDetailPost);
        await Promise.all([request2]);

        await AxiosInstance.put(`/det-stock/update-plus`, dataDetailPost);
        alert("berhasil update qty");

        const stockNoPromises = stockNosSub.map((stockNo) => {
          return AxiosInstance.put(`/stocks/${stockNo}/stock_qty`);
        });

        await Promise.all(stockNoPromises);
        handleAction("approve1");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const navigate = useNavigate();
  const backToMenu = () => {
    navigate(-1);
  };

  return (
    <MainLayout>
      <ContentLayout>
        {role == 1 ? (
          <section className=" col-span-6 flex flex-col gap-4">
            <div className="flex justify-between">
              <BackButton onClick={backToMenu} />
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleQtyMinus();
                  }}
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
            {dataStockReq.length !== 0 ? (
              <>
                {dataStockReq?.map((data, i) => (
                  <FormPengajuan
                    key={i}
                    data={data}
                    status={status}
                    id={id_item_req}
                    userFullName={userFullName}
                    adminFullName={AdminFullName}
                    managerFullName={managerFullName}
                  />
                ))}
              </>
            ) : dataStockSub.length !== 0 ? (
              <>
                {dataStockSub?.map((data, i) => (
                  <FormPengajuan
                    key={i}
                    data={data}
                    status={status}
                    id={id_item_req}
                    userFullName={userFullName}
                    adminFullName={AdminFullName}
                    managerFullName={managerFullName}
                  />
                ))}
              </>
            ) : null}
          </section>
        ) : role == 2 ? (
          <section className="col-span-6 flex flex-col gap-4">
            <div className="flex justify-between">
              <BackButton onClick={backToMenu} />

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
            {dataStockReq.length !== 0 ? (
              <>
                {dataStockReq?.map((data, i) => (
                  <FormPengajuan
                    key={i}
                    data={data}
                    status={status}
                    id={id_item_req}
                    userFullName={userFullName}
                    adminFullName={AdminFullName}
                    managerFullName={managerFullName}
                  />
                ))}
              </>
            ) : dataStockSub.length !== 0 ? (
              <>
                {dataStockSub?.map((data, i) => (
                  <FormPengajuan
                    key={i}
                    data={data}
                    status={status}
                    id={id_item_req}
                    userFullName={userFullName}
                    adminFullName={AdminFullName}
                    managerFullName={managerFullName}
                  />
                ))}
              </>
            ) : null}
          </section>
        ) : role == 3 ? (
          <section className="col-span-6 flex flex-col gap-4">
            <div className="flex justify-between">
              <BackButton onClick={backToMenu} />

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleAction("approve2");
                  }}
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
            {dataStockReq.length !== 0 ? (
              <>
                {dataStockReq?.map((data, i) => (
                  <FormPengajuan
                    key={i}
                    data={data}
                    status={status}
                    id={id_item_req}
                    userFullName={userFullName}
                    adminFullName={AdminFullName}
                    managerFullName={managerFullName}
                  />
                ))}
              </>
            ) : dataStockSub.length !== 0 ? (
              <>
                {dataStockSub?.map((data, i) => (
                  <FormPengajuan
                    key={i}
                    data={data}
                    status={status}
                    id={id_item_req}
                    userFullName={userFullName}
                    adminFullName={AdminFullName}
                    managerFullName={managerFullName}
                  />
                ))}
              </>
            ) : null}
          </section>
        ) : null}
      </ContentLayout>
    </MainLayout>
  );
};

export default DetailFormItemsRequest;
