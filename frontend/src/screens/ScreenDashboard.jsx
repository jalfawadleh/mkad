import { useContext } from "react";
import { Outlet } from "react-router-dom";

import { UserContext } from "../store";

import ListManagedActivities from "../components/dashboard/ListManagedActivities";
import ListJoinedActivities from "../components/dashboard/ListJoinedActivities";
import ListJoinedOrganisations from "../components/dashboard/ListJoinedOrganisations";
import { Bar } from "../components/common/Wrappers";
import { AvatarCustomLink } from "../components/common/Icons";

const ScreenDashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user.type === "organisation" ? (
        <ListManagedActivities />
      ) : (
        <Bar>
          <AvatarCustomLink name={user.name} />
          <span className='p-auto m-auto'>{user.name}</span>
        </Bar>
      )}

      <ListJoinedOrganisations />

      <ListJoinedActivities />

      <Outlet />
    </>
  );
};

export default ScreenDashboard;
