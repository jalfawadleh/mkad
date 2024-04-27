import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Bar } from "../common/Wrappers";
import {
  AvatarLink,
  Empty,
  ExclamationCircle,
  MemberApproveCircle,
  MemberDeleteCircle,
  MemberManageCircle,
  TextCenterLink,
} from "../common/Icons";
import { UserContext } from "../../store";

const ManageMembers = () => {
  const { user } = useContext(UserContext);
  const [members, setMembers] = useState([]);

  const getMembers = async () => {
    await axios
      .get("/members/" + user._id)
      .then((res) => setMembers(res.data.members))
      .catch(() => toast.error("Something went wrong"));
  };

  useEffect(() => {
    getMembers();
  }, []);

  const approveMember = async (id) => {
    await axios
      .post("/organisations/approve", { id })
      .then(() => getMembers())
      .catch(() => toast.error("Something went wrong"));
  };

  const deleteMember = async (id) => {
    await axios
      .delete("/organisations/" + id)
      .then(() => getMembers())
      .catch(() => toast.error("Something went wrong"));
  };

  return (
    <>
      <div className='my-2' />
      <Bar>
        <MemberManageCircle />
        <div className='m-auto p-auto text-center'>Manage Members</div>
        <Empty />
      </Bar>

      {members.length ? (
        members.map((m) => (
          <Bar key={m._id}>
            <AvatarLink to={"/members/" + m._id} name={m.name} />
            <TextCenterLink to={"/members/" + m._id} text={m.name} />
            <span onClick={() => deleteMember(m._id)}>
              <MemberDeleteCircle />
            </span>
            {!m.approved && (
              <span onClick={() => approveMember(m._id)}>
                <MemberApproveCircle />
              </span>
            )}
          </Bar>
        ))
      ) : (
        <Bar>
          <ExclamationCircle color='white' />
          <span className='p-auto m-auto'>No Members Joined</span>
        </Bar>
      )}

      <Outlet />
    </>
  );
};

export default ManageMembers;
