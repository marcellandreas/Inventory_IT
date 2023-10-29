import { useNavigate, useParams } from "react-router-dom";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import { useEffect, useState } from "react";
import { AxiosInstance } from "../../apis/api";
import {
  AdminReqSub,
  UserReqSub,
  ManagerReqSub,
} from "../../components/templates";

const DetailFormItemsRequest = () => {
  const { id_item_req } = useParams();
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  // menampung data
  const [dataStockReq, setDataStockReq] = useState([]);
  const [dataStockSub, setDataStockSub] = useState([]);
  const [status, setStatus] = useState("");
  const [requestType, setRequestType] = useState("");

  // const dispatch = useDispatch();
  // const dataDetailPengajuan = useSelector(
  //   (state) => state.dataSliceItemReq.dataDetailPengajuan
  // );

  // useEffect(() => {
  //   dispatch(fetchDataDetailPengajuan(id_item_req));
  // }, [dispatch, id_item_req]);

  const handleAction = (actionType) => {
    AxiosInstance.put(`form/${actionType}/${id_item_req}`)
      .then((res) => {
        setLoading(true);
        dispatch(fetchDataDetailPengajuan(id_item_req)); // Mengambil data kembali setelah tindakan berhasil
        alert("Berhasil");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(`/form/id/${id_item_req}`);
        console.log(response);
        setStatus(response.data.stock.status);
        setRequestType(response.data.stock.request_type);

        if (response.data.stock.request_type === "REQUEST") {
          const response2 = await AxiosInstance.get(
            `pengajuan/req/${id_item_req}`
          );

          setDataStockReq(response2.data.data);
          console.log("bisa jalan gk");
        } else if (response.data.stock.request_type === "SUBMISSION") {
          const response1 = await AxiosInstance.get(
            `pengajuan/sub/${id_item_req}`
          );
          console.log("bisa jalan gk 2");
          setDataStockSub(response1.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [loading]);

  const handleQtyMinus = () => {
    AxiosInstance.put(`/det-stock/update-multiple`, { updatedData: dataToPut })
      .then((res) => {
        alert("berhasil update qty");
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate();
  const backToMenu = () => {
    navigate(-1);
  };

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
                  onClick={() => {
                    handleQtyMinus;
                    handleAction("approve1");
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
                  <AdminReqSub
                    key={i}
                    data={data}
                    status={status}
                    id={id_item_req}
                  />
                ))}
              </>
            ) : dataStockSub.length !== 0 ? (
              <>
                {dataStockSub?.map((data, i) => (
                  <AdminReqSub
                    key={i}
                    data={data}
                    status={status}
                    id={id_item_req}
                  />
                ))}
              </>
            ) : null}
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
            {dataStockReq.length !== 0 ? (
              <>
                {dataStockReq?.map((data, i) => (
                  <UserReqSub
                    key={i}
                    data={data}
                    status={status}
                    id={id_item_req}
                  />
                ))}
              </>
            ) : dataStockSub.length !== 0 ? (
              <>
                {dataStockSub?.map((data, i) => (
                  <UserReqSub
                    key={i}
                    data={data}
                    status={status}
                    id={id_item_req}
                  />
                ))}
              </>
            ) : null}
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
            {dataStockReq !== 0 ? (
              <>
                {dataStockReq?.map((data, i) => (
                  <ManagerReqSub
                    key={i}
                    data={data}
                    status={status}
                    id={id_item_req}
                  />
                ))}
              </>
            ) : dataStockSub !== 0 ? (
              <>
                {dataStockSub?.map((data, i) => (
                  <ManagerReqSub
                    key={i}
                    data={data}
                    status={status}
                    id={id_item_req}
                  />
                ))}
              </>
            ) : null}
          </section>
        ) : null}
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default DetailFormItemsRequest;
