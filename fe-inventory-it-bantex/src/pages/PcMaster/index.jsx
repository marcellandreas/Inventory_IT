import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  LayoutContentDashboard,
  Sidebar,
  DataPc,
} from "../../components/templates";
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
