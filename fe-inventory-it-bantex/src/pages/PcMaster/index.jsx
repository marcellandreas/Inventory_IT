import { useDispatch, useSelector } from "react-redux";
import { AxiosInstance } from "../../apis/api";
import {
  LayoutContentDashboard,
  Sidebar,
  DataPc,
} from "../../components/templates";
import {
  setDataItemsUnused,
  setDataPcMaster,
  setLoadingPc,
} from "../../Redux/Feature/DataPc";
import { useEffect } from "react";

const PcMaster = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.dataPc.dataItemsUnused);

  const handleFetchError = (err) => {
    console.error("Terjadi kesalahan dalam memproses data:", err);
    alert("Terjadi kesalahan dalam memproses data");
  };

  const fetchData = (url, successAction) => {
    AxiosInstance.get(url)
      .then((res) => {
        dispatch(successAction(res.data.data));
        dispatch(setLoadingPc(false));
      })
      .catch(handleFetchError);
  };

  useEffect(() => {
    fetchData("/pcmaster", setDataPcMaster);
  }, [dispatch]);

  useEffect(() => {
    fetchData("/items/unused", setDataItemsUnused);
  }, [dispatch]);

  console.log("ada", loading);

  return (
    <Sidebar>
      <LayoutContentDashboard>
        <DataPc />
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default PcMaster;
