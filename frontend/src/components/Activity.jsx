import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";

import { UserContext } from "../store.js";

import { Col, Modal, Row, Stack } from "react-bootstrap";

import Loader from "./common/Loader.jsx";
import ListItems from "./common/ListItems.jsx";

import {
  AvatarMember,
  AvatarMemberLink,
  IconButton,
  IconCircleActivity,
  IconCircleClose,
} from "./common/LinkItems.jsx";

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
          <div className='d-flex justify-content-between mb-2 p-0'>
            <IconCircleActivity />
            <span className='p-0 m-1 badge border border-primary w-100'>
              <span className='h5 text-wrap'>
                {name}
                <Link
                  className='link-underline link-underline-opacity-0 ps-1'
                  to={"/member/" + createdBy._id}
                >
                  <img
                    height={24}
                    width={24}
                    src={
                      "https://api.multiavatar.com/" + createdBy.name + ".png"
                    }
                    alt='Profile Photo'
                    className='p-0 m-0'
                  />
                </Link>
              </span>
            </span>
            <IconCircleClose />
          </div>

          {/* members */}
          <div className='d-flex justify-content-wrap mb-2'>
            <IconButton>
              <span onClick={() => toggleJoin()}>
                {isMember ? "Leave" : "Join"}
              </span>
            </IconButton>
            {members.map((m) => (
              <AvatarMember name={m.name} key={m._id} />
            ))}
          </div>

          <Stack direction='horizontal' gap={1} className='p-0 m-2'>
            <span className='p-0 '>Start:</span>
            <span className='ms-auto text-center'>
              <div>{moment(startOn).format("DD MMMM YYYY")}</div>
              <div>{moment(startOn).format("h:mm:ss a")}</div>
            </span>
            <span className='p-0 ms-auto'>End:</span>
            <span className='p-1 ms-auto text-center'>
              <div>{moment(endOn).format("MMMM DD YYYY")}</div>
              <div>{moment(endOn).format("h:mm:ss a")}</div>
            </span>
          </Stack>
          {description && <div className='p-2 mb-3 bold'>{description}</div>}
          <ListItems
            edit={false}
            message='Languages'
            type='languages'
            title='language'
            items={languages}
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
            message='Notes'
            type='notes'
            title='note'
            items={notes}
            setParent={setActivity}
          />
          <ListItems
            edit={false}
            message='Offering Help With'
            type='helpOffered'
            title='Help Offered'
            items={helpOffered}
            setParent={setActivity}
          />
          <ListItems
            edit={false}
            message='Need Help With'
            type='helpNeeded'
            title='Help Needed'
            items={helpNeeded}
            setParent={setActivity}
          />
          <Row>
            <Col className='text-center'>
              <Link to={".."}>Back</Link>
            </Col>
          </Row>
        </div>
        {isLoading && <Loader />}
      </Modal>
    </>
  );
};

export default ManageActivity;
