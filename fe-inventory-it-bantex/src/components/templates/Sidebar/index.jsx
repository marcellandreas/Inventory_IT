import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsChevronDoubleRight } from "react-icons/bs";
import { MdWarehouse } from "react-icons/md";
import Topbar from "../../organisms/Topbar";
import {
  LogoutMenu,
  menuPengajuan,
  menuSidebar,
  menuSidebarOrganization,
} from "./MenuSidebar";
import { signOut } from "../../../config/Auth";
import DataMenu from "./DataMenu";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const [open, setOpen] = useState(true);
  const [openMob, setOpenMob] = useState(false);
  const toggle = () => setIsMobileOpen(!isMobileOpen);

  return (
    <div>
      {isMobile ? (
        <section className="flex md:hidden relative">
          <div
            className={`absolute ${
              openMob ? "left-[158px] rotate-180" : "left-8 rotate-0"
            } text-slate-800 flex justify-center items-center transition-transform z-50 rounded-full border border-slate-800 bg-white h-8 w-8`}
          >
            <BsChevronDoubleRight
              size={24}
              className="cursor-pointer"
              onClick={() => setOpenMob(!openMob)}
            />
          </div>
          <div
            className={`absolute ${
              openMob ? "left-0" : "-left-[900px]"
            } text-slate-100 bg-slate-800 h-screen w-full z-40`}
          >
            <section>
              <div
                style={{
                  transitionDelay: `${3}00ms`,
                }}
                className="py-3 flex gap-2  mt-4 relative cursor-pointer "
              >
                <div>
                  <MdWarehouse size={25} />
                </div>
                <h2
                  className={`whitespace-pre duration-500 ${
                    !openMob && "opacity-0 translate-x-28 overflow-hidden "
                  }`}
                >
                  Inventory IT
                </h2>
              </div>
              {role == 2 ? null : (
                <div className="mt-4 flex flex-col gap-4 relative">
                  {menuSidebar?.map((menu, i) => (
                    <DataMenu menu={menu} key={i} i={i} isOpen={openMob} />
                  ))}
                </div>
              )}
              <div className="mt-4 flex flex-col gap-4 relative">
                {menuPengajuan?.map((menu, i) => (
                  <DataMenu menu={menu} key={i} i={i} isOpen={openMob} />
                ))}
              </div>
              {role == 2 ? null : (
                <div className="mt-4 flex flex-col gap-4 relative">
                  {menuSidebarOrganization?.map((menu, i) => (
                    <DataMenu menu={menu} key={i} i={i} isOpen={openMob} />
                  ))}
                </div>
              )}
              <div className="mt-4 flex flex-col gap-4 relative">
                {LogoutMenu?.map((menu, i) => (
                  <button
                    key={i}
                    onClick={handleLogout}
                    activestyle="active"
                    className={` group flex items-center text-sm gap-2 font-medium p-2 hover:bg-slate-800 rounded-md z-50`}
                  >
                    <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                    <h2
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre duration-500 ${
                        !openMob && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      {menu?.name_menu}
                    </h2>
                    <h2
                      className={`${
                        openMob && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-slate-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                    >
                      {menu?.name_menu}
                    </h2>
                  </button>
                ))}
              </div>
            </section>
          </div>
          <section className="flex flex-col w-full mt-5">
            <Topbar />
            <div className="min-h-s] overflow-hidden py-5 overflow-y-auto">
              {children}
            </div>
          </section>
        </section>
      ) : (
        <section className="flex bg-slate-100">
          <div
            className={`bg-slate-800 min-h-screen font-bold ${
              open ? "w-[200px]" : "w-16"
            } duration-500 text-gray-200 px-4`}
          >
            <div
              style={{
                transitionDelay: `${3}00ms`,
              }}
              className="py-3 flex gap-2 mt-4 relative"
            >
              <div>
                <MdWarehouse size={25} />
              </div>
              <h2
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden font-bold"
                }`}
              >
                InventoryIT
              </h2>
              <div
                className={`absolute ${
                  open ? "left-[158px] rotate-180" : "left-8 rotate-0"
                } text-slate-800 flex justify-center items-center transition-transform z-50 rounded-full border border-slate-800 bg-white h-8 w-8`}
              >
                <BsChevronDoubleRight
                  size={24}
                  className="cursor-pointer"
                  onClick={() => setOpen(!open)}
                />
              </div>
            </div>
            {role == 2 ? null : (
              <div className="mt-4 flex flex-col gap-4 relative">
                {menuSidebar?.map((menu, i) => (
                  <DataMenu menu={menu} key={i} i={i} isOpen={open} />
                ))}
              </div>
            )}
            <div className="mt-4 flex flex-col gap-4 relative">
              {menuPengajuan?.map((menu, i) => (
                <DataMenu menu={menu} key={i} i={i} isOpen={open} />
              ))}
            </div>
            {role == 2 ? null : (
              <div className="mt-4 flex flex-col gap-4 relative">
                {menuSidebarOrganization?.map((menu, i) => (
                  <DataMenu menu={menu} key={i} i={i} isOpen={open} />
                ))}
              </div>
            )}
            <div className="mt-4 flex flex-col gap-4 relative">
              {LogoutMenu?.map((menu, i) => (
                <button
                  key={i}
                  onClick={handleLogout}
                  activestyle="active"
                  className={` group flex items-center text-sm gap-2 font-medium p-2 hover:bg-slate-800 rounded-md `}
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
                    } absolute left-48 bg-white font-semibold whitespace-pre text-slate-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                  >
                    {menu?.name_menu}
                  </h2>
                </button>
              ))}
            </div>
          </div>
          <section className="flex flex-col w-full mt-5 bg-slate-100">
            <Topbar />
            <div className="min-h-[85vh] overflow-hidden py-5 overflow-y-auto">
              {children}
            </div>
          </section>
        </section>
      )}
    </div>
  );
};

export default Sidebar;
