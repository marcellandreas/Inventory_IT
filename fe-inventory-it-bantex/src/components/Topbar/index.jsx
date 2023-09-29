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
    <section className=" h-16 bg-slate-700 w-full border-b-2 flex justify-between px-16 text-white items-center">
      <p className="text-lg uppercase">{currentPage}</p>
      <aside className="flex gap-4 justify-center items-center">
        <h2 className=" uppercase">{username}</h2>
        {/* <img src="" alt="profile" className="h-10 w-10 rounded-full" /> */}
      </aside>
    </section>
  );
};

export default Topbar;
