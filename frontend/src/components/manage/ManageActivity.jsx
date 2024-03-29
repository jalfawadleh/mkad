import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

import axios from "axios";
import { ActivitiesContext, MapContext, UserContext } from "../../store.js";
import Loader from "../common/Loader.jsx";

import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Modal from "react-bootstrap/Modal";

import ListItems from "../common/ListItems.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Location from "../common/Location.jsx";
import Period from "../common/Period.jsx";
import {
  IconButton,
  IconCircleActivity,
  IconCircleClose,
  LinkButtoneBack,
} from "../common/LinkItems.jsx";

const Activity = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const { getMapItems } = useContext(MapContext);
  const { getActivities } = useContext(ActivitiesContext);

  const [activity, setActivity] = useState({
    _id: id ? id : "",
    name: "",
    startOn: "",
    endOn: "",
    description: "",
    notes: [],
    languages: [],
    interests: [],
    helpOffered: [],
    helpNeeded: [],
    createdBy: [],
    hidden: false,
    location: { lng: -122.2683, lat: 37.8243 },
  });

  const {
    name,
    startOn,
    endOn,
    description,
    languages,
    interests,
    notes,
    helpOffered,
    helpNeeded,
    hidden,
    createdBy,
    location,
  } = activity;

  const isOwner = createdBy?._id === user._id;
  const isCreating = activity._id ? false : true;
  const [isEditing, setIsEditing] = useState(isCreating);

  const [isLoading, setIsLoading] = useState(false);

  const onPut = async () => {
    // checking for common required fields
    setIsLoading(true);
    try {
      if (activity._id)
        await axios
          .put("/activities/", activity)
          .then(() => toast("Updated"))
          .then(() => setIsLoading(false))
          .then(() => getActivities())
          .then(() => getMapItems());
      else
        await axios
          .post("/activities/", activity)
          .then(() => toast("Created"))
          .then(() => setIsLoading(false))
          .then(() => getActivities())
          .then(() => getMapItems());
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  const onDelete = async () => {
    var result = confirm("Are you sure?");
    if (result) {
      setIsLoading(true);
      try {
        await axios
          .delete(`/activities/${id}`)
          .then(() => setIsLoading(false))
          .then(() => getActivities())
          .then(() => getMapItems())
          .then(() => navigate(-1));
      } catch (error) {
        error?.response?.data?.message &&
          toast.error(error?.response.data.message);
        error?.response?.status > 499 && toast.error("Something went wrong");
      }
    }
  };

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

  const onChange = (e) => {
    setActivity((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const closeActivity = () => {
    navigate(-1);
  };

  useEffect(() => {
    activity._id && getActivity(activity._id);
  }, [activity._id]);

  return (
    <>
      <Modal show={!isLoading} onHide={closeActivity} centered>
        <div className='bg-black p-1'>
          {/* icon title join and close */}
          <div className='d-flex justify-content-between m-1 p-1'>
            <IconCircleActivity />
            <div className='p-1 m-1 badge border border-primary w-100'>
              <span className='h5'>{name}</span>
            </div>
            <IconCircleClose />
          </div>
          <hr className='m-1' />

          {isEditing && (
            <FloatingLabel controlId='name' label='Name' className='p-1 m-1'>
              <Form.Control
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={onChange}
                className='mt-1'
                size='sm'
              />
            </FloatingLabel>
          )}

          <Period
            startOn={startOn}
            endOn={endOn}
            setParent={setActivity}
            isEditing={isEditing}
          />

          {isEditing ? (
            <>
              <FloatingLabel
                controlId='description'
                label='Description'
                className='p-1 m-1'
              >
                <Form.Control
                  type='description'
                  placeholder='Description'
                  name='description'
                  value={description}
                  onChange={onChange}
                />
              </FloatingLabel>
              <hr className='m-1' />
            </>
          ) : (
            description && (
              <>
                <div className='p-2 m-0'>{description}</div>{" "}
                <hr className='m-1' />
              </>
            )
          )}

          <ListItems
            edit={isEditing}
            message='Languages'
            type='languages'
            title='language'
            items={languages}
            setParent={setActivity}
          />

          <ListItems
            edit={isEditing}
            message='Interests'
            type='interests'
            title='interest'
            items={interests}
            setParent={setActivity}
          />

          <ListItems
            edit={isEditing}
            message='Notes'
            type='notes'
            title='note'
            items={notes}
            setParent={setActivity}
          />

          <ListItems
            edit={isEditing}
            message='Offer'
            type='helpOffered'
            title='Help Offered'
            items={helpOffered}
            setParent={setActivity}
          />

          <ListItems
            edit={isEditing}
            message='Want'
            type='helpNeeded'
            title='Help Needed'
            items={helpNeeded}
            setParent={setActivity}
          />

          {isEditing && (
            <>
              <Form.Check // prettier-ignore
                className='mb-3'
                type='checkbox'
                id='hidden'
                label='Hide activity from search and map'
                name='hidden'
                checked={hidden}
                onChange={() => {
                  setActivity((prevState) => ({
                    ...prevState,
                    hidden: !hidden,
                  }));
                }}
              />
              <hr className='m-1' />
            </>
          )}

          {isEditing && (
            <Location
              editing={isEditing}
              location={location}
              setParent={setActivity}
            />
          )}

          <div className='d-flex justify-content-between m-1 p-1'>
            <LinkButtoneBack />
            {isOwner && isEditing && !isCreating && (
              <>
                <span onClick={() => setIsEditing(false)}>
                  <IconButton>View</IconButton>
                </span>
                <span onClick={onPut}>
                  <IconButton>Update</IconButton>
                </span>
                <span onClick={onDelete}>
                  <IconButton>Delete</IconButton>
                </span>
              </>
            )}

            {isOwner && !isEditing && (
              <span onClick={() => setIsEditing(true)}>
                <IconButton>Edit</IconButton>
              </span>
            )}

            {isCreating && (
              <span onClick={onPut} disabled={!name}>
                <IconButton>Create</IconButton>
              </span>
            )}
          </div>
        </div>
      </Modal>
      {isLoading && <Loader />}
    </>
  );
};

export default Activity;
