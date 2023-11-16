import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ContentLayout, MainLayout, DataPc } from "../../components/templates";
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
    <MainLayout>
      <ContentLayout>
        <DataPc />
      </ContentLayout>
    </MainLayout>
  );
};

export default PcMaster;
