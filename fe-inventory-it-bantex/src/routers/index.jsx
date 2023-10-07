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
} from "../pages";
import { PrivateRoute, ProtectRoute } from "./Routing";
import BarcodePrinter from "../pages/Barcode";
import QrcodePrinter from "../pages/QrCode";
import PcLine from "../components/molecules/doc/PcLine";
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
          </Route>
          <Route path="/pc-line">
            <Route index element={<PcLinePage />}></Route>
          </Route>
          <Route path="/employess">
            <Route index element={<AccesPage />}></Route>
          </Route>
          <Route path="/barcode">
            <Route index element={<BarcodePrinter />}></Route>
          </Route>
          <Route path="/qrcode">
            <Route index element={<QrcodePrinter />}></Route>
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
