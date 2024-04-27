import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { UserContext } from "../store.js";

import { IconButton } from "./common/LinkItems.jsx";
import Wrapper from "./common/Wrappers.jsx";

import ManageDescription from "./common/ManageDescription.jsx";
import ManageLanguages from "./common/ManageLanguages.jsx";
import ManageInterests from "./common/ManageInterests.jsx";
import ManageHelp from "./common/ManageHelp.jsx";
import {
  ActivityCircleLink,
  AvatarLink,
  CloseCircleLink,
  DiscusstionCircleLink,
  Loader,
  LocationCircleLink,
  OrganisationCircle,
  ShareCircleLink,
  SpinnerCircle,
  TextCenterBox,
} from "./common/Icons.jsx";

const Organization = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isMember, setIsMember] = useState(false);

  const [organisation, setOrganisation] = useState({
    _id: id,
    name: "",
    description: "",
    notes: [],
    languages: [],
    interests: [],
    help: [],
    members: [],
    activities: [],
  });

  const getOrganisation = async () => {
    setIsLoading(true);
    await axios
      .get(`/organisations/${id}`)
      .then((res) => {
        setOrganisation(res.data);
        res.data.members.map(
          (member) => member._id == user._id && setIsMember(member)
        );
      })
      .then(() => setIsLoading(false))
      .catch(() => toast.error("Something went wrong"));
  };

  const joinOrganisation = async () => {
    await axios
      .post("/organisations/join", { id })
      .then(() =>
        setIsMember({
          _id: "662c8211a67ce64e7e78c8b6",
          name: "claire",
          approved: false,
        })
      )
      .catch(() => toast.error("Something went wrong"));
  };

  useEffect(() => {
    getOrganisation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const membersJoined = (
    <>
      {/* Join members list */}
      <div className='d-flex justify-content-start ms-2'>
        <div className='d-inline m-0 my-auto me-2 p-1 px-2 text-bg-primary rounded-pill rounded-end'>
          Members
        </div>

        {!isMember ? (
          <span onClick={() => joinOrganisation()}>
            <IconButton>Join</IconButton>
          </span>
        ) : (
          !isMember.approved && <IconButton>Pending Approval</IconButton>
        )}

        {organisation.members?.map(
          (m) =>
            m.approved && (
              <span className='me-1' key={m._id}>
                <AvatarLink name={m.name} to={"/members/" + m._id} />
              </span>
            )
        )}
      </div>
      <hr className='m-2' />
    </>
  );

  const organisationActivities = (
    <>
      {/* Join members list */}
      <div className='d-flex flex-wrap ms-2'>
        <div className='d-inline m-0 my-auto me-2 p-1 px-2 text-bg-success rounded-pill rounded-end'>
          Activities
        </div>
        {organisation.activities.map((m) => (
          <span className='d-inline-block me-1 p-0' key={m._id}>
            <div className='d-inline my-auto p-1'>
              <ActivityCircleLink to={"/activities/" + m._id} />
            </div>
            <div className='d-inline-block my-auto p-1'>{m.name}</div>
          </span>
        ))}
      </div>
      <hr className='m-2' />
    </>
  );

  return (
    <>
      <Wrapper.Modal>
        <Wrapper.Header>
          <OrganisationCircle />
          <TextCenterBox text={organisation.name} />
          <LocationCircleLink location={organisation.location} />
          <DiscusstionCircleLink
            type='organisation'
            id={organisation._id}
            name={organisation.name}
            color='white'
          />
          <ShareCircleLink
            to={`/share/${organisation.type}/${organisation._id}`}
          />

          <CloseCircleLink />
        </Wrapper.Header>
        {organisation.activities && organisationActivities}
        {membersJoined}
        <Wrapper.Body>
          <ManageDescription description={organisation.description} />
          <ManageLanguages languages={organisation.languages} />
          <ManageInterests interests={organisation.interests} />
          <ManageHelp help={organisation.help} />
          {isLoading && <Loader />}
        </Wrapper.Body>
      </Wrapper.Modal>
    </>
  );
};

export default Organization;
