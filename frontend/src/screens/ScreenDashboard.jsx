import { useContext } from "react";
import { Outlet } from "react-router-dom";

import { UserContext } from "../store";

import { Bar } from "../components/common/Wrappers";
import {
  ActivitiesCircleLink,
  ActivityCircleLink,
  HomeCircleLink,
  MessageCircle,
  OrganisationCircleLink,
  TextCenterLink,
} from "../components/common/Icons";

const ScreenDashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Bar>
        <HomeCircleLink to='/manage/member' />
        <TextCenterLink text={user.name} to='/manage/member' />
        {user.type == "organisation" && (
          <ActivitiesCircleLink to={"/manage/activities"} />
        )}
        <OrganisationCircleLink to='/organisations' />
        <ActivityCircleLink to='/activities' />
        {/* <MessageCircleLink to='/messages' /> */}
        <MessageCircle />
      </Bar>
      <Outlet />
    </>
  );
};

export default ScreenDashboard;
