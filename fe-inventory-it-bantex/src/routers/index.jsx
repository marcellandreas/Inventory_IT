import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Dashboard,
  StockPage,
  ItemsPage,
  NotFoundAfter,
  AccesPage,
  PcMasterPage,
  GetAllPcMasterPage,
  BarcodePrinterPage,
  QrcodePrinterPage,
  GetUnusedItemsPage,
  AddComponentsPcPage,
  ApplicationsPage,
  MakeAGoodReqPage,
  DetailFormItemsReqPage,
  PrintPage,
  DetailStock,
  AddStocksPage,
  EditDelStocksPage,
  Login,
  Register,
  Profile,
} from "../pages";
import { PrivateRoute, ProtectRoute } from "./Routing";
import NewApplications from "../pages/Applications/NewApplications";
import PersonalComputer from "../pages/PcMaster/PersonalComputer";
import Stock2Page from "../pages/Stock2";
import AddItems from "../pages/Items/AddItems";
import SetUp from "../pages/Setup";
const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* Private Route */}
        <Route element={<PrivateRoute />}>
          <Route path="/*" element={<NotFoundAfter />} />
          <Route path="/">
            <Route index element={<Dashboard />} />
          </Route>

          {/* Menambahkan path Stocks */}
          <Route path="/stock">
            <Route index element={<StockPage />} />
            <Route path="buat" element={<AddStocksPage />} />
            <Route path="ubah/:stock_no" element={<EditDelStocksPage />} />
            <Route path="detail/:id" element={<DetailStock />} />
          </Route>
          <Route path="/stock-2">
            <Route index element={<Stock2Page />} />
            <Route path="detail/:id" element={<DetailStock />} />
            <Route path="buat" element={<AddStocksPage />} />
            <Route path="ubah/:stock_no" element={<EditDelStocksPage />} />
          </Route>

          {/* Menambahkan path items */}
          <Route path="/items">
            <Route index element={<ItemsPage />}></Route>
            <Route path="buat" element={<AddItems />} />
          </Route>
          <Route path="/profile">
            <Route index element={<Profile />}></Route>
          </Route>

          {/* Menambahkan path pc master */}
          <Route path="/pc-master">
            <Route index element={<PcMasterPage />} />
            <Route path="detail" element={<GetAllPcMasterPage />} />
            <Route path="unused" element={<GetUnusedItemsPage />} />
            <Route path="add-components" element={<AddComponentsPcPage />} />
          </Route>
          <Route path="/personal-computer">
            <Route index element={<PersonalComputer />} />
          </Route>

          {/* Menambahkan path form pengajuan */}
          <Route path="/form-pengajuan">
            <Route index element={<ApplicationsPage />} />
            <Route path="buat" element={<MakeAGoodReqPage />} />
            <Route path="new" element={<NewApplications />} />
            <Route
              path="detail/:id_item_req"
              element={<DetailFormItemsReqPage />}
            />
            <Route path="print" element={<PrintPage />} />
          </Route>

          <Route path="/employess">
            <Route index element={<AccesPage />}></Route>
          </Route>

          <Route path="/setup">
            <Route index element={<SetUp />}></Route>
          </Route>

          <Route path="/barcode">
            <Route index element={<BarcodePrinterPage />}></Route>
          </Route>
          <Route path="/qrcode">
            <Route index element={<QrcodePrinterPage />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
