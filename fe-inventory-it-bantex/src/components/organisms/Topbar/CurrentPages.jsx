import { MdAddCircleOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function getCurrentPage(pathname, id_item_req, stock_no, id) {
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
      return { title: "Tambah Stok" };
    case `/stock/detail/${id}`:
      return { title: "Detail Stok" };
    case `/stock/ubah/${stock_no}`:
      return { title: `Mengubah Stok ${stock_no}` };
    case "/items":
      return {
        title: "Items List",
      };
    case "/personal-computer":
      return {
        title: "Personal Computer User",
      };
    case "/profile":
      return {
        title: "Profile Account ",
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
            <MdAddCircleOutline /> <span className="">Tambah Pengajuan</span>
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
    default:
      return {
        title: "Dashboard",
      };
  }
}
