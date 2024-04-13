import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { UserContext } from "../store";

import {
  AvatarMember,
  IconLinkCircleFlyTo,
} from "../components/common/LinkItems";

import ListManagedActivities from "../components/dashboard/ListManagedActivities";
import ListJoinedActivities from "../components/dashboard/ListJoinedActivities";
import ListJoinedOrganisations from "../components/dashboard/ListJoinedOrganisations";

import { Bar } from "../components/common/Wrappers";

const ScreenDashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Bar>
        <Link to={"manage/member"}>
          <AvatarMember name={user.name} />
        </Link>

        <IconLinkCircleFlyTo location={user.location} />
      </Bar>

      {user.type === "organisation" && <ListManagedActivities />}

      <ListJoinedOrganisations />

      <ListJoinedActivities />

      <Outlet />
    </>
  );
};

export default ScreenDashboard;
