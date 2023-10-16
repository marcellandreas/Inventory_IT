import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Dashboard,
  LoginPage,
  StockPage,
  ItemsPage,
  NotFoundAfter,
  NotFoundBefore,
  ReportsPage,
  AccesPage,
  PcMasterPage,
  PcLinePage,
  GetAllPcMasterPage,
  BarcodePrinterPage,
  QrcodePrinterPage,
  GetUnusedItemsPage,
  AddComponentsPcPage,
  ApplicationsPage,
  MakeAGoodReqPage,
  DetailFormItemsReqPage,
  PrintPage,
  SetUpReqPage,
} from "../pages";
import { PrivateRoute, ProtectRoute } from "./Routing";
const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectRoute />}>
          <Route path="/login" element={<LoginPage />}></Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/*" element={<NotFoundAfter />}></Route>
          <Route path="/">
            <Route index element={<Dashboard />}></Route>
          </Route>
          <Route path="/stock">
            <Route index element={<StockPage />}></Route>
          </Route>
          <Route path="/items">
            <Route index element={<ItemsPage />}></Route>
          </Route>
          <Route path="/pc-master">
            <Route index element={<PcMasterPage />}></Route>
            <Route path="detail" element={<GetAllPcMasterPage />}></Route>
            <Route path="unused" element={<GetUnusedItemsPage />}></Route>
            <Route
              path="add-components"
              element={<AddComponentsPcPage />}
            ></Route>
          </Route>

          <Route path="/form-pengajuan">
            <Route index element={<ApplicationsPage />} />
            <Route path="buat" element={<MakeAGoodReqPage />} />
            <Route path="set-up" element={<SetUpReqPage />} />
            <Route
              path="detail/:id_item_req"
              element={<DetailFormItemsReqPage />}
            />
          </Route>
          <Route path="/pc-line">
            <Route index element={<PcLinePage />}></Route>
          </Route>
          <Route path="/employess">
            <Route index element={<AccesPage />}></Route>
          </Route>
          <Route path="/printPage">
            <Route index element={<PrintPage />}></Route>
          </Route>
          <Route path="/barcode">
            <Route index element={<BarcodePrinterPage />}></Route>
          </Route>
          <Route path="/qrcode">
            <Route index element={<QrcodePrinterPage />}></Route>
          </Route>
          <Route path="/reports">
            <Route index element={<ReportsPage />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
