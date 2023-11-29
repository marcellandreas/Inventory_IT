// ==== === === === === === === === Dashboard Pages === === ==== === === === === === //
export { default as Dashboard } from "./Dashboard";

// ==== === === === === === === === Set Ups Pages === === ==== === === === === === //
export { default as Setup } from "./Setup";

// ==== === === === === === === === Auth Pages === === ==== === === === === === //
export { default as Login } from "./Auth/LoginPage";
export { default as Register } from "./Auth/RegisterPage";
export { default as Profile } from "./Auth/ProfilePage";

// ==== === === === === === === === Items Pages === === ==== === === === === === //
export { default as ItemsPage } from "./Items";
export { default as BarcodePrinterPage } from "./Items/Barcode";
export { default as QrcodePrinterPage } from "./Items/QrCode";

// ==== === === === === === === === Access Pages === === ==== === === === === === //
export { default as AccesPage } from "./Access";

// ==== === === === === === === === Applications Pages === === ==== === === === === === //
export { default as ApplicationsPage } from "./Applications";
export { default as MakeAGoodReqPage } from "./Applications/MakeAGoodsRequest";
export { default as PrintPage } from "./Applications/PrintPage";
export { default as DetailFormItemsReqPage } from "./Applications/DetailFormItemsRequest";

// ==== === === === === === === === Not Found Pages === === ==== === === === === === //
export { default as NotFoundAfter } from "./NotFound/NotFoundAfterLoginPage";
export { default as NotFoundBefore } from "./NotFound/NotFoundBeforeLoginPage";

// ==== === === === === === === === Pc Master Pages === === ==== === === === === === //
export { default as PcMasterPage } from "./PcMaster";
export { default as GetAllPcMasterPage } from "./PcMaster/GetAllPcMaster";
export { default as GetUnusedItemsPage } from "./PcMaster/GetUnusedItems";
export { default as AddComponentsPcPage } from "./PcMaster/AddComponentsPc";
export { default as PersonalComputer } from "./PcMaster/PersonalComputer";

// ==== === === === === === === === Stocks Pages === === ==== === === === === === //
export { default as StockPage } from "./Stock";
export { default as AddStocksPage } from "./Stock/AddComponetsStocks";
export { default as EditDelStocksPage } from "./Stock/EditDelComponetsStocks";
export { default as DetailStock } from "./Stock2/DetailStock2";
