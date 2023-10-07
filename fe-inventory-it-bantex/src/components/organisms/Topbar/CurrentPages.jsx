export default function getCurrentPage(pathname) {
  switch (pathname) {
    case "/stock":
      return "Stock";
    case "/items":
      return "Halaman Barang";
    case "/pc-master":
      return "Halaman PC";
    case "/pc-master/detail":
      return "Halaman PC > Data PC";
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
