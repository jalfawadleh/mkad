import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { UserContext } from "../store.js";

import {
  LinkAvatarMember,
  IconButton,
  IconCircleClose,
  CircleIconOrganisation,
  BoxCenterText,
  IconLoading,
  IconSpin,
} from "./common/LinkItems.jsx";
import Wrapper from "./common/Wrappers.jsx";

import ManageDescription from "./common/ManageDescription.jsx";
import ManageLanguages from "./common/ManageLanguages.jsx";
import ManageInterests from "./common/ManageInterests.jsx";
import ManageHelp from "./common/ManageHelp.jsx";
import { LinkCircleDiscusstion } from "./common/Icons.jsx";

const Organization = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isMember, setIsMembers] = useState(false);

  const [organisation, setOrganisation] = useState({
    name: "",
    description: "",
    notes: [],
    languages: [],
    interests: [],
    helpOffered: [],
    helpNeeded: [],
    members: [],
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
        .then((res) => setOrganisation(res.data))
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

  return (
    <>
      <Wrapper.Modal>
        {/* icon itemName closeButton */}
        <Wrapper.Header>
          <CircleIconOrganisation />
          <BoxCenterText text={organisation.name} />
          <LinkCircleDiscusstion
            type='organisation'
            id={organisation._id}
            name={organisation.name}
            color='white'
          />
          <IconCircleClose />
        </Wrapper.Header>

        {/* Join members list */}
        <div className='d-flex justify-content-wrap p-0 m-1'>
          <LinkAvatarMember item={organisation} />
          <span onClick={() => joinOrganisation()}>
            <IconButton>
              {isJoining ? <IconSpin /> : isMember ? "Leave" : "Join"}
            </IconButton>
          </span>
          {organisation.members.map((m) => (
            <LinkAvatarMember item={m} key={m._id} />
          ))}
        </div>
        <hr className='m-2' />

        <Wrapper.Body>
          <ManageDescription description={organisation.description} />
          <ManageLanguages languages={organisation.languages} />
          <ManageInterests interests={organisation.interests} />
          <ManageHelp help={organisation.help} />
          {isLoading && <IconLoading />}
        </Wrapper.Body>
      </Wrapper.Modal>
    </>
  );
};

export default Organization;
