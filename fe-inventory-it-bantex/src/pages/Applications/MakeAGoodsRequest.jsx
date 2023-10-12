import FormAddApplications from "../../components/molecules/Form/Applications/AddApplications";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";

const MakeAGoodRequest = () => {
  return (
    <Sidebar>
      <LayoutContentDashboard>
        <section className="flex ">
          <FormAddApplications />
        </section>
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default MakeAGoodRequest;
