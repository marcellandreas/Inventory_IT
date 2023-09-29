export default function getCurrentPage(pathname) {
  switch (pathname) {
    case "/stock":
      return "Stock";
    case "/stock/in":
      return "Stock In";
    case "/stock/out":
      return "Stock Out";
    default:
      return "Dashboard";
  }
}
