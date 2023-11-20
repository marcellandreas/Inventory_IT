import { configureStore } from "@reduxjs/toolkit";
import dataState from "./Feature/DataState";
import dataPc from "./Feature/DataPc";
import dataDivisionAndPT from "./Feature/DataDivisionAndPT";
import dataPengajuanBarang from "./Feature/DataPengajuanBarang";
import userReducer from "./Feature/UserSlice";
import dataSliceItemReq from "./Feature/ItemsRequest";
import itemsSlice from "./Feature/ItemsSlice";
import stockReducer from "./Feature/StockSlice";
import stockDetailSlice from "./Feature/detailStockslice";
import pcmasterReducer from "./Feature/DataPcMaster";
import requestSubmissionSlice from "./Feature/requestSubmissionSlice";
import moreSettingSlice from "./Feature/moreSettingSlice";
import authReducer from "./Feature/AuthSlice";

export const store = configureStore({
  reducer: {
    reqSub: requestSubmissionSlice,
    auth: authReducer,
    dataInventory: dataState,
    dataPc: dataPc,
    pcmaster: pcmasterReducer,
    dataDivisionAndPT: dataDivisionAndPT,
    moreSetting: moreSettingSlice,
    dataPengajuanBarang: dataPengajuanBarang,
    users: userReducer,
    dataSliceItemReq: dataSliceItemReq,
    itemsSlice: itemsSlice,
    stocks: stockReducer,
    detailStock: stockDetailSlice,
    // contoh biar ada perubahan unutk comit
  },
});
