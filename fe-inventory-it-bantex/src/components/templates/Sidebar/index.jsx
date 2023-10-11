import { NavLink, useNavigate } from "react-router-dom";
import Topbar from "../../organisms/Topbar";
import {
  MenuDropdown,
  menuSidebar,
  menuSidebarOrganization,
} from "./MenuSidebar";
import { useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { signOut } from "../../../config/Auth";

const Sidebar = ({ children }) => {
  const [isStockDropdownOpen, setStockDropdownOpen] = useState(false);
  const toggleStockDropdown = () => {
    setStockDropdownOpen(!isStockDropdownOpen);
  };

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const role = localStorage.getItem("role");

  // Logout menu
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <article className="flex w-full min-h-screen bg-slate-100">
      {/* Masih tanda tanya */}
      {/* <button
        className={`flex items-center justify-center cursor-pointer absolute top-3 w-10 h-10 ${
          isOpen ? "rotate-180 left-56" : "rotate-0 left-16"
        }`}
        onClick={toggle}
      >
        <span className="text-3xl text-slate-300">
          <GiHamburgerMenu />
        </span>
      </button> */}
      <section
        className={` min-w-[180px] min-h-screen bg-slate-800 border-r-2 flex flex-col`}
        // style={{ width: isOpen ? "240px" : "60px" }}
      >
        <div className="title h-16 border-b-2 text-white text-xl font-bold text-center flex justify-center items-center">
          Inventory IT
        </div>

        {/* menu */}
        <section className="flex flex-col items-center gap-1 pt-2 w-full">
          {menuSidebar.map((data, i) => (
            <div key={i} className="w-full">
              {data.hasDropdown ? (
                <div
                  onClick={toggleStockDropdown}
                  className={`flex items-center w-full gap-2 text-white py-3 text-base font-medium hover:bg-white hover:text-slate-800 rounded-s-full cursor-pointer ${
                    isOpen ? "pl-9 justify-flex-start" : "pl-1 justify-center"
                  }`}
                >
                  <p>{data.icon}</p>
                  <p style={{ display: isOpen ? "block" : "none" }}>
                    {data.name_menu}
                  </p>
                  {isStockDropdownOpen ? "▲" : "▼"}
                </div>
              ) : (
                <NavLink
                  to={data.path}
                  activestyle="active"
                  className={`flex items-center w-full gap-2 text-white py-3 text-base font-medium hover:bg-white hover:text-slate-800 rounded-s-full ${
                    isOpen ? "pl-9 justify-flex-start" : "pl-1 justify-center"
                  }`}
                >
                  <p>{data.icon}</p>{" "}
                  <p style={{ display: isOpen ? "block" : "none" }}>
                    {data.name_menu}
                  </p>
                </NavLink>
              )}

              {data.hasDropdown && isStockDropdownOpen && (
                <div className="flex flex-col pl-10 text-white">
                  {MenuDropdown.map((data, i) => (
                    <NavLink
                      key={i}
                      to={data.path}
                      className="flex items-center gap-1 w-full py-2 hover:bg-white hover:text-slate-800 rounded-s-full"
                    >
                      <p>{data.icon}</p> <p>{data.name_menu}</p>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        <section className="flex flex-col items-center gap-1 pt-2 ">
          {role == 1 ? (
            <>
              <h2
                style={{ display: isOpen ? "flex" : "none" }}
                className="items-center w-full gap-2 text-slate-400 pl-9 py-1 text-md font-semimedium"
              >
                Organization
              </h2>
              {menuSidebarOrganization.map((data, i) => (
                <NavLink
                  to={data.path}
                  key={i}
                  activestyle="bg-white text-slate-800"
                  className={`flex items-center w-full gap-2 text-white py-3  text-base font-medium hover:bg-white hover:text-slate-800 rounded-s-full ${
                    isOpen ? "pl-9 justify-flex-start" : "pl-1 justify-center"
                  }`}
                >
                  <p>{data.icon}</p>
                  <p style={{ display: isOpen ? "block" : "none" }}>
                    {data.name_menu}
                  </p>
                </NavLink>
              ))}
            </>
          ) : role == 2 ? (
            <div className=" hidden">
              UNTUK ROLE 2 / USERS TIDAK BISA MENGAKSES
            </div>
          ) : null}
        </section>
        <button
          onClick={handleLogout}
          className={`flex items-center w-full gap-2 text-white py-3  text-base font-medium hover:bg-white hover:text-slate-800 rounded-s-full ${
            isOpen ? "pl-9 justify-flex-start" : "pl-1 justify-center"
          }`}
        >
          <CgLogOut />
          <p>Logout</p>
        </button>
      </section>

      <section className="flex flex-col w-full   mt-5">
        <Topbar />
        <div className=" min-h-[85vh] overflow-hidden py-5 overflow-y-auto ">
          {children}
        </div>
      </section>
    </article>
  );
};

export default Sidebar;
