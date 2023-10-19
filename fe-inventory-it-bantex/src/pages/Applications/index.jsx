import { useEffect, useState } from "react";
import {
  AdminsFormReq,
  LayoutContentDashboard,
  ManagersFormReq,
  Sidebar,
  UsersFormReq,
} from "../../components/templates";
import { useDispatch } from "react-redux";
import {
  fetchAllData,
  fetchApproved,
  fetchNeedApproved,
} from "../../Redux/Feature/ItemsRequest";

const Applications = () => {
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllData());
    dispatch(fetchNeedApproved(username));
    dispatch(fetchApproved(username));
  }, [dispatch, username]);

  return (
    <Sidebar>
      <LayoutContentDashboard>
        {role == 1 ? (
          <AdminsFormReq />
        ) : role == 2 ? (
          <UsersFormReq />
        ) : role == 3 ? (
          <ManagersFormReq />
        ) : null}
      </LayoutContentDashboard>
    </Sidebar>
  );
};

export default Applications;
