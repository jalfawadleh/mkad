import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../store";
import { Bar } from "../components/common/Wrappers";
import {
  ActivitiesCircleLink,
  ActivityCircleLink,
  AvatarCustomLink,
  HomeCircleLink,
  MemberCircleLink,
  OrganisationCircleLink,
  TextCenterLink,
} from "../components/common/Icons";

const ScreenDashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Bar>
        <HomeCircleLink to='/' />
        <TextCenterLink text={user.name} to='/manage/member' />
        <AvatarCustomLink name={user.name} />

        <OrganisationCircleLink to='/organisations' />
        <ActivityCircleLink to='/activities' />
        <MemberCircleLink to='/members' />
        {user.type == "organisation" && (
          <ActivitiesCircleLink to={"/manage/activities"} />
        )}
      </Bar>
      <Outlet />
    </>
  );
};

export default ScreenDashboard;
