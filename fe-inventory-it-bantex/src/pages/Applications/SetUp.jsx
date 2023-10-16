import LayoutContentDashboard from "../../components/templates/LayoutContentDashboard";
import Sidebar from "../../components/templates/Sidebar";

const SetUp = () => {
  return (
    <Sidebar>
      <LayoutContentDashboard>
        <section className="flex gap-4 ">
          {/* contet name pt */}
          <div className=" bg-slate-200 rounded-xl min-h-[400px] w-40">
            <h1 className="text-center">Nama PT.</h1>
          </div>
          <div className=" bg-slate-200 rounded-xl min-h-[400px]">asdh</div>
        </section>
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default SetUp;
