export { default as Dashboard } from "./Dashboard";

// folder AUTH
export { default as Login } from "./Auth/LoginPage";
export { default as Register } from "./Auth/RegisterPage";
export { default as Profile } from "./Auth/ProfilePage";

export { default as ItemsPage } from "./Items";
export { default as AccesPage } from "./Access";
export { default as BarcodePrinterPage } from "./PrintPage/Barcode";
export { default as QrcodePrinterPage } from "./PrintPage/QrCode";
export { default as PrintPage } from "./Applications/PrintPage";

// APPLICATIONS GOOD REQ
export { default as ApplicationsPage } from "./Applications";
export { default as MakeAGoodReqPage } from "./Applications/MakeAGoodsRequest";
export { default as DetailFormItemsReqPage } from "./Applications/DetailFormItemsRequest";

// Not Found Pages
export { default as NotFoundAfter } from "./NotFound/NotFoundAfterLoginPage";
export { default as NotFoundBefore } from "./NotFound/NotFoundBeforeLoginPage";

// folder Pc Master
export { default as PcMasterPage } from "./PcMaster";
export { default as GetAllPcMasterPage } from "./PcMaster/GetAllPcMaster";
export { default as GetUnusedItemsPage } from "./PcMaster/GetUnusedItems";
export { default as AddComponentsPcPage } from "./PcMaster/AddComponentsPc";
export { default as PersonalComputer } from "./PcMaster/PersonalComputer";

// folder stock
export { default as StockPage } from "./Stock";
export { default as AddStocksPage } from "./Stock/AddComponetsStocks";
export { default as EditDelStocksPage } from "./Stock/EditDelComponetsStocks";
export { default as DetailStock } from "./Stock2/DetailStock2";
