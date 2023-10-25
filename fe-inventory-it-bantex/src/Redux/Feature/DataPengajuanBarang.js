import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  dataItemsReq: [],
  loadingPengajuan: true,
  dataItemsByStatusAndUsername: [],
};

export const dataPengajuanBarang = createSlice({
  name: "dataPengajuanBarang",
  initialState,
  reducers: {
    setDataItemsReq: (state, action) => {
      state.dataItemsReq = action.payload;
    },
    setDataItemsByStatusAndUsername: (state, action) => {
      state.dataItemsByStatusAndUsername = action.payload;
    },
    setLoadingPengajuan: (state, action) => {
      state.loadingPengajuan = action.payload;
    },
  },
});

export const {
  setDataItemsReq,
  setLoadingPengajuan,
  setDataItemsByStatusAndUsername,
} = dataPengajuanBarang.actions;
export default dataPengajuanBarang.reducer;
