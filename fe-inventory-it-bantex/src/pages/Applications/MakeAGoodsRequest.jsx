import FormAddApplications from "../../components/molecules/Form/Applications/AddApplications";
import { LayoutContentDashboard, Sidebar } from "../../components/templates";

const MakeAGoodRequest = () => {
  return (
    <Sidebar>
      <LayoutContentDashboard>
        <FormAddApplications />
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default MakeAGoodRequest;
