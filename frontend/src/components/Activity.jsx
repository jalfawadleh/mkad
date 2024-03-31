import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { UserContext } from "../store.js";

import ListItems from "./common/ListItems.jsx";

import {
  LinkAvatarMember,
  IconButton,
  IconCircleActivity,
  IconCircleClose,
  LinkButtoneBack,
  WrapperModal,
  IconSpin,
  IconLoading,
} from "./common/LinkItems.jsx";
import Period from "./common/Period.jsx";

const Activity = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isMember, setIsMembers] = useState(false);

  const [activity, setActivity] = useState({
    name: "",
    description: "",
    notes: [],
    languages: [],
    interests: [],
    helpOffered: [],
    helpNeeded: [],
    createdBy: [],
    members: [],
  });

  const {
    name,
    startOn,
    endOn,
    description,
    notes,
    languages,
    interests,
    helpOffered,
    helpNeeded,
    createdBy,
    members,
  } = activity;

  const getActivity = async (id) => {
    setIsLoading(true);
    try {
      await axios
        .get(`/activities/${id}`)
        .then((res) => setActivity(res.data))
        .then(() => setIsLoading(false));
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  const joinActivity = async () => {
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
    getActivity(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const toggleJoin = () => {
    joinActivity();
    // putActivity();
  };

  useEffect(() => {
    setIsMembers(members.find((m) => m._id == user._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members]);

  return (
    <>
      <WrapperModal>
        {/* icon title join and close */}
        <div className='d-flex justify-content-between m-1 p-1'>
          <IconCircleActivity />

          <div className='p-1 m-1 badge border border-primary w-100'>
            <span className='h5'>{name}</span>
          </div>
          <IconCircleClose />
        </div>
        <hr className='m-1' />

        {/* members */}
        <div className='d-flex justify-content-wrap p-1 m-1'>
          <LinkAvatarMember item={createdBy} />
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
        <div className='overflow-y-auto p-1 m-0'>
          <Period
            startOn={startOn}
            endOn={endOn}
            setParent={setActivity}
            isEditing={false}
          />

          {description && (
            <>
              <div className='d-flex justify-content-wrap p-2 m-1'>
                {description}
              </div>
              <hr className='m-1' />
            </>
          )}

          <ListItems
            message='Notes'
            type='notes'
            title='note'
            items={notes}
            setParent={setActivity}
          />
          <ListItems
            message='Offer'
            type='helpOffered'
            title='Help Offered'
            items={helpOffered}
            setParent={setActivity}
          />
          <ListItems
            message='Want'
            type='helpNeeded'
            title='Help Needed'
            items={helpNeeded}
            setParent={setActivity}
          />

          <ListItems
            message='Interests'
            type='interests'
            title='interest'
            items={interests}
            setParent={setActivity}
          />

          <ListItems
            message='Languages'
            type='languages'
            title='language'
            items={languages}
            setParent={setActivity}
          />

          {isLoading && <IconLoading />}
        </div>

        <div className='d-flex justify-content-between m-1 p-1'>
          <LinkButtoneBack />
        </div>
      </WrapperModal>
    </>
  );
};

export default Activity;
