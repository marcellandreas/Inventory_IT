import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import getCurrentPage from "./CurrentPages";

const Topbar = () => {
  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation();
  const username = localStorage.getItem("username");

  useEffect(() => {
    const current = getCurrentPage(location.pathname);
    setCurrentPage(current);
  }, [location.pathname]);

  return (
    <section className="h-[10vh] w-full   px-5  ">
      <div className="h-[10vh] rounded-xl bg-slate-300 w-full border-b-2 flex justify-between border-l-4 border-slate-700  p-5 text-slate-700 font-bold items-center">
        <p className="text-lg uppercase">{currentPage}</p>
        <p className="text-lg">Hi {username}, Welcome to InventoryIT</p>
      </div>
    </section>
  );
};

export default Topbar;
