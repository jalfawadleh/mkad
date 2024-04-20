import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

import ManageDescription from "./common/ManageDescription.jsx";
import ManageLanguages from "./common/ManageLanguages.jsx";
import ManageInterests from "./common/ManageInterests.jsx";
import ManageHelp from "./common/ManageHelp.jsx";

import { TextCenterBox } from "./common/LinkItems.jsx";
import Wrappers, { Section } from "./common/Wrappers.jsx";
import {
  ActivityCircleLink,
  Avatar,
  CloseCircleLink,
  Loader,
  MessageCircleLink,
  OrganisationCircleLink,
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
            <span key={o._id}>
              <OrganisationCircleLink id={o._id} />
              <div className='d-inline me-2'>{o.name}</div>
            </span>
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
            <span key={a._id}>
              <ActivityCircleLink id={a._id} color='white' />
              <div className='d-inline me-2'>{a.name}</div>
            </span>
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

  useEffect(() => {
    async function getMember() {
      setIsLoading(true);
      await axios
        .get(`/members/${id}`)
        .then((res) => setMember(res.data))
        .then(() => setIsLoading(false))
        .catch((error) => {
          error?.response?.data?.message &&
            toast.error(error?.response.data.message);
          error?.response?.status > 499 && toast.error("Something went wrong");
        });
    }

    getMember();
  }, [id]);

  return (
    <>
      <Wrappers.Modal>
        <Wrappers.Header>
          <Avatar name={member.name} />
          <TextCenterBox text={member.name} />
          {member._id != user._id ? (
            <MessageCircleLink id={member._id} name={member.name} />
          ) : (
            ""
          )}
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
