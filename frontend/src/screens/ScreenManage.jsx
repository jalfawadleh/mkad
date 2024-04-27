import { Outlet } from "react-router-dom";
import {
  ActivityManageCircleLink,
  HomeCircleLink,
  MemberManageCircleLink,
  TextCenterBox,
} from "../components/common/Icons";
import { useContext } from "react";
import { UserContext } from "../store";
import { Bar } from "../components/common/Wrappers";

const ScreenManage = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Bar>
        <HomeCircleLink to='/' />
        <TextCenterBox text={user.name} />
        <MemberManageCircleLink to='members' />
        <ActivityManageCircleLink to={"activities"} />
      </Bar>
      <Outlet />
    </>
  );
};

export default ScreenManage;
