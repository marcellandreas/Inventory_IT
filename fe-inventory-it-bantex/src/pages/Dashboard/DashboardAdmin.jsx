import { MdPeopleAlt, MdWarehouse } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { CiGrid42 } from "react-icons/ci";
import { Link } from "react-router-dom";
import { TableLatestApplications, Widget } from "../../components/molecules";
import { TableBody, TableHeader } from "../../components/organisms";
import profileImg from "../../assets/images/bg.jpeg";
import "./style.css";
import Timer from "../../components/atoms/Timer";

const DashboardAdmin = ({
  dataLogin,
  dataItems,
  dataUsers,
  dataStocks,
  dataPengajuan,
  dataLatest,
}) => {
  return (
    <section className=" col-span-6 min-h-screen ">
      <section
        style={{
          backgroundImage: `url(${profileImg})`,
          backgroundAttachment: "fixed",
        }}
        className=" h-[35vh] object-cover bg-cover w-full   custom-radius "
      >
        <h1 className=" text-3xl text-white font-semibold flex justify-center items-center h-[25vh] ">
          <MdWarehouse className="mr-2" /> Inventory IT
        </h1>
        <section className="col-span-6 w-full grid grid-cols-4 gap-4 grid-flow-dense justify-between  ">
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
        </section>
      </section>
      <div className="pembatas">_</div>
      <section className="  grid grid-cols-4 gap-4 grid-flow-dense ">
        <div className=" bg-gray-200 rounded-xl row-span-1 md:row-span-4   col-span-4 md:col-span-3 ">
          <TableHeader>
            <div className="flex items-center px-5 justify-between h-[8vh] text-white w-full bg-slate-800 rounded-xl">
              <h1 className="text-xl   font-bold ">Latest</h1>
              <Link
                to={`/form-pengajuan`}
                className=" underline hover:text-blue-500"
              >
                view more
              </Link>
            </div>
          </TableHeader>
          <TableBody>
            <TableLatestApplications data={dataLatest} />
          </TableBody>
        </div>
        <div className=" bg-gray-300  rounded-xl flex flex-col gap-1 h-auto md:min-h-[50px] md:row-span-4 col-span-4 md:col-span-1">
          <TableHeader>
            <h1 className="text-xl flex items-center pl-5 text-white font-bold bg-slate-800 h-[8vh] rounded-xl w-full">
              Login Terakhir
            </h1>
          </TableHeader>

          <div className="flex flex-col gap-1 p-4  flex-wrap bg-gray-200  ">
            {dataLogin?.map((data, i) => (
              <div
                key={i}
                className="flex w-full  bg-white rounded-xl  flex-wrap justify-between  "
              >
                <div className=" rounded-s-md  p-1 flex justify-around text-slate-900 flex-col ">
                  Username
                  <span className=" font-semibold text-gray-700 ">
                    {data.username}
                  </span>
                </div>
                <div className=" rounded-e-md  p-1 flex justify-around text-slate-900 flex-col  ">
                  Waktu Terakhir
                  <span className=" font-semibold text-gray-700">
                    {`${data.last_login_time.slice(0, 10)}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default DashboardAdmin;
