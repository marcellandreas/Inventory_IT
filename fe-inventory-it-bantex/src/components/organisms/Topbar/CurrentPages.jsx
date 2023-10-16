import { useParams } from "react-router-dom";

export default function getCurrentPage(pathname, id_item_req) {
  console.log(id_item_req);
  switch (pathname) {
    case "/stock":
      return "Stock";
    case "/items":
      return "Halaman Barang";
    case "/pc-master":
      return "Halaman PC";
    case "/pc-master/detail":
      return "Halaman PC > Data PC";
    // pengajuan
    case "/form-pengajuan":
      return "Pengajuan Barang";
    case `/form-pengajuan/detail/${id_item_req}`:
      return "Detail Pengajuan Barang";
    case "/employess":
      return "Kelola Hak Akses";
    case "/pc-line":
      return "Halaman Komponents PC";
    case "/reports":
      return "Reports";
    case "/stock/in":
      return "Stock In";
    case "/stock/out":
      return "Stock Out";
    default:
      return "Dashboard";
  }
}
