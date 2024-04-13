import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { UserContext } from "../store.js";

import {
  LinkAvatarMember,
  IconButton,
  IconCircleActivity,
  IconCircleClose,
  IconSpin,
  IconLoading,
  BoxCenterText,
} from "./common/LinkItems.jsx";

import Wrappers from "./common/Wrappers.jsx";

import ManageDescription from "./common/ManageDescription.jsx";
import ManagePeriod from "./common/ManagePeriod.jsx";
import ManageLanguages from "./common/ManageLanguages.jsx";
import ManageInterests from "./common/ManageInterests.jsx";
import ManageHelp from "./common/ManageHelp.jsx";
import ManageOnline from "./common/ManageOnline.jsx";

import {
  LinkCircleDiscusstion,
  LinkCircleOrganisation,
} from "./common/Icons.jsx";

const Activity = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isMember, setIsMember] = useState(false);

  const [activity, setActivity] = useState({
    name: "",
    description: "",
    languages: [],
    interests: [],
    createdBy: [],
    members: [],
    online: [],
  });

  const onJoin = async () => {
    setIsJoining(true);
    try {
      await axios
        .get(`/activities/join/${id}`)
        .then((res) => setActivity(res.data))
        .then(() => setIsJoining(false));
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const getActivity = async (id) => {
      setIsLoading(true);
      await axios
        .get(`/activities/${id}`)
        .then((res) => setActivity(res.data))
        .then(() => setIsLoading(false))
        .catch((error) => {
          error?.response?.data?.message &&
            toast.error(error?.response.data.message);
          error?.response?.status > 499 && toast.error("Something went wrong");
        });
    };

    getActivity(id);
    setIsMember(activity.members.find((m) => m._id == user._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setIsMember(activity.members.find((m) => m._id == user._id));
  }, [activity.members, user._id]);

  const joinSection = (
    <>
      <div className='d-flex justify-content-wrap p-1 m-1'>
        <LinkCircleOrganisation id={activity.createdBy._id} />
        <div className='d-inline-block mt-2 text-center'>
          {activity.createdBy.name}
        </div>

        <span onClick={() => onJoin()}>
          <IconButton>
            {isJoining ? <IconSpin /> : isMember ? "Leave" : "Join"}
          </IconButton>
        </span>
        {activity.members.map((m) => (
          <LinkAvatarMember item={m} key={m._id} />
        ))}
      </div>
      <hr className='m-1' />
    </>
  );

  return (
    <>
      <Wrappers.Modal>
        <Wrappers.Header>
          {/* icon title join and close */}
          <IconCircleActivity />
          <BoxCenterText text={activity.name} />
          <LinkCircleDiscusstion
            type='activity'
            id={activity._id}
            name={activity.name}
            color='white'
          />
          <IconCircleClose />
        </Wrappers.Header>
        {joinSection}
        <Wrappers.Body>
          <ManagePeriod startOn={activity.startOn} endOn={activity.endOn} />
          <ManageDescription description={activity.description} />
          <ManageLanguages languages={activity.languages} />
          <ManageInterests interests={activity.interests} />
          <ManageHelp
            help={activity.help}
            parentId={activity._id}
            parentType={activity.type}
          />
          <ManageOnline online={activity.online} />
          {isLoading && <IconLoading />}
        </Wrappers.Body>
      </Wrappers.Modal>
    </>
  );
};

export default Activity;
