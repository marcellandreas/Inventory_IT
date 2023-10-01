import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/templates";
import { Widget } from "../../components/molecules";
import { signOut } from "../../config/Auth";
import Title from "../../components/atoms/Text/Title";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut();
    navigate("/login");
  };
  return (
    <Sidebar>
      <section className="flex gap-4 flex-col flex-wrap w-full ">
        {/* Title */}
        <Title>Halaman Dashboard</Title>
        <button onClick={handleLogout}>Logout</button>
        <Widget />
        <section>
          <div>
            <h1 className="text-xl text-slate-600 mb-2">User Sedang Login?</h1>
            <hr />
          </div>
        </section>
      </section>
    </Sidebar>
  );
};

export default Dashboard;
