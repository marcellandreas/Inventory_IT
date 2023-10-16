import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import getCurrentPage from "./CurrentPages";

const Topbar = () => {
  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation();
  const username = localStorage.getItem("username");
  const { id_item_req } = useParams();

  useEffect(() => {
    const current = getCurrentPage(location.pathname, id_item_req);
    setCurrentPage(current);
  }, [location.pathname, id_item_req]);

  return (
    <section className="h-[10vh] w-full   px-5  ">
      <div className="h-[10vh]  rounded-xl bg-slate-300 w-full border-b-2 flex flex-col md:flex-row justify-center md:justify-between border-l-4 border-slate-700 p-2  lg:p-5 text-slate-700 font-bold items-center">
        <p className="text-lg uppercase">{currentPage}</p>
        <p className="text-lg">Hi {username}, Welcome to InventoryIT</p>
      </div>
    </section>
  );
};

export default Topbar;
