import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataItem: [],
  loadingItem: true,
};

export const dataState = createSlice({
  name: "dataInventory",
  initialState,
  reducers: {
    setDataItem: (state, action) => {
      state.dataItem = action.payload;
    },
    setLoadingItem: (state, action) => {
      state.loadingItem = action.payload;
    },
  },
});

export const { setDataItem, setLoadingItem } = dataState.actions;

export default dataState.reducer;
