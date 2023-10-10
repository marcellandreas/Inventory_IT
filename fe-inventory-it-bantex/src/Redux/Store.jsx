import { configureStore } from "@reduxjs/toolkit";
import dataState from "./Feature/DataState";
import dataPc from "./Feature/DataPc";

export const store = configureStore({
  reducer: {
    dataInventory: dataState,
    dataPc: dataPc,
  },
});
