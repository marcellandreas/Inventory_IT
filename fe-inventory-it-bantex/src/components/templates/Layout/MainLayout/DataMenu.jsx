import { NavLink } from "react-router-dom";
import React from "react";
const DataMenu = ({ menu, i, isOpen }) => {
  return (
    <NavLink
      to={menu?.path}
      activestyle="active"
      className={` group flex items-center text-sm gap-2 font-medium p-2 hover:bg-white hover:text-slate-800 rounded-md `}
    >
      <div>{React.createElement(menu?.icon, { size: "20" })}</div>
      <h2
        style={{
          transitionDelay: `${i + 3}00ms`,
        }}
        className={`whitespace-pre duration-500 ${
          !isOpen && "opacity-0 translate-x-28 overflow-hidden"
        }`}
      >
        {menu?.name_menu}
      </h2>
      <h2
        className={`${
          isOpen && "hidden"
        } absolute left-48 bg-white font-semibold whitespace-pre text-slate-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
      >
        {menu?.name_menu}
      </h2>
    </NavLink>
  );
};

export default DataMenu;
