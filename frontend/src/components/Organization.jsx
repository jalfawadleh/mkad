import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
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
  OrganisationCircle,
  ShareCircleLink,
  SpinnerCircle,
  TextCenterBox,
} from "./common/Icons.jsx";

const Organization = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isMember, setIsMembers] = useState(false);

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

  const getItem = async (id) => {
    setIsLoading(true);
    try {
      await axios
        .get(`/organisations/${id}`)
        .then((res) => setOrganisation(res.data))
        .then(() => setIsLoading(false));
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  const joinOrganisation = async () => {
    setIsJoining(true);
    try {
      await axios
        .get(`/organisations/join/${id}`)
        .then((res) =>
          setOrganisation((prev) => ({ ...prev, members: res.data }))
        )
        .then(() => setIsJoining(false));
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getItem(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setIsMembers(organisation.members.find((m) => m._id == user._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organisation.members]);

  const membersJoined = (
    <>
      {/* Join members list */}
      <div className='d-flex justify-content-start ms-2'>
        <div className='d-inline m-0 my-auto me-2 p-1 px-2 text-bg-primary rounded-pill rounded-end'>
          Members
        </div>
        {isJoining ? (
          <SpinnerCircle />
        ) : (
          <span onClick={() => joinOrganisation()}>
            <IconButton>{isMember ? "Leave" : "Join"}</IconButton>
          </span>
        )}

        {organisation.members?.map((m) => (
          <span className='me-1' key={m._id}>
            <AvatarLink name={m.name} to={"/member/" + m._id} />
          </span>
        ))}
      </div>
      <hr className='m-2' />
    </>
  );

  const organisationActivities = (
    <>
      {/* Join members list */}
      <div className='d-flex justify-content-start ms-2'>
        <div className='d-inline m-0 my-auto me-2 p-1 px-2 text-bg-success rounded-pill rounded-end'>
          Activities
        </div>
        {organisation.activities.map((m) => (
          <span className='me-1 p-0' key={m._id}>
            <ActivityCircleLink to={"/activities/" + m._id} />
            <div className='d-inline my-auto p-1'>{m.name}</div>
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
          <ShareCircleLink
            to={`/share/${organisation.type}/${organisation._id}/${organisation.name}`}
          />
          <DiscusstionCircleLink
            type='organisation'
            id={organisation._id}
            name={organisation.name}
            color='white'
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
