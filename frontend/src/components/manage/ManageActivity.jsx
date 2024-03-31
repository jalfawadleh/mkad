import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

import axios from "axios";
import { ActivitiesContext, MapContext, UserContext } from "../../store.js";

import ListItems from "../common/ListItems.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Location from "../common/Location.jsx";
import Period from "../common/Period.jsx";
import {
  IconButton,
  IconCircleActivity,
  IconCircleClose,
  IconLoading,
  IconSpin,
  LinkButtoneBack,
  WrapperModal,
} from "../common/LinkItems.jsx";

const Activity = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const { getMapItems } = useContext(MapContext);
  const { getActivities } = useContext(ActivitiesContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

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

  const onPut = async () => {
    // checking for common required fields
    setIsUpdating(true);
    try {
      if (activity._id)
        await axios
          .put("/activities/", activity)
          .then(() => toast("Updated"))
          .then(() => setIsUpdating(false))
          .then(() => getActivities())
          .then(() => getMapItems());
      else
        await axios
          .post("/activities/", activity)
          .then(() => toast("Created"))
          .then(() => setIsUpdating(false))
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

  useEffect(() => {
    activity._id && getActivity(activity._id);
  }, [activity._id]);

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

        <div className='overflow-y-auto p-1 m-0'>
          {isEditing && (
            <>
              <div className='text-center'>
                Your Profile Avatar is based on your name
              </div>
              <div className='form-floating mb-3'>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  placeholder='Name'
                  name='name'
                  value={name}
                  onChange={onChange}
                />
                <label htmlFor='name'>Name</label>
              </div>
            </>
          )}

          {isEditing && (
            <>
              <div className='form-floating mb-3'>
                <input
                  type='text'
                  className='form-control'
                  id='description'
                  placeholder='Description'
                  name='name'
                  value={name}
                  onChange={onChange}
                />
                <label htmlFor='description'>Description</label>
              </div>
            </>
          )}

          <Period
            startOn={startOn}
            endOn={endOn}
            setParent={setActivity}
            isEditing={isEditing}
          />

          {isEditing ? (
            <>
              <div className='form-floating mb-3'>
                <input
                  type='text'
                  className='form-control'
                  id='description'
                  placeholder='Description'
                  name='description'
                  value={description}
                  onChange={onChange}
                />
                <label htmlFor='description'>Description</label>
              </div>
            </>
          ) : (
            description && (
              <>
                <div className='d-flex justify-content-wrap p-2 m-1'>
                  {description}
                </div>
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
              <div className='d-flex p-1 m-1 justify-content-left'>
                <input
                  type='checkbox'
                  className='btn-check mb-3'
                  id='hidden'
                  autoComplete='off'
                  checked={hidden}
                  onChange={() =>
                    setActivity((prev) => ({ ...prev, hidden: !hidden }))
                  }
                />
                <label className='btn btn-outline-warning ' htmlFor='hidden'>
                  Hide Activity
                </label>
                <div className='m-auto'>
                  Your Activity
                  {hidden ? " is hidden" : " is public"}
                </div>
              </div>
              <hr className='my-1' />
            </>
          )}

          {isEditing && (
            <Location
              editing={isEditing}
              location={location}
              setParent={setActivity}
            />
          )}
          {isLoading && <IconLoading />}
        </div>

        <div className='d-flex justify-content-between m-1 p-1'>
          <LinkButtoneBack />
          {isOwner && isEditing && !isCreating && (
            <>
              <span onClick={() => setIsEditing(false)}>
                <IconButton>View</IconButton>
              </span>
              <span onClick={onPut}>
                <IconButton>{isUpdating ? <IconSpin /> : "Update"}</IconButton>
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
      </WrapperModal>
    </>
  );
};

export default Activity;
