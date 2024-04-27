import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../store";
import {
  ActivityCircleLink,
  AvatarCustomLink,
  HomeCircleLink,
  MemberCircleLink,
  OrganisationCircleLink,
} from "../components/common/Icons";
import { Bar } from "../components/common/Wrappers";

const ScreenDashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Bar>
        <HomeCircleLink to='/' />
        <AvatarCustomLink name={user.name} />
        <OrganisationCircleLink to='/organisations' />
        <ActivityCircleLink to='/activities' />
        <MemberCircleLink to='/members' />
      </Bar>
      <Outlet />
    </>
  );
};

export default ScreenDashboard;
