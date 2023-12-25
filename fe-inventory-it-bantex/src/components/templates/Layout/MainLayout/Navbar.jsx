import React from "react";
import DataMenu from "./DataMenu";
import logo from "../../../../assets/images/logo.png";
import { LogoutMenu, menuSidebar } from "./MenuSidebar";
import { BsChevronDoubleRight } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Navbar = ({ handleLogout, role, openMob, setOpenMob }) => {
  return (
    <section className=" min-h-screen">
      <div
        className={`absolute ${
          openMob ? "left-[158px] rotate-180" : "left-8 rotate-0"
        } text-slate-800 z-50 flex justify-center items-center transition-transform  rounded-full border border-slate-800 bg-white h-8 w-8`}
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
        } text-slate-100 bg-slate-800 min-h-screen pb-20 w-full z-40`}
      >
        <section>
          <div
            style={{
              transitionDelay: `${3}00ms`,
            }}
            className="py-3 flex gap-2  mt-4 relative cursor-pointer h-[20vh] "
          >
            <LazyLoadImage
              src={logo}
              alt="logo"
              width={"auto"}
              height={"auto"}
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            {menuSidebar
              ?.filter((menu) => {
                if (role == 1) {
                  return true;
                } else if (role == 2) {
                  return (
                    menu.path === "/" ||
                    menu.path === "/form-pengajuan" ||
                    menu.path === "/personal-computer" ||
                    menu.path === "/profile"
                  );
                }
                return false;
              })
              .map((menu, i) => (
                <DataMenu menu={menu} key={i} i={i} isOpen={open} />
              ))}
          </div>

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
    </section>
  );
};

export default Navbar;
