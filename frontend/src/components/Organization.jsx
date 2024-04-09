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
  LinkButtoneBack,
  IconLoading,
  IconSpin,
} from "./common/LinkItems.jsx";
import Wrapper from "./common/Wrappers.jsx";

import ManageDescription from "./common/ManageDescription.jsx";
import ManageLanguages from "./common/ManageLanguages.jsx";
import ManageInterests from "./common/ManageInterests.jsx";
import ManageHelp from "./common/ManageHelp.jsx";

const Organization = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isMember, setIsMembers] = useState(false);

  const [item, setItem] = useState({
    name: "",
    description: "",
    notes: [],
    languages: [],
    interests: [],
    helpOffered: [],
    helpNeeded: [],
    members: [],
  });

  const { name, members } = item;

  const getItem = async (id) => {
    setIsLoading(true);
    try {
      await axios
        .get(`/organisations/${id}`)
        .then((res) => setItem(res.data))
        .then(() => setIsLoading(false));
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  const joinItem = async () => {
    setIsJoining(true);
    try {
      await axios
        .get(`/organisations/join/${id}`)
        .then((res) => setItem(res.data))
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

  const toggleJoin = () => {
    joinItem();
    // putActivity();
  };

  useEffect(() => {
    setIsMembers(members.find((m) => m._id == user._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members]);

  return (
    <>
      <Wrapper.Modal>
        {/* icon itemName closeButton */}
        <Wrapper.Header>
          <CircleIconOrganisation />
          <BoxCenterText text={name} />
          <IconCircleClose />
        </Wrapper.Header>

        {/* Join members list */}
        <div className='d-flex justify-content-wrap p-0 m-1'>
          <LinkAvatarMember item={item} />
          <span onClick={() => toggleJoin()}>
            <IconButton>
              {isJoining ? <IconSpin /> : isMember ? "Leave" : "Join"}
            </IconButton>
          </span>
          {members.map((m) => (
            <LinkAvatarMember item={m} key={m._id} />
          ))}
        </div>
        <hr className='m-1' />

        <Wrapper.Body>
          <ManageDescription description={item.description} />
          <ManageLanguages languages={item.languages} />
          <ManageInterests interests={item.interests} />
          <ManageHelp
            help={item.help}
            parentId={item._id}
            parentType={item.type}
          />
          {isLoading && <IconLoading />}
        </Wrapper.Body>

        <Wrapper.Footer>
          <LinkButtoneBack />
        </Wrapper.Footer>
      </Wrapper.Modal>
    </>
  );
};

export default Organization;
