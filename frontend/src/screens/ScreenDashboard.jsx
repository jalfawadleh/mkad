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
        <AvatarMember name={user.name} />
        <Link
          to={"profile"}
          className='p-auto m-auto fw-bold text-center link-underline link-underline-opacity-0'
        >
          Profile
        </Link>
        <Link
          to={"account"}
          className='p-auto m-auto fw-bold text-center link-underline link-underline-opacity-0'
        >
          Account
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
