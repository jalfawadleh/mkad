import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/http.js";
import { Bar } from "../common/Wrappers";
import {
  AvatarLink,
  Empty,
  ExclamationCircle,
  InviteCircle,
  MemberAddCircleLink,
  MemberPasswordCircleLink,
  TextCenterBox,
  TextCenterLink,
} from "../common/Icons";

const MemberInvites = () => {
  const [invitees, setInvitees] = useState([]);

  const getInvitees = async () => {
    await axios
      .get("/invites")
      .then((res) => setInvitees(res.data))
      .catch((error) => toast.error(getErrorMessage(error)));
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
        <MemberAddCircleLink to='invite' />
      </Bar>

      {invitees.length ? (
        invitees.map((i) => (
          <Bar key={i._id}>
            <AvatarLink to={"/members/" + i._id} name={i.name} />
            <TextCenterLink to={i._id} text={i.name} />
            <TextCenterLink
              to={"passwordlink/" + i._id}
              text='Reset Password Link'
            />
            <MemberPasswordCircleLink to={"passwordlink/" + i._id} />
          </Bar>
        ))
      ) : (
        <Bar>
          <ExclamationCircle />
          <div className='m-auto p-auto text-center'>
            Invites has not been used yet
          </div>
          <Empty />
        </Bar>
      )}

      <Outlet />
    </>
  );
};

export default MemberInvites;
