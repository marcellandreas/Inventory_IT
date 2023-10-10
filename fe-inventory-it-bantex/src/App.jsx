import { useDispatch, useSelector } from "react-redux";
import Routers from "./routers";
import { useEffect } from "react";
import { AxiosInstance } from "./apis/api";
import { setDataPcMaster } from "./Redux/Feature/DataPc";

function App() {
  return <Routers />;
}

export default App;
