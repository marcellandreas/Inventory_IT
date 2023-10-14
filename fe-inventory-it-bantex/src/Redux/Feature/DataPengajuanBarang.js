import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataItemsReq: [],
  loadingPengajuan: true,
};

export const dataPengajuanBarang = createSlice({
  name: "dataPengajuanBarang",
  initialState,
  reducers: {
    setDataItemsReq: (state, action) => {
      state.dataItemsReq = action.payload;
    },
    setLoadingPengajuan: (state, action) => {
      state.loadingPengajuan = action.payload;
    },
  },
});

export const { setDataItemsReq, setLoadingPengajuan } =
  dataPengajuanBarang.actions;
export default dataPengajuanBarang.reducer;
