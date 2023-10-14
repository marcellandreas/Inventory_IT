import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataPt: [],
  dataDivision: [],
  loadingDivPt: true,
};

export const dataDivisionAndPT = createSlice({
  name: "dataDivisionAndPT",
  initialState,
  reducers: {
    setDataPt: (state, action) => {
      state.dataPt = action.payload;
    },
    setLoadingDivPt: (state, action) => {
      state.loadingDivPt = action.payload;
    },
  },
});

export const { setDataPt, setLoadingDivPt } = dataDivisionAndPT.actions;
export default dataDivisionAndPT.reducer;
