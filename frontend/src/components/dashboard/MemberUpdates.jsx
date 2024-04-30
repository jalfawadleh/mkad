import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Bar } from "../common/Wrappers";
import {
  ActivityCircleLink,
  AvatarLink,
  Delete,
  DeleteCircle,
  Empty,
  ExclamationCircle,
  MemberCircleLink,
  MessageCircleLink,
  OrganisationCircleLink,
  TextCenterLink,
  UpdatesCircle,
} from "../common/Icons";
import { UserContext } from "../../store";

// sender: {
//   _id: { type: Schema.Types.ObjectId },
//   type: { type: String },
//   name: { type: String },
// },
// recipient: {
//   _id: { type: Schema.Types.ObjectId },
//   type: { type: String },
//   name: { type: String },
// },
// type: { type: String },
// content: { type: String, default: "" },
// read: { type: Boolean, default: false },

// Member Contact Requested
// Member Message Receieved

const MemberUpdates = () => {
  const { setUser } = useContext(UserContext);
  const [updates, setUpdates] = useState([]);

  const getUpdates = async () => {
    await axios
      .get("/updates")
      .then((res) => {
        setUpdates(res.data);
        setUser((prev) => ({
          ...prev,
          updates: res.data.length ? true : false,
        }));
      })
      .catch(() => toast.error("Something went wrong"));
  };

  useEffect(() => {
    getUpdates();
  }, []);

  const deleteUpdate = async (id) => {
    await axios
      .delete("/updates/" + id)
      .then(() => getUpdates())
      .catch(() => toast.error("Something went wrong"));
  };

  return (
    <>
      <div className='my-2' />
      <Bar>
        <UpdatesCircle />
        <div className='p-auto m-auto text-center'>Updates</div>
        <Empty />
      </Bar>

      {updates.length ? (
        updates.map((u) => (
          <Bar key={u._id}>
            {
              {
                member: (
                  <AvatarLink
                    to={"/members/" + u.sender._id}
                    name={u.sender.name}
                  />
                ),
                organisation: (
                  <OrganisationCircleLink
                    to={"/organisations/" + u.sender._id}
                  />
                ),
                activity: (
                  <ActivityCircleLink to={"/activities/" + u.sender._id} />
                ),
              }[u.sender.type]
            }
            <TextCenterLink to='/members' text={u.content} />
            <span onClick={() => deleteUpdate(u._id)}>
              <DeleteCircle />
            </span>

            {
              {
                contact: <MemberCircleLink to={"/members"} />,
                message: (
                  <MessageCircleLink
                    to={`/messaging/${u.sender._id}/${u.sender.name}`}
                  />
                ),
              }[u.type]
            }
          </Bar>
        ))
      ) : (
        <Bar>
          <ExclamationCircle color='white' />
          <span className='p-auto m-auto'>No Updates yet</span>
        </Bar>
      )}

      <Outlet />
    </>
  );
};

export default MemberUpdates;
