import { configureStore } from "@reduxjs/toolkit";
import dataState from "./Feature/DataState";
import dataPc from "./Feature/DataPc";
import divPt from "./Feature/DivPtSlice";
import dataPengajuanBarang from "./Feature/DataPengajuanBarang";
import userReducer from "./Feature/UserSlice";
import dataSliceItemReq from "./Feature/ItemsRequest";
import itemsSlice from "./Feature/ItemsSlice";
import stockReducer from "./Feature/StockSlice";
import stockDetailSlice from "./Feature/detailStockslice";
import pcmasterReducer from "./Feature/DataPcMaster";
import requestSubmissionSlice from "./Feature/requestSubmissionSlice";
// import moreSettingSlice from "./Feature/moreSettingSlice";
import authReducer from "./Feature/AuthSlice";
import categoriesSlice from "./Feature/categoriesSlice";

export const store = configureStore({
  reducer: {
    reqSub: requestSubmissionSlice,
    categories: categoriesSlice,
    auth: authReducer,
    dataInventory: dataState,
    dataPc: dataPc,
    pcmaster: pcmasterReducer,
    divPt: divPt,
    // moreSetting: moreSettingSlice,
    dataPengajuanBarang: dataPengajuanBarang,
    users: userReducer,
    dataSliceItemReq: dataSliceItemReq,
    itemsSlice: itemsSlice,
    stocks: stockReducer,
    detailStock: stockDetailSlice,
    // contoh biar ada perubahan unutk comit
  },
});
