import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import { Widget } from "../../components/molecules";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AxiosInstance } from "../../apis/api";

const Dashboard = () => {
  const userData = useSelector((state) => state.user);
  const [databy, setDataby] = useState({});

  useEffect(() => {
    AxiosInstance.get(`/det-stock/id/3`).then((res) => {
      console.log(res.data);
    });
  });

  // Gunakan data pengguna
  const username = userData.username;
  const role = userData.role;
  const id_user = userData.id_user;
  return (
    <Sidebar>
      <LayoutContentDashboard>
        <section className="flex gap-4 flex-col flex-wrap w-full ">
          {/* Title */}
          <Widget />
          <section>
            <div>
              <h1 className="text-xl text-slate-600 mb-2">
                User Sedang Login? {(username, role, id_user)}
              </h1>
              <hr />
            </div>
          </section>
        </section>
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default Dashboard;
