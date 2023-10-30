import { useDispatch } from "react-redux";
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
import {
  fetchItemsUnusedForPcMaster,
  fetchPcMasterData,
} from "../../Redux/Feature/DataPcMaster";

const PcMaster = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPcMasterData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchItemsUnusedForPcMaster());
  }, [dispatch]);

  return (
    <Sidebar>
      <LayoutContentDashboard>
        <DataPc />
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default PcMaster;
