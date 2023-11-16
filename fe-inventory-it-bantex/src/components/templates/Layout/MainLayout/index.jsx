import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../../organisms/Topbar";
import { signOut } from "../../../../config/Auth";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

const MainLayout = ({ children }) => {
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

  return (
    <>
      {isMobile ? (
        <section className="flex md:hidden relative">
          <Navbar
            handleLogout={handleLogout}
            role={role}
            isMobile={isMobile}
            setIsMobile={setIsMobile}
            isMobileOpen={isMobileOpen}
            setIsMobileOpen={setIsMobileOpen}
            openMob={openMob}
            setOpenMob={setOpenMob}
          />
          <section className="flex flex-col w-full mt-5 bg-slate-100">
            <Topbar />
            <div className="min-h-screen overflow-hidden py-5 overflow-y-auto">
              {children}
            </div>
          </section>
        </section>
      ) : (
        <section className="flex ">
          <SideBar
            handleLogout={handleLogout}
            role={role}
            open={open}
            setOpen={setOpen}
          />
          <section className="flex flex-col w-full mt-5 bg-slate-100 ">
            <Topbar />
            <div className="min-h-[80vh]  overflow-hidden py-5 overflow-y-auto">
              {children}
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default MainLayout;
