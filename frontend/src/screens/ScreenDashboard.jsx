import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../store";
import {
  ActivityCircleLink,
  AvatarCustomLink,
  InviteCircleLink,
  MemberCircleLink,
  OrganisationCircleLink,
  UpdatesCircleLink,
} from "../components/common/Icons";
import { Bar } from "../components/common/Wrappers";

const ScreenDashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Bar>
        <AvatarCustomLink name={user.name} />
        <InviteCircleLink to='/invites' />
        <OrganisationCircleLink to='/organisations' />
        <ActivityCircleLink to='/activities' />
        <MemberCircleLink to='/members' />
        <UpdatesCircleLink to='/updates' activated={user.updates} />
      </Bar>
      <Outlet />
    </>
  );
};

export default ScreenDashboard;
