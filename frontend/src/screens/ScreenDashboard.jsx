import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../store";
import {
  ActivitiesCircleLink,
  ActivityCircleLink,
  AvatarCustomLink,
  HomeCircleLink,
  MemberCircleLink,
  OrganisationCircleLink,
} from "../components/common/Icons";

const ScreenDashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className='d-flex justify-content-between'>
        <HomeCircleLink to='/' />
        <AvatarCustomLink name={user.name} />
        <OrganisationCircleLink to='/organisations' />
        <ActivityCircleLink to='/activities' />
        <MemberCircleLink to='/members' />
        {user.type == "organisation" && (
          <ActivitiesCircleLink to={"/manage/activities"} />
        )}
      </div>
      <Outlet />
    </>
  );
};

export default ScreenDashboard;
