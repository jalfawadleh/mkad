import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { UserContext } from "../store.js";

import { Modal } from "react-bootstrap";

import Loader from "./common/Loader.jsx";
import ListItems from "./common/ListItems.jsx";

import {
  AvatarMemberLink,
  IconButton,
  IconButtonBack,
  IconCircleActivity,
  IconCircleClose,
} from "./common/LinkItems.jsx";
import Period from "./common/Period.jsx";

const ManageActivity = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    try {
      await axios
        .get(`/activities/join/${id}`)
        .then((res) => setActivity(res.data))
        .then(() => setIsLoading(false));
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  const closeActivity = () => {
    navigate(-1);
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
      <Modal show={true} onHide={closeActivity}>
        <div className='bg-black p-1'>
          {/* icon title join and close */}
          <div className='d-flex justify-content-between m-1 p-0'>
            <IconCircleActivity />
            <AvatarMemberLink member={createdBy} />
            <div className='p-1 m-1 badge border border-primary w-100'>
              <span className='h5'>{name}</span>
            </div>
            <IconCircleClose />
          </div>
          <hr className='m-1' />

          {/* members */}
          <div className='d-flex justify-content-wrap p-1 m-1'>
            <IconButton>
              <span onClick={() => toggleJoin()}>
                {isMember ? "Leave" : "Join"}
              </span>
            </IconButton>
            {members.map((m) => (
              <AvatarMemberLink member={m} key={m._id} />
            ))}
          </div>

          <hr className='m-1' />

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
            edit={false}
            message='Notes'
            type='notes'
            title='note'
            items={notes}
            setParent={setActivity}
          />
          <ListItems
            edit={false}
            message='Offering'
            type='helpOffered'
            title='Help Offered'
            items={helpOffered}
            setParent={setActivity}
          />
          <ListItems
            edit={false}
            message='Need'
            type='helpNeeded'
            title='Help Needed'
            items={helpNeeded}
            setParent={setActivity}
          />

          <ListItems
            edit={false}
            message='Related Interests and hobbies'
            type='interests'
            title='interest'
            items={interests}
            setParent={setActivity}
          />

          <ListItems
            edit={false}
            message='Languages'
            type='languages'
            title='language'
            items={languages}
            setParent={setActivity}
          />

          <hr className='m-1' />
          <div className='d-flex justify-content-between m-1 p-0'>
            <IconButtonBack />
          </div>
        </div>
        {isLoading && <Loader />}
      </Modal>
    </>
  );
};

export default ManageActivity;
