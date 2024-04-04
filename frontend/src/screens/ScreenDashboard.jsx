import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { UserContext } from "../store";

import {
  AvatarMember,
  ChocolateBar,
  IconLinkCircleFlyTo,
} from "../components/common/LinkItems";

import ListActivitiesManaged from "../components/dashboard/ListActivitiesManaged";
import ListActivitiesJoined from "../components/dashboard/ListActivitiesJoined";
import ListOrganisationsJoined from "../components/dashboard/ListOrganisationsJoined";

const ScreenDashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <ChocolateBar>
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
      </ChocolateBar>

      {user.type === "organisation" && <ListActivitiesManaged />}

      <ListOrganisationsJoined />

      <ListActivitiesJoined />

      <Outlet />
    </>
  );
};

export default ScreenDashboard;
