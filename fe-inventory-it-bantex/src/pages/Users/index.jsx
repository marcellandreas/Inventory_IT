import { useEffect, useState } from "react";
import SideBar from "../../components/Sidebar";
import TableDataUsers from "../../components/molecules/Table/TableDataUsers";
import TableDataAdmins from "../../components/molecules/Table/TableDataAdmins";
import { AxiosInstance } from "../../apis/api";

const Users = () => {
  const [toggleState, setToggleState] = useState(1);

  const [users, setUsers] = useState([]);
  const [admin, setAdmins] = useState([]);
  console.log(admin);
  console.log("users", users);

  useEffect(() => {
    AxiosInstance.get("/users")
      .then((res) => {
        console.log(res.data.data);
        const data = res.data.data;
        const admins = data.filter((user) => user.role === "1");
        const users = data.filter((user) => user.role === "2");

        setAdmins(admins);
        setUsers(users);
        // if (res.data.data[])
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const toggleTab = (index) => {
  //   console.log(1);
  // };

  return (
    <SideBar>
      <section>
        <div>
          <h1 className="text-3xl text-slate-600 mb-2">Halaman Penguna</h1>
          <hr />
        </div>
        <div className="flex gap-2 py-5">
          <button
            onClick={() => {
              setToggleState(1);
            }}
            className={`${
              toggleState === 1
                ? "bg-slate-500 hover:bg-slate-700"
                : "bg-slate-300 hover:bg-slate-500 text-black font-semibold"
            } rounded-md p-3 min-w-[100px]`}
          >
            Users
          </button>
          <button
            onClick={() => {
              setToggleState(2);
            }}
            className={`${
              toggleState === 2
                ? "bg-slate-500 hover:bg-slate-700"
                : "bg-slate-300 hover:bg-slate-500 text-black font-semibold"
            } rounded-md p-3 min-w-[100px]`}
          >
            Admins
          </button>
        </div>
        {toggleState === 1 ? (
          <section>
            <TableDataUsers />
          </section>
        ) : (
          <p>
            <TableDataAdmins />
          </p>
        )}
      </section>
    </SideBar>
  );
};

export default Users;
