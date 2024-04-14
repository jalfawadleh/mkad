import { useContext } from "react";
import { Outlet } from "react-router-dom";

import { UserContext } from "../store";

import ListManagedActivities from "../components/dashboard/ListManagedActivities";
import ListJoinedActivities from "../components/dashboard/ListJoinedActivities";
import ListJoinedOrganisations from "../components/dashboard/ListJoinedOrganisations";

const ScreenDashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user.type === "organisation" && <ListManagedActivities />}

      <ListJoinedOrganisations />

      <ListJoinedActivities />

      <Outlet />
    </>
  );
};

export default ScreenDashboard;
