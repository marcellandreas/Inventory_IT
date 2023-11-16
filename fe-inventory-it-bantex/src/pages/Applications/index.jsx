import { useEffect, useState } from "react";
import {
  AdminsFormReq,
  ManagersFormReq,
  UsersFormReq,
  ContentLayout,
  MainLayout,
} from "../../components/templates";
import { useDispatch } from "react-redux";
import {
  fetchAllData,
  fetchApproved,
  fetchNeedApproved,
} from "../../Redux/Feature/ItemsRequest";
import { ShowModal } from "../../components/organisms";
import DeleteApplications from "../../components/molecules/Form/Applications/DeleteApplications";

const Applications = () => {
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllData());
    dispatch(fetchNeedApproved(username));
    dispatch(fetchApproved(username));
  }, [dispatch, username]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState("");

  const renderForm = () => {
    switch (role) {
      case "1":
        return <AdminsFormReq setId={setId} setDeleteModal={setDeleteModal} />;
      case "2":
        return <UsersFormReq setId={setId} setDeleteModal={setDeleteModal} />;
      case "3":
        return (
          <ManagersFormReq setId={setId} setDeleteModal={setDeleteModal} />
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <ContentLayout>{renderForm()}</ContentLayout>
      <ShowModal isVisible={deleteModal} onClose={() => setDeleteModal(false)}>
        <DeleteApplications
          isVisible={deleteModal}
          onClose={() => setDeleteModal(false)}
          id={id}
        />
      </ShowModal>
    </MainLayout>
  );
};

export default Applications;
