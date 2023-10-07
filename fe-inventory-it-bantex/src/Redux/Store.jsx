import { configureStore } from "@reduxjs/toolkit";
import dataState from "./Feature/DataState";

export const store = configureStore({
  reducer: {
    dataInventory: dataState,
  },
});
