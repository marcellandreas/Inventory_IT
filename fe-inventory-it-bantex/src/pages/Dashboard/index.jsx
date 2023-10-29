import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import { Widget } from "../../components/molecules";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AxiosInstance } from "../../apis/api";
import { MdPeopleAlt } from "react-icons/md";

const Dashboard = () => {
  return (
    <Sidebar>
      <LayoutContentDashboard>
        <section className="flex gap-4 flex-col flex-wrap w-full ">
          {/* Title */}
          <section className="grid grid-cols-4 grid-rows-6 gap-4 grid-flow-dense ">
            {/* contet name pt */}
            <div className=" bg-white   text-blue-700 border-blue-700 border-l-4    flex items-center px-6 justify-between py-2 rounded-xl min-h-[50px] row-span-1   col-span-4 sm:col-span-2 md:col-span-2  lg:col-span-1">
              <div className="font-semibold">
                <p className=" uppercase text-md ">Jumlah Stok</p>
                <h3 className="text-3xl">24</h3>
              </div>
              <div className="text-5xl">
                <MdPeopleAlt />
              </div>
            </div>
            <div className=" bg-white   text-green-700 border-green-700 border-l-4    flex items-center px-6 justify-between py-2 rounded-xl min-h-[50px] row-span-1 col-span-4 sm:col-span-2 md:col-span-2  lg:col-span-1">
              <div className="font-semibold">
                <p className=" uppercase text-md ">Jumlah Stok</p>
                <h3 className="text-3xl">24</h3>
              </div>
              <div className="text-5xl">
                <MdPeopleAlt />
              </div>
            </div>
            <div className=" bg-white   text-red-700 border-red-700 border-l-4    flex items-center px-6 justify-between py-2 rounded-xl min-h-[50px] row-span-1 col-span-4 sm:col-span-2 md:col-span-2  lg:col-span-1">
              <div className="font-semibold">
                <p className=" uppercase text-md ">Jumlah Stok</p>
                <h3 className="text-3xl">24</h3>
              </div>
              <div className="text-5xl">
                <MdPeopleAlt />
              </div>
            </div>
            <div className=" bg-white   text-yellow-700 border-yellow-700 border-l-4    flex items-center px-6 justify-between py-2 rounded-xl min-h-[50px] row-span-1 col-span-4 sm:col-span-2 md:col-span-2  lg:col-span-1">
              <div className="font-semibold">
                <p className=" uppercase text-md ">Jumlah Stok</p>
                <h3 className="text-3xl">24</h3>
              </div>
              <div className="text-5xl">
                <MdPeopleAlt />
              </div>
            </div>
            <div className=" bg-slate-200 rounded-xl min-h-[50px] row-span-2 col-span-2 ">
              asdh
            </div>

            <div className=" bg-slate-200 rounded-xl min-h-[50px] col-span- row-span-2  ">
              asdh
            </div>
            <div className=" bg-slate-200 p-4 rounded-xl min-h-[50px] row-span-4 col-span-1 ">
              <div className="text-center mb-5 font-semibold">
                Login Terakhir
              </div>
              {/*  */}
              <div className="flex flex-col gap-2 min-h-fit  ">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div className=" rounded-xl flex w-full ">
                    <div className=" bg-amber-300 w-full p-1 flex justify-around text-slate-700 flex-col ">
                      Username
                      <span className=" font-semibold text-black ">
                        Marcell
                      </span>
                    </div>
                    <div className=" bg-amber-300 w-full p-1 flex justify-around text-slate-700 flex-col  ">
                      Waktu Terakhir{" "}
                      <span className=" font-semibold text-black">Marcell</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className=" bg-slate-200 rounded-xl min-h-[50px]">asdh</div>
            <div className=" bg-slate-200 rounded-xl min-h-[50px]">asdh</div>
          </section>
        </section>
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default Dashboard;
