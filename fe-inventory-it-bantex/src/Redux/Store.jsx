import { configureStore } from "@reduxjs/toolkit";
import dataState from "./Feature/DataState";
import dataPc from "./Feature/DataPc";
import dataDivisionAndPT from "./Feature/DataDivisionAndPT";
import dataPengajuanBarang from "./Feature/DataPengajuanBarang";
import userReducer from "./Feature/UserSlice";
import dataSliceItemReq from "./Feature/ItemsRequest";

export const store = configureStore({
  reducer: {
    dataInventory: dataState,
    dataPc: dataPc,
    dataDivisionAndPT: dataDivisionAndPT,
    dataPengajuanBarang: dataPengajuanBarang,
    user: userReducer,
    dataSliceItemReq: dataSliceItemReq,
  },
});
