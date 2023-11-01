import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import { Widget } from "../../components/molecules";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AxiosInstance } from "../../apis/api";
import { MdPeopleAlt } from "react-icons/md";
import {
  useFetchItems,
  useFetchRequestSubmission,
  useFetchStocks,
  useFetchUsers,
} from "../../config/GetData";

const Dashboard = () => {
  const [dataLogin, setDataLogin] = useState([]);
  const dataItems = useFetchItems();
  const dataStocks = useFetchStocks();
  const dataUsers = useFetchUsers();
  const dataPengajuan = useFetchRequestSubmission();
  console.log(dataItems);
  useEffect(() => {
    AxiosInstance.get("auth/alllogins").then((res) => {
      setDataLogin(res.data.slice(0, 5));
      console.log(res.data);
    });
  }, []);
  return (
    <Sidebar>
      <LayoutContentDashboard>
        <section className="flex gap-4 flex-col flex-wrap w-full ">
          {/* Title */}
          <section className="grid grid-cols-4 gap-4 grid-flow-dense ">
            {/* contet name pt */}
            <div className=" bg-white   text-blue-700 border-blue-700 border-l-4    flex items-center px-6 justify-between py-2 rounded-xl min-h-[50px] row-span-1   col-span-4 sm:col-span-2 md:col-span-2  lg:col-span-1">
              <div className="font-semibold">
                <p className=" uppercase text-md ">Jumlah Items</p>
                <h3 className="text-3xl">{dataItems.length}</h3>
              </div>
              <div className="text-5xl">
                <MdPeopleAlt />
              </div>
            </div>
            <div className=" bg-white   text-green-700 border-green-700 border-l-4    flex items-center px-6 justify-between py-2 rounded-xl min-h-[50px] row-span-1 col-span-4 sm:col-span-2 md:col-span-2  lg:col-span-1">
              <div className="font-semibold">
                <p className=" uppercase text-md ">Jumlah Stok</p>
                <h3 className="text-3xl">{dataStocks.length}</h3>
              </div>
              <div className="text-5xl">
                <MdPeopleAlt />
              </div>
            </div>
            <div className=" bg-white   text-red-700 border-red-700 border-l-4    flex items-center px-6 justify-between py-2 rounded-xl min-h-[50px] row-span-1 col-span-4 sm:col-span-2 md:col-span-2  lg:col-span-1">
              <div className="font-semibold">
                <p className=" uppercase text-md ">Jumlah Pengguna</p>
                <h3 className="text-3xl">{dataUsers.allData.length}</h3>
              </div>
              <div className="text-5xl">
                <MdPeopleAlt />
              </div>
            </div>
            <div className=" bg-white   text-yellow-700 border-yellow-700 border-l-4    flex items-center px-6 justify-between py-2 rounded-xl min-h-[50px] row-span-1 col-span-4 sm:col-span-2 md:col-span-2  lg:col-span-1">
              <div className="font-semibold">
                <p className=" uppercase text-md ">Jumlah Pengajuan</p>
                <h3 className="text-3xl">{dataPengajuan.length}</h3>
              </div>
              <div className="text-5xl">
                <MdPeopleAlt />
              </div>
            </div>
            <div className=" bg-slate-200 rounded-xl min-h-[50px] row-span-1 md:row-span-2   col-span-4 md:col-span-2 ">
              Table 1
            </div>

            <div className=" bg-slate-200 rounded-xl min-h-[50px] col-span- row-span-2  ">
              asdh
            </div>
            <div className=" bg-slate-200 p-4 rounded-xl min-h-[50px] md:row-span-4 col-span-2 md:col-span-1 ">
              <div className="text-center mb-5 font-semibold">
                Login Terakhir
              </div>
              {/*  */}
              <div className="flex flex-col gap-2 min-h-fit flex-wrap  ">
                {dataLogin?.map((data, i) => (
                  <div
                    key={i}
                    className=" rounded-xl flex w-full flex-wrap xl:flex-nowrap  "
                  >
                    <div className=" bg-amber-300 w-full p-1 flex justify-around text-slate-700 flex-col ">
                      Username
                      <span className=" font-semibold text-black ">
                        {data.username}
                      </span>
                    </div>
                    <div className=" bg-amber-300 w-full p-1 flex justify-around text-slate-700 flex-col  ">
                      Waktu Terakhir{" "}
                      <span className=" font-semibold text-black">
                        {`${data.last_login.slice(0, 10)}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className=" bg-slate-900 rounded-xl min-h-[50px] row-span-1 md:row-span-2 col-span-4 md:col-span-2 order-3 ">
              Tabel 2
            </div>
            <div className=" bg-slate-200 rounded-xl min-h-[50px] row-span-2">
              asdh
            </div>
          </section>
        </section>
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default Dashboard;
