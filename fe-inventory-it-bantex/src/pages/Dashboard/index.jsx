import { useNavigate } from "react-router-dom";
import SideBar from "../../components/Sidebar";
import Widget from "../../components/molecules/Widget";
import { signOut } from "../../config/Auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut();
    navigate("/login");
  };
  return (
    <SideBar>
      <section className="flex gap-4 flex-col flex-wrap w-full ">
        {/* Title */}
        <div>
          <h1 className="text-3xl text-slate-600 mb-2">Halaman Dashboard</h1>
          <button onClick={handleLogout}>Logout</button>
          <hr />
        </div>
        <Widget />
        <section>
          <div>
            <h1 className="text-xl text-slate-600 mb-2">User Sedang Login?</h1>
            <hr />
          </div>
        </section>
      </section>
    </SideBar>
  );
};

export default Dashboard;
