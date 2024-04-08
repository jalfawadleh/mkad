import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { UserContext } from "../store.js";
import ListItems from "./common/ListItems.jsx";

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
import { WrapperModal } from "./common/Wrappers.jsx";

import ManagePeriod from "./common/ManagePeriod.jsx";

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
      <WrapperModal>
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
          <ManagePeriod
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

          {isLoading && <IconLoading />}
        </div>

        <div className='d-flex justify-content-between m-1 p-1'>
          <LinkButtoneBack />
        </div>
      </WrapperModal>
    </>
  );
};

export default Organization;
