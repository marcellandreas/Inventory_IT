import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataPcMaster: [],
  dataPcLine: [],
  dataPcMasterById: [],
  dataPcLineByPcNo: [],
  dataItemsUnused: [],
  loadingPc: true,
};

export const dataPc = createSlice({
  name: "dataPc",
  initialState,
  reducers: {
    setDataPcMaster: (state, action) => {
      state.dataPcMaster = action.payload;
    },
    setDataItemsUnused: (state, action) => {
      state.dataItemsUnused = action.payload;
    },
    setLoadingPc: (state, action) => {
      state.loadingPc = action.payload;
    },
    setDataPcMasterById: (state, action) => {
      const PcMasterId = action.payload;
      // state.dataPcMasterById = state.dataPcMaster.find(
      //   (item) => item.id_pc_master === PcMasterId
      // );
      state.dataPcMasterById = state.dataPcMaster.filter(
        (pc) => pc.id_pc_master === PcMasterId
      );
    },
  },
});

export const {
  setDataPcMaster,
  setLoadingPc,
  setDataItemsUnused,
  dataPcMasterById,
} = dataPc.actions;

export default dataPc.reducer;
