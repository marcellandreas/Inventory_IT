// AuthTemp.js
import React from "react";
import { MdWarehouse } from "react-icons/md";

import image from "../../../assets/images/login.png";

const AuthTemp = ({ children }) => {
  return (
    <section className="grid  grid-cols-8 w-full h-screen  gap-4 grid-flow-dense bg-slate-200 ">
      <section className="flex flex-col order-2 row-span-1 lg:order-1 gap-5 col-span-8 lg:col-span-3 w-full justify-center items-center md:bg-white md:rounded-3xl p-5 ">
        <h1 className="text-3xl gap-2 flex  font-medium text-slate-800 capitalize">
          <span className=" self-end">
            <MdWarehouse />
          </span>
          <span>Inventory IT</span>
        </h1>
        {children}
      </section>

      <div className="p-5 col-span-8 order-1 row-span-1 lg:order-2 lg:col-span-5 w-full flex justify-center items-center">
        <img src={image} className="w-40 md:w-60 lg:w-96 " alt="" />
      </div>
    </section>
  );
};

export default AuthTemp;
