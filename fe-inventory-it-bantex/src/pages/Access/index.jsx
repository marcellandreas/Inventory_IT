import { useEffect, useState } from "react";

import {
  TableDataUsers,
  TableDataAdmins,
  Sidebar,
  LayoutContentDashboard,
} from "../../components/templates";
import { AxiosInstance } from "../../apis/api";
import Title from "../../components/atoms/Text/Title";

const AccesPage = () => {
  const [toggleState, setToggleState] = useState(1);
  const [users, setUsers] = useState([]);
  const [admin, setAdmins] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");

  useEffect(() => {
    AxiosInstance.get("/users")
      .then((res) => {
        setIsLoading(false);
        const data = res.data.data;

        const admins = data.filter((user) => user.role === "1");
        const users = data.filter((user) => user.role === "2");
        setAdmins(admins);
        setUsers(users);
        setAllData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoading]);

  return (
    <Sidebar>
      <LayoutContentDashboard>
        <section className="flex gap-2 p-2 bg-slate-200 w-[330px] mb-5 rounded-lg">
          <button
            onClick={() => {
              setToggleState(1);
            }}
            className={`${
              toggleState === 1
                ? "bg-slate-500 hover:bg-slate-700"
                : "bg-slate-300 hover:bg-slate-500 text-black font-semibold"
            } rounded-md p-1 min-w-[100px]`}
          >
            All
          </button>
          <button
            onClick={() => {
              setToggleState(2);
            }}
            className={`${
              toggleState === 2
                ? "bg-slate-500 hover:bg-slate-700"
                : "bg-slate-300 hover:bg-slate-500 text-black font-semibold"
            } rounded-md p-1 min-w-[100px]`}
          >
            Users
          </button>
          <button
            onClick={() => {
              setToggleState(3);
            }}
            className={`${
              toggleState === 3
                ? "bg-slate-500 hover:bg-slate-700"
                : "bg-slate-300 hover:bg-slate-500 text-black font-semibold"
            } rounded-md p-1 min-w-[100px]`}
          >
            Admins
          </button>
        </section>
        {toggleState === 1 ? null : toggleState === 2 ? (
          <section>
            <TableDataUsers users={users} setIsLoading={setIsLoading} />
          </section>
        ) : (
          <section>
            <TableDataAdmins admin={admin} setIsLoading={setIsLoading} />
          </section>
        )}
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default AccesPage;
