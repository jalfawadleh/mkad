import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Bar } from "../common/Wrappers";
import {
  AvatarLink,
  Empty,
  InviteCircle,
  MemberAddCircleLink,
  TextCenterBox,
  TextCenterLink,
} from "../common/Icons";

const MemberInvites = () => {
  const [invitees, setInvitees] = useState([]);

  const getInvitees = async () => {
    await axios
      .get("/invitees")
      .then((res) => {
        setInvitees(res.data);
        console.log(res.data);
      })
      .catch(() => toast.error("Something went wrong"));
  };

  useEffect(() => {
    getInvitees();
  }, []);

  return (
    <>
      <div className='my-2' />
      <Bar>
        <InviteCircle />
        <TextCenterBox text='Invites' />
        <MemberAddCircleLink to='/invitelink' />
      </Bar>

      {invitees.length &&
        invitees.map((i) => (
          <Bar key={i._id}>
            <AvatarLink to={"/members/" + i._id} name={i.name} />
            <TextCenterLink to={i._id} text={i.name} />
            <TextCenterLink
              to={"passwordlink/" + i._id}
              text='Reset Password Link'
            />
            <Empty />
          </Bar>
        ))}

      <Outlet />
    </>
  );
};

export default MemberInvites;
