import { MdAddCircleOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function getCurrentPage(pathname, id_item_req, id) {
  switch (pathname) {
    case "/stock":
      return {
        title: "Stok List",
        button: (
          <NavLink
            to={`buat`}
            className="button flex gap-2 items-center order-2 sm:order-3"
          >
            <MdAddCircleOutline /> <span>Tambah Stok</span>
            {/* <span className="hidden md:block">Tambah Stok</span> */}
          </NavLink>
        ),
      };
    case "/stock/buat":
      return { title: "Tambah Stok", text: "Tambahkan Stock" };
    case `/stock/detail/${id}`:
      return { title: "Detail Stok", text: "Tambahkan Stock" };
    case "/items":
      return {
        title: "Items List",
        // button: (
        //   <button
        //     className="button flex gap-2 items-center order-2 sm:order-3"
        //     onClick={() => ShowModal("add")}
        //   >
        //     {/* <BsDatabaseFillAdd />{" "} */}
        //     <span className="hidden md:block">Tambah Barang</span>
        //   </button>
        // ),
      };
    case "/pc-master":
      return { title: "Pc List" };
    case "/pc-master/detail":
      return { title: "Pc Details" };
    case "/pc-master/unused":
      return { title: "Komponents Pc List" };
    // pengajuan
    case "/form-pengajuan":
      return {
        title: "Pengajuan List",
        button: (
          <NavLink
            to={`buat`}
            className="button flex gap-2 items-center order-2 sm:order-3"
          >
            <MdAddCircleOutline />{" "}
            <span className="hidden md:block">Tambah Pengajuan</span>
          </NavLink>
        ),
      };
    case "/form-pengajuan/print":
      return { title: "Cetak Pengajuan" };
    case "/form-pengajuan/buat":
      return { title: "Tambah Pengajuan" };
    case `/form-pengajuan/detail`:
      return { title: "Detail Pengajuan Barang" };
    case "/employess":
      return {
        title: "Kelola Hak Akses",
      };
    case "/pc-line":
      return { title: "Komponent PC" };
    case "/reports":
      return "Reports";
    default:
      return {
        title: "Dashboard",
      };
  }
}
