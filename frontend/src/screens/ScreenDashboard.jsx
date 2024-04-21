import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";

import { UserContext } from "../store";

import ListManagedActivities from "../components/dashboard/ListManagedActivities";
import ListJoinedActivities from "../components/dashboard/ListJoinedActivities";
import ListJoinedOrganisations from "../components/dashboard/ListJoinedOrganisations";
import { Bar } from "../components/common/Wrappers";
import {
  ActivityCircle,
  AvatarCustomLink,
  OrganisationCircle,
} from "../components/common/Icons";

const ScreenDashboard = () => {
  const { user } = useContext(UserContext);

  const [showOrganisations, setShowOrganisations] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  return (
    <>
      <Bar>
        <AvatarCustomLink name={user.name} />
        <span className='p-auto m-auto'>{user.name}</span>
        <span onClick={() => setShowOrganisations(!showOrganisations)}>
          <OrganisationCircle color={showOrganisations ? "white" : "gray"} />
        </span>
        <span onClick={() => setShowActivities(!showActivities)}>
          <ActivityCircle color={showActivities ? "white" : "gray"} />
        </span>
      </Bar>

      {user.type === "organisation" && <ListManagedActivities />}
      {showOrganisations && <ListJoinedOrganisations />}
      {showActivities && <ListJoinedActivities />}

      <Outlet />
    </>
  );
};

export default ScreenDashboard;
