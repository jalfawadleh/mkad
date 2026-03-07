import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import { getErrorMessage } from "../utils/http.js";

import ManageDescription from "./common/ManageDescription.jsx";
import ManageLanguages from "./common/ManageLanguages.jsx";
import ManageInterests from "./common/ManageInterests.jsx";
import ManageHelp from "./common/ManageHelp.jsx";

import Wrappers from "./common/Wrappers.jsx";
import {
  ActivityCircleLink,
  Avatar,
  CloseCircleLink,
  Loader,
  LocationCircleLink,
  MemberAddCircle,
  MessageCircleLink,
  OrganisationCircleLink,
  ShareCircleLink,
  SpinnerCircle,
  TextCenterBox,
} from "./common/Icons.jsx";
import { UserContext } from "../store.js";

const MemberOrganisations = ({ organisations = [] }) => {
  return (
    organisations.length > 0 && (
      <>
        <div className='d-flex flex-wrap'>
          <div
            className='d-inline-flex my-auto mx-1 p-1 ps-2 text-center border border-2 text-warning border-warning rounded-pill rounded-end'
            style={{ width: 100 }}
          >
            Member of
          </div>
          {organisations.map((o) => (
            <div className='d-inline-flex m-0 p-0' key={o._id}>
              <OrganisationCircleLink to={"/organisations/" + o._id} />
              <div className='d-inline-flex my-auto'>{o.name}</div>
            </div>
          ))}
        </div>
        <hr className='my-2' />
      </>
    )
  );
};

const MemberActivities = ({ activities = [] }) => {
  return (
    activities.length > 0 && (
      <>
        <div className='d-flex flex-wrap'>
          <div
            className='d-inline-flex my-auto mx-1 p-1 ps-3 text-center text-success border border-2 border-success rounded-pill rounded-end'
            style={{ width: 100 }}
          >
            Attending
          </div>
          {activities.map((a) => (
            <div className='d-inline-flex m-0 p-0' key={a._id}>
              <ActivityCircleLink to={"/activities/" + a._id} />
              <div className='d-inline-flex my-auto'>{a.name}</div>
            </div>
          ))}
        </div>
        <hr className='my-2' />
      </>
    )
  );
};

function Member() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isContact, setIsContact] = useState(false);

  const [member, setMember] = useState({
    _id: id,
    name: "",
    description: "",
    languages: [],
    interests: [],
    help: [],
    organisations: [],
    activities: [],
  });

  const getMember = useCallback(async () => {
    await axios
      .get(`/members/${id}`)
      .then((res) => {
        setMember(res.data);
        res.data.contacts.map((c) => {
          if (c._id === user._id) setIsContact(c);
        });
      })
      .catch((error) => toast.error(getErrorMessage(error)));
  }, [id, user._id]);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      await getMember();
      setIsLoading(false);
    };
    load();
  }, [getMember]);

  const postContact = async () => {
    setIsUpdating(true);
    const contact = { _id: member._id, name: member.name };
    await axios
      .post("/contacts", contact)
      .then(() => getMember())
      .then(() => toast("Contact request sent"))
      .then(() => setIsUpdating(false))
      .catch((error) => toast.error(getErrorMessage(error)));
  };

  const memberContact =
    member._id !== user._id &&
    (isUpdating ? (
      <SpinnerCircle />
    ) : !isContact ? (
      <span onClick={() => postContact()}>
        <MemberAddCircle />
      </span>
    ) : (
      isContact.approved && (
        <MessageCircleLink to={`/messaging/${member._id}/${member.name}`} />
      )
    ));

  return (
    <>
      <Wrappers.Modal>
        <Wrappers.Header>
          <Avatar name={member.name} />
          <TextCenterBox text={member.name} />
          <LocationCircleLink lat={member.lat} lng={member.lng} />
          <ShareCircleLink to={`/share/${member.type}/${member._id}`} />
          {memberContact}
          <CloseCircleLink />
        </Wrappers.Header>

        <Wrappers.Body>
          <MemberOrganisations organisations={member.organisations} />
          <MemberActivities activities={member.activities} />
          <ManageDescription description={member.description} />
          <ManageLanguages languages={member.languages} />
          <ManageInterests interests={member.interests} />
          <ManageHelp help={member.help} />
          {isLoading && <Loader />}
        </Wrappers.Body>
      </Wrappers.Modal>
    </>
  );
}

export default Member;
