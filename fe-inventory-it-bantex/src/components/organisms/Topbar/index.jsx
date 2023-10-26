import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import getCurrentPage from "./CurrentPages";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";

const Topbar = ({ isOpen, toggle }) => {
  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation();
  const username = localStorage.getItem("username");
  const { id_item_req } = useParams();

  useEffect(() => {
    const current = getCurrentPage(location.pathname, id_item_req);
    setCurrentPage(current);
  }, [location.pathname, id_item_req]);

  return (
    <section className="h-[10vh] w-full relative   px-5  ">
      <div className="h-[10vh]  rounded-xl bg-slate-300 w-full border-b-2 flex flex-col md:flex-row justify-center md:justify-between border-l-4 border-slate-700 p-2  lg:p-5 text-slate-700 font-bold items-center">
        {/* <button
          className={`flex items-center justify-center bg-white absolute cursor-pointer rounded-full  top-3 w-10 h-10 border border-separate border-slate-500 ${
            isOpen ? "rotate-180 left-1" : "rotate-0 left-1"
          }`}
          onClick={toggle}
        >
          <span className="text-3xl    text-slate-900">
            <GiHamburgerMenu />
          </span>
        </button> */}
        <p className="text-lg uppercase">{currentPage}</p>
        <p className="text-lg">Hi {username}, Welcome to InventoryIT</p>
      </div>
    </section>
  );
};

export default Topbar;
