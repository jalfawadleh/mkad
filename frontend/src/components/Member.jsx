import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

import ManageDescription from "./common/ManageDescription.jsx";
import ManageLanguages from "./common/ManageLanguages.jsx";
import ManageInterests from "./common/ManageInterests.jsx";
import ManageHelp from "./common/ManageHelp.jsx";

import {
  AvatarMember,
  BoxCenterText,
  IconCircleClose,
  IconLoading,
} from "./common/LinkItems.jsx";
import Wrappers, { Section } from "./common/Wrappers.jsx";

const MemberOrganisations = ({ organisations = [] }) => {
  return (
    organisations.length > 0 && (
      <>
        <Section>
          <div className='d-inline m-0 me-2 p-2 ps-2 text-bg-secondary rounded-pill rounded-end'>
            Member of
          </div>
          {organisations.map((o) => (
            <>
              <AvatarMember name={o.name} key={o._id} />
              <div className='d-inline me-2'>{o.name}</div>
            </>
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
            <>
              <AvatarMember name={a.name} key={a._id} />
              <div className='d-inline me-2'>{a.name}</div>
            </>
          ))}
        </Section>
        <hr className='my-2' />
      </>
    )
  );
};

function Member() {
  const { id } = useParams();

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
        {/* icon itemName closeButton */}
        <Wrappers.Header>
          <AvatarMember name={member.name} />
          <BoxCenterText text={member.name} />
          <IconCircleClose />
        </Wrappers.Header>

        <Wrappers.Body>
          <MemberOrganisations organisations={member.organisations} />
          <MemberActivities activities={member.activities} />
          <ManageDescription description={member.description} />
          <ManageLanguages languages={member.languages} />
          <ManageInterests interests={member.interests} />
          <ManageHelp help={member.help} />
          {isLoading && <IconLoading />}
        </Wrappers.Body>
      </Wrappers.Modal>
    </>
  );
}

export default Member;
