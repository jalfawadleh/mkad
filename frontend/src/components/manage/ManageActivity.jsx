import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

import axios from "axios";
import { UserContext } from "../../store.js";
import { useNavigate, useParams } from "react-router-dom";

import { IconButton, LinkButtoneBack } from "../common/LinkItems.jsx";

import ManageName from "../common/ManageName.jsx";
import ManageDescription from "../common/ManageDescription.jsx";
import ManagePeriod from "../common/ManagePeriod.jsx";
import ManageLanguages from "../common/ManageLanguages.jsx";
import ManageHelp from "../common/ManageHelp.jsx";
import ManageHidden from "../common/ManageHidden.jsx";
import ManageOnline from "../common/ManageOnline.jsx";
import ManageLocation from "../common/ManageLocation.jsx";
import ManageInterests from "../common/ManageInterests.jsx";
import Wrappers from "../common/Wrappers.jsx";
import {
  ActivityCircle,
  CloseCircleLink,
  Loader,
  SpinnerCircle,
  TextCenterBox,
} from "../common/Icons.jsx";

const ManageActivity = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [activity, setActivity] = useState({
    _id: id ? id : "",
    name: "",
    startOn: Date.now() + 6 * 3600000,
    endOn: Date.now() + 7 * 3600000,
    description: "",
    notes: [],
    help: [],
    languages: [],
    interests: [],
    createdBy: [],
    hidden: false,
    online: { value: false, link: "" },
    location: { lng: -122.2683, lat: 37.8243 },
  });

  const isOwner = activity.createdBy?._id === user._id;
  const isCreating = activity._id ? false : true;
  const [isEditing, setIsEditing] = useState(isCreating);

  const onPut = async () => {
    // checking for common required fields
    setIsUpdating(true);
    if (activity._id)
      await axios
        .put("/activities/", activity)
        .then(() => toast("Updated"))
        .then(() => setIsUpdating(false))
        .then(() => navigate("/"))
        .catch((error) => {
          error?.response?.data?.message &&
            toast.error(error?.response.data.message);
          error?.response?.status > 499 && toast.error("Something went wrong");
        });
    else
      await axios
        .post("/activities/", activity)
        .then(() => toast("Created"))
        .then(() => setIsUpdating(false))
        .then(() => navigate("/"))
        .catch((error) => {
          error?.response?.data?.message &&
            toast.error(error?.response.data.message);
          error?.response?.status > 499 && toast.error("Something went wrong");
        });
  };

  const onDelete = async () => {
    var result = confirm("Are you sure?");
    if (result) {
      setIsLoading(true);
      await axios
        .delete(`/activities/${id}`)
        .then(() => setIsLoading(false))
        .then(() => navigate("/"))
        .catch((error) => {
          error?.response?.data?.message &&
            toast.error(error?.response.data.message);
          error?.response?.status > 499 && toast.error("Something went wrong");
        });
    }
  };

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

  useEffect(() => {
    activity._id && getActivity(activity._id);
  }, [activity._id]);

  return (
    <>
      <Wrappers.Modal>
        <Wrappers.Header>
          <ActivityCircle />
          <TextCenterBox
            text={
              activity.name ? activity.name : !activity._id && "New Activity"
            }
          />
          <CloseCircleLink />
        </Wrappers.Header>

        <Wrappers.Body>
          <ManageName
            name={activity.name}
            setParent={setActivity}
            editing={isEditing}
          />
          <ManageDescription
            description={activity.description}
            setParent={setActivity}
            editing={isEditing}
          />

          <ManagePeriod
            startOn={activity.startOn}
            endOn={activity.endOn}
            setParent={setActivity}
            isEditing={isEditing}
          />
          <ManageLanguages
            languages={activity.languages}
            setParent={setActivity}
            editing={isEditing}
          />
          <ManageInterests
            interests={activity.interests}
            setParent={setActivity}
            editing={isEditing}
          />
          <ManageHelp
            help={activity.help}
            parentType={activity.type}
            parentId={activity._id}
            setParent={setActivity}
            editing={isEditing}
          />
          <ManageHidden
            hidden={activity.hidden}
            setParent={setActivity}
            editing={isEditing}
          />
          <ManageOnline
            online={activity.online}
            setParent={setActivity}
            editing={isEditing}
          />
          <ManageLocation
            location={activity.location}
            setParent={setActivity}
            editing={isEditing}
          />
          {isLoading && <Loader />}
        </Wrappers.Body>

        <Wrappers.Footer>
          <LinkButtoneBack />
          {isOwner && isEditing && !isCreating && (
            <>
              <span onClick={() => setIsEditing(false)}>
                <IconButton>View</IconButton>
              </span>
              <span onClick={onPut}>
                <IconButton>
                  {isUpdating ? <SpinnerCircle /> : "Update"}
                </IconButton>
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
            <span onClick={onPut} disabled={!activity.name}>
              <IconButton>Create</IconButton>
            </span>
          )}
        </Wrappers.Footer>
      </Wrappers.Modal>
    </>
  );
};

export default ManageActivity;
