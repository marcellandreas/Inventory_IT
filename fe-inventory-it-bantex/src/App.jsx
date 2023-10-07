import { useDispatch } from "react-redux";
import Routers from "./routers";
import { setDataItem, setLoadingItem } from "./Redux/Feature/DataState";
import { useEffect } from "react";
import { AxiosInstance } from "./apis/api";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    AxiosInstance.get("/items")
      .then((res) => {
        dispatch(setDataItem(res.data.data));
        dispatch(setLoadingItem(false));
      })
      .catch((err) => {
        alert("terjadi kesalahan dalam memproses data");
      });
  }, []);
  return <Routers />;
}

export default App;
