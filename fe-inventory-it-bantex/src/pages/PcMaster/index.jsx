import { useDispatch, useSelector } from "react-redux";
import { AxiosInstance } from "../../apis/api";
import {
  LayoutContentDashboard,
  Sidebar,
  DataPc,
} from "../../components/templates";
import { setDataPcMaster, setLoadingPc } from "../../Redux/Feature/DataPc";
import { useEffect } from "react";

const PcMaster = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.dataPc.loadingPc);

  useEffect(() => {
    AxiosInstance.get("/pcmaster")
      .then((res) => {
        dispatch(setDataPcMaster(res.data.data));
        dispatch(setLoadingPc(false));
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [dispatch, loading]);
  return (
    <Sidebar>
      <LayoutContentDashboard>
        <DataPc />
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default PcMaster;
