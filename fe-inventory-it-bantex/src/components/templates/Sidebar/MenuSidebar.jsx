import { MdDashboard, MdWarehouse, MdPeople } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { HiDocument } from "react-icons/hi";
import { ImBooks } from "react-icons/im";
import { FaComputer } from "react-icons/fa6";
import { CiGrid42 } from "react-icons/ci";
import { IoMdLogOut } from "react-icons/io";

export const menuSidebar = [
  {
    path: "/",
    name_menu: "Dashboard",
    icon: MdDashboard,
  },
  {
    path: "/stock",
    name_menu: "Stock",
    icon: MdWarehouse,
    // hasDropdown: true,
  },
  {
    path: "/items",
    name_menu: "Items",
    icon: ImBooks,
  },
  {
    path: "/pc-master",
    name_menu: "PC Master",
    icon: FaComputer,
  },
  {
    path: "/form-pengajuan",
    name_menu: "Pengajuan",
    icon: CiGrid42,
  },
  // {
  //   path: "/pc-line",
  //   name_menu: "PC line",
  //   icon: <FaComputer />,
  // },
  // { path: "/stock-in", name_menu: "Stock In", icon: <MdWarehouse /> },
  // { path: "/stock-out", name_menu: "Stock Out", icon: <MdWarehouse /> },
];

export const LogoutMenu = [
  {
    path: "/",
    name_menu: "Logout",
    icon: IoMdLogOut,
  },
];

export const menuSidebarOrganization = [
  {
    path: "/employess",
    name_menu: "Employees",
    icon: MdPeople,
  },
  // {
  //   path: "/documents",
  //   name_menu: "Documents",
  //   icon: HiDocument,
  // },
  // {
  //   path: "/reports",
  //   name_menu: "Reports",
  //   icon: BiSolidReport,
  // },
];

export const MenuDropdown = [
  {
    path: "/documents",
    name_menu: "Documents",
    icon: <HiDocument />,
  },
  {
    path: "/reports",
    name_menu: "Reports",
    icon: <BiSolidReport />,
  },
];
