import { LayoutContentDashboard, Sidebar } from "../../components/templates";
import { Widget } from "../../components/molecules";

const Dashboard = () => {
  return (
    <Sidebar>
      <LayoutContentDashboard>
        <section className="flex gap-4 flex-col flex-wrap w-full ">
          {/* Title */}
          <Widget />
          <section>
            <div>
              <h1 className="text-xl text-slate-600 mb-2">
                User Sedang Login?
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
