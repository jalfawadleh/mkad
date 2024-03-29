import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { UserContext } from "../store.js";

import { Modal } from "react-bootstrap";

import Loader from "./common/Loader.jsx";
import ListItems from "./common/ListItems.jsx";

import {
  LinkAvatarMember,
  IconButton,
  IconCircleClose,
  CircleIconOrganisation,
  BoxCenterText,
  LinkButtoneBack,
} from "./common/LinkItems.jsx";
import Period from "./common/Period.jsx";

const Organization = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
    members,
  } = item;

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
    setIsLoading(true);
    try {
      await axios
        .get(`/organisations/join/${id}`)
        .then((res) => setItem(res.data))
        .then(() => setIsLoading(false));
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  const closeItem = () => {
    navigate(-1);
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
      <Modal show={!isLoading} onHide={closeItem} centered>
        <div className='bg-black p-1'>
          {/* icon itemName closeButton */}
          <div className='d-flex justify-content-between m-1 p-1'>
            <CircleIconOrganisation />
            <BoxCenterText text={name} />
            <IconCircleClose />
          </div>
          <hr className='my-1' />

          {/* Join members list */}
          <div className='d-flex justify-content-wrap p-0 m-1'>
            <LinkAvatarMember item={item} />
            <span onClick={() => toggleJoin()}>
              <IconButton>{isMember ? "Leave" : "Join"}</IconButton>
            </span>
            {members.map((m) => (
              <LinkAvatarMember item={m} key={m._id} />
            ))}
          </div>
          <hr className='m-1' />

          <Period
            startOn={startOn}
            endOn={endOn}
            setParent={setItem}
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
            setParent={setItem}
          />
          <ListItems
            message='Offer'
            type='helpOffered'
            title='Help Offered'
            items={helpOffered}
            setParent={setItem}
          />
          <ListItems
            message='Want'
            type='helpNeeded'
            title='Help Needed'
            items={helpNeeded}
            setParent={setItem}
          />

          <ListItems
            message='Interests'
            type='interests'
            title='interest'
            items={interests}
            setParent={setItem}
          />

          <ListItems
            message='Languages'
            type='languages'
            title='language'
            items={languages}
            setParent={setItem}
          />

          <div className='d-flex justify-content-between m-1 p-1'>
            <LinkButtoneBack />
          </div>
          {isLoading && <Loader />}
        </div>
      </Modal>
    </>
  );
};

export default Organization;
