import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Dashboard, Login, Stock, NotFound } from "../pages";
import Users from "../pages/Users";
import { PrivateRoute, ProtectRoute } from "./Routing";
const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectRoute />}>
          <Route path="/login" element={<Login />}></Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/*" element={<NotFound />}></Route>
          <Route path="/">
            <Route index element={<Dashboard />}></Route>
          </Route>
          <Route path="/stock">
            <Route index element={<Stock />}></Route>
          </Route>
          <Route path="/employess">
            <Route index element={<Users />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
