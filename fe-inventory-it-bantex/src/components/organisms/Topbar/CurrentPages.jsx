import { AiFillFileAdd } from "react-icons/ai";
import { Link, NavLink, useParams } from "react-router-dom";

export default function getCurrentPage(pathname, id_item_req) {
  console.log(id_item_req);
  switch (pathname) {
    case "/stock":
      return {
        title: "Stok",
        button: (
          <NavLink
            to={`buat`}
            className="button flex gap-2 items-center order-2 sm:order-3"
          >
            <AiFillFileAdd />{" "}
            <span className="hidden md:block">Tambah Stok</span>
          </NavLink>
        ),
      };

    default:
      return {
        title: "Dashboard",
      };
  }
}
