import { MainLayout, ContentLayout } from "../../components/templates";
import { useEffect, useState } from "react";
import { AxiosInstance } from "../../apis/api";
import {
  useFetchItems,
  useFetchRequestSubmission,
  useFetchStocks,
  useFetchUsers,
} from "../../config/GetData";
import DashboardUser from "./DashboardUsers";
import DashboardAdmin from "./DashboardAdmin";

const Dashboard = () => {
  const [dataLogin, setDataLogin] = useState([]);
  const [dataLatest, setDataLatest] = useState([]);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const dataItems = useFetchItems();
  const dataStocks = useFetchStocks();
  const dataUsers = useFetchUsers();
  const dataPengajuan = useFetchRequestSubmission();
  useEffect(() => {
    AxiosInstance.get("/auth/latest").then((res) => {
      setDataLogin(res.data);
    });
  }, []);
  useEffect(() => {
    AxiosInstance.get("form/latest").then((res) => {
      setDataLatest(res.data.data);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await AxiosInstance.get("auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // const authData = useSelector((state) => state.auth);
  // Sekarang Anda dapat mengakses properti dari objek authData
  // const { token, role, codeUser, idUser, username, email, fullName } = authData;
  return (
    <MainLayout>
      <ContentLayout>
        {role == 2 ? (
          <DashboardUser username={username} />
        ) : (
          <DashboardAdmin
            dataItems={dataItems}
            dataLatest={dataLatest}
            dataLogin={dataLogin}
            dataPengajuan={dataPengajuan}
            dataUsers={dataUsers}
            dataStocks={dataStocks}
          />
        )}
      </ContentLayout>
    </MainLayout>
  );
};

export default Dashboard;
