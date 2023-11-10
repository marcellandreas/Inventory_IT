import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import { TableLatestApplications, Widget } from "../../components/molecules";
import { useEffect, useState } from "react";
import { AxiosInstance } from "../../apis/api";
import { MdPeopleAlt } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { Pie, Chart } from "react-chartjs-2";
import {
  useFetchItems,
  useFetchRequestSubmission,
  useFetchStocks,
  useFetchUsers,
} from "../../config/GetData";
import { MdWarehouse } from "react-icons/md";
import { CiGrid42 } from "react-icons/ci";
import { TableBody, TableHeader } from "../../components/organisms";
import { TitleTable } from "../../components/atoms";

const Dashboard = () => {
  const [dataLogin, setDataLogin] = useState([]);
  const [dataLatest, setDataLatest] = useState([]);
  const dataItems = useFetchItems();
  const dataStocks = useFetchStocks();
  const dataUsers = useFetchUsers();
  const dataPengajuan = useFetchRequestSubmission();
  console.log(dataItems);
  useEffect(() => {
    AxiosInstance.get("/auth/latest").then((res) => {
      setDataLogin(res.data);
      console.log(res.data);
    });
  }, []);
  useEffect(() => {
    AxiosInstance.get("form/latest").then((res) => {
      setDataLatest(res.data.data);
      console.log(res.data);
    });
  }, []);
  const data = {
    labels: ["Red", "Green", "Blue"],
    datasets: [
      {
        label: "My Pie Chart",
        data: [30, 50, 20],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  return (
    <Sidebar>
      <LayoutContentDashboard>
        <section className="grid grid-cols-4 gap-4 grid-flow-dense  w-full h-[75vh]  ">
          <Widget
            icon={<ImBooks />}
            nameWidget="Jumlah Items"
            countWidget={dataItems.length}
            border="border-blue-700"
            color="text-blue-700"
          />
          <Widget
            icon={<MdWarehouse />}
            nameWidget="Jumlah Stock"
            countWidget={dataStocks.length}
            border="border-green-700"
            color="text-green-700"
          />
          <Widget
            icon={<MdPeopleAlt />}
            nameWidget="Jumlah Pengguna"
            countWidget={dataUsers.allData.length}
            border="border-red-700"
            color="text-red-700"
          />
          <Widget
            icon={<CiGrid42 />}
            nameWidget="Jumlah Pengajuan"
            countWidget={dataPengajuan.length}
            border="border-yellow-700"
            color="text-yellow-700"
          />

          <div className=" bg-gray-200 rounded-xl row-span-1 md:row-span-4   col-span-4 md:col-span-2 ">
            <TableHeader>
              <TitleTable>Latest Pengajuan</TitleTable>
            </TableHeader>
            <TableBody>
              <TableLatestApplications data={dataLatest} />
            </TableBody>
          </div>

          <div className=" bg-gray-200 rounded-xl min-h-[50px] col-span-4 md:col-span-1 row-span-4  ">
            {/* <Chart type="pie" data={data} /> */}
          </div>
          <div className=" bg-gray-200 p-4 rounded-xl flex flex-col gap-1 h-auto md:min-h-[50px] md:row-span-4 col-span-4 md:col-span-1">
            <div className="text-center text-gray-900 mb-5 font-semibold ">
              Login Terakhir
            </div>
            <div className="flex flex-col gap-1  flex-wrap  ">
              {dataLogin?.map((data, i) => (
                <div
                  key={i}
                  className="flex w-full  flex-wrap xl:flex-nowrap  "
                >
                  <div className=" rounded-s-md bg-teal-500 w-full p-1 flex justify-around text-slate-900 flex-col ">
                    Username
                    <span className=" font-semibold text-gray-700 ">
                      {data.username}
                    </span>
                  </div>
                  <div className=" rounded-e-md bg-teal-500 w-full p-1 flex justify-around text-slate-900 flex-col  ">
                    Waktu Terakhir{" "}
                    <span className=" font-semibold text-gray-700">
                      {`${data.last_login_time.slice(0, 10)}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className=" bg-slate-900 rounded-xl min-h-[50px] row-span-1 md:row-span-2 col-span-4 md:col-span-2 order-3 ">
              Tabel 2
            </div>
            <div className=" bg-slate-200 rounded-xl min-h-[50px] row-span-2">
              asdh
            </div> */}
        </section>
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default Dashboard;
