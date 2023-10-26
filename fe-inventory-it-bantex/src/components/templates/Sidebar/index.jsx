import { NavLink, useNavigate } from "react-router-dom";
import Topbar from "../../organisms/Topbar";
import {
  LogoutMenu,
  MenuDropdown,
  menuSidebar,
  menuSidebarOrganization,
} from "./MenuSidebar";
import { CgLogOut } from "react-icons/cg";
import { signOut } from "../../../config/Auth";
import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { BsChevronDoubleRight } from "react-icons/bs";
import { MdOutlineDashboard, MdWarehouse } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

// const Sidebar = ({ children }) => {
//   const [isStockDropdownOpen, setStockDropdownOpen] = useState(false);
//   const toggleStockDropdown = () => {
//     setStockDropdownOpen(!isStockDropdownOpen);
//   };

//   const [isOpen, setIsOpen] = useState(true);
//   const toggle = () => setIsOpen(!isOpen);
//   const role = localStorage.getItem("role");

//   // Logout menu
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     signOut();
//     navigate("/login");
//   };

//   return (
//     <article className="flex w-full h-screen bg-slate-100">
//       {/* Masih tanda tanya */}
//       {/* <button
//         className={`flex items-center justify-center cursor-pointer absolute top-3 w-10 h-10 ${
//           isOpen ? "rotate-180 left-56" : "rotate-0 left-16"
//         }`}
//         onClick={toggle}
//       >
//         <span className="text-3xl text-slate-300">
//           <GiHamburgerMenu />
//         </span>
//       </button> */}
//       <section
//         className={`  min-h-screen bg-slate-800 border-r-2 flex flex-col`}
//         style={{ minWidth: isOpen ? "180px" : "60px" }}
//       >
//         <div className="title h-16 border-b-2 text-white text-xl font-bold text-center flex justify-center items-center">
//           Inventory IT
//         </div>

//         {/* menu */}
//         <section className="flex flex-col items-center gap-1 pt-2 w-full">
//           {menuSidebar.map((data, i) => (
//             <div key={i} className="w-full">
//               {data.hasDropdown ? (
//                 <div
//                   onClick={toggleStockDropdown}
//                   className={`flex items-center w-full gap-2 text-white py-3 text-base font-medium hover:bg-white hover:text-slate-800 rounded-s-full cursor-pointer ${
//                     isOpen ? "pl-9 justify-flex-start" : "pl-1 justify-center"
//                   }`}
//                 >
//                   <p>{data.icon}</p>
//                   <p style={{ display: isOpen ? "block" : "none" }}>
//                     {data.name_menu}
//                   </p>
//                   {isStockDropdownOpen ? "▲" : "▼"}
//                 </div>
//               ) : (
//                 <NavLink
//                   to={data.path}
//                   activestyle="active"
//                   className={`flex items-center w-full gap-2 text-white py-3 text-base font-medium hover:bg-white hover:text-slate-800 rounded-s-full ${
//                     isOpen ? "pl-9 justify-flex-start" : "pl-1 justify-center"
//                   }`}
//                 >
//                   <p>{data.icon}</p>{" "}
//                   <p style={{ display: isOpen ? "block" : "none" }}>
//                     {data.name_menu}
//                   </p>
//                 </NavLink>
//               )}

//               {data.hasDropdown && isStockDropdownOpen && (
//                 <div className="flex flex-col pl-10 text-white">
//                   {MenuDropdown.map((data, i) => (
//                     <NavLink
//                       key={i}
//                       to={data.path}
//                       className="flex items-center gap-1 w-full py-2 hover:bg-white hover:text-slate-800 rounded-s-full"
//                     >
//                       <p>{data.icon}</p> <p>{data.name_menu}</p>
//                     </NavLink>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </section>

//         <section className="flex flex-col items-center gap-1 pt-2 ">
//           {role == 1 || role == 3 ? (
//             <>
//               <h2
//                 style={{ display: isOpen ? "flex" : "none" }}
//                 className="items-center w-full gap-2 text-slate-400 pl-9 py-1 text-md font-semimedium"
//               >
//                 Organization
//               </h2>
//               {menuSidebarOrganization.map((data, i) => (
//                 <NavLink
//                   to={data.path}
//                   key={i}
//                   activestyle="bg-white text-slate-800"
//                   className={`flex items-center w-full gap-2 text-white py-3  text-base font-medium hover:bg-white hover:text-slate-800 rounded-s-full ${
//                     isOpen ? "pl-9 justify-flex-start" : "pl-1 justify-center"
//                   }`}
//                 >
//                   <p>{data.icon}</p>
//                   <p style={{ display: isOpen ? "block" : "none" }}>
//                     {data.name_menu}
//                   </p>
//                 </NavLink>
//               ))}
//             </>
//           ) : role == 2 ? (
//             <div className=" hidden">
//               UNTUK ROLE 2 / USERS TIDAK BISA MENGAKSES
//             </div>
//           ) : null}
//         </section>
//         <button
//           onClick={handleLogout}
//           className={`flex items-center w-full gap-2 text-white py-3  text-base font-medium hover:bg-white hover:text-slate-800 rounded-s-full ${
//             isOpen ? "pl-9 justify-flex-start" : "pl-1 justify-center"
//           }`}
//         >
//           <CgLogOut />
//           <p>Logout</p>
//         </button>
//       </section>

//       <section className="flex flex-col w-full mt-5">
//         <Topbar />
//         <div className=" min-h-[85vh] overflow-hidden py-5 overflow-y-auto ">
//           {children}
//         </div>
//       </section>
//     </article>
//   );
// };

// export default Sidebar;

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut();
    navigate("/login");
  };
  const [open, setOpen] = useState(true);
  return (
    <section className="flex  bg-slate-100">
      <div
        className={`bg-slate-800 min-h-screen ${
          open ? "w-[200px]" : "w-16"
        } duration-500 text-slate-100 px-4`}
      >
        <div
          style={{
            transitionDelay: `${3}00ms`,
          }}
          className="py-3 flex gap-2 bg-amber-400 mt-4 relative"
        >
          <div>
            <MdWarehouse size={25} />
          </div>
          <h2
            className={`whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
          >
            Inventory IT
          </h2>
          <div
            className={`absolute ${
              open ? "left-[158px] rotate-180" : "left-8 rotate-0"
            }  text-slate-800 flex justify-center items-center transition-transform z-50 rounded-full border border-slate-800 bg-white h-8 w-8  `}
          >
            <BsChevronDoubleRight
              size={24}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menuSidebar?.map((menu, i) => (
            <NavLink
              to={menu?.path}
              key={i}
              activestyle="active"
              className={` group flex items-center text-sm  gap-2  font-medium p-2 hover:bg-slate-800 hover:w-full rounded-md z-50`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name_menu}
              </h2>
              <h2
                className={`${
                  open && "hidden z-50"
                } absolute left-48 bg-white font-semibold whitespace-pre text-slate-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name_menu}
              </h2>
            </NavLink>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-4 relative">
          {menuSidebarOrganization?.map((menu, i) => (
            <NavLink
              to={menu?.path}
              key={i}
              activestyle="active"
              className={` group flex items-center text-sm  gap-2  font-medium p-2 hover:bg-slate-800 rounded-md z-50`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name_menu}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-slate-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name_menu}
              </h2>
            </NavLink>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {LogoutMenu?.map((menu, i) => (
            <button
              key={i}
              onClick={handleLogout}
              activestyle="active"
              className={` group flex items-center text-sm  gap-2  font-medium p-2 hover:bg-slate-800 rounded-md z-50`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name_menu}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-slate-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name_menu}
              </h2>
            </button>
          ))}
        </div>
      </div>
      <section className="flex flex-col w-full mt-5 ">
        <Topbar />
        <div className=" min-h-[85vh]  overflow-hidden py-5 overflow-y-auto ">
          {children}
        </div>
      </section>
    </section>
  );
};

export default Sidebar;
