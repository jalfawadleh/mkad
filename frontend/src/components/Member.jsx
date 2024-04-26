import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

import ManageDescription from "./common/ManageDescription.jsx";
import ManageLanguages from "./common/ManageLanguages.jsx";
import ManageInterests from "./common/ManageInterests.jsx";
import ManageHelp from "./common/ManageHelp.jsx";

import Wrappers, { Section } from "./common/Wrappers.jsx";
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
        <Section>
          <div className='d-inline m-0 me-2 p-2 ps-2 text-bg-secondary rounded-pill rounded-end'>
            Member of
          </div>
          {organisations.map((o) => (
            <div className='d-inline-block' key={o._id}>
              <OrganisationCircleLink to={"/organisations/" + o._id} />
              <div className='d-inline me-2'>{o.name}</div>
            </div>
          ))}
        </Section>
        <hr className='my-2' />
      </>
    )
  );
};

const MemberActivities = ({ activities = [] }) => {
  return (
    activities.length > 0 && (
      <>
        <Section>
          <div className='d-inline m-0 me-2 p-2 pe-3 text-bg-success rounded-pill rounded-end'>
            Attending
          </div>
          {activities.map((a) => (
            <div className='d-inline-block' key={a._id}>
              <ActivityCircleLink to={"/activities/" + a._id} />

              <div className='d-inline me-2'>{a.name}</div>
            </div>
          ))}
        </Section>
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

  const getMember = async () => {
    await axios
      .get(`/members/${id}`)
      .then((res) => {
        setMember(res.data);
        res.data.contacts.map((c) => {
          if (c._id == user._id) setIsContact(c);
        });
      })
      .catch(() => toast.error("Something went wrong"));
  };

  useEffect(() => {
    setIsLoading(true);
    getMember();
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postContact = async () => {
    setIsUpdating(true);
    const contact = { _id: member._id, name: member.name };
    await axios
      .post("/contacts", contact)
      .then(() => getMember())
      .then(() => setIsUpdating(false))
      .catch(() => toast.error("Something went wrong"));
  };

  const memberContact =
    member._id != user._id &&
    (isUpdating ? (
      <SpinnerCircle />
    ) : !isContact ? (
      <span onClick={() => postContact()}>
        <MemberAddCircle />
      </span>
    ) : (
      isContact.approved && (
        <MessageCircleLink
          to={`/conversations/member/${member._id}/${member.name}`}
        />
      )
    ));

  return (
    <>
      <Wrappers.Modal>
        <Wrappers.Header>
          <Avatar name={member.name} />
          <TextCenterBox text={member.name} />
          <LocationCircleLink location={member.location} />
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
