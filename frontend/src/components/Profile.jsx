import { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";

import { MapContext, UserContext } from "../store.js";

import {
  IconButton,
  LinkButton,
  LinkButtoneBack,
} from "./common/LinkItems.jsx";
import Wrappers, { SectionForm } from "./common/Wrappers.jsx";

import ManageName from "./common/ManageName.jsx";
import ManageDescription from "./common/ManageDescription.jsx";
import ManageLanguages from "./common/ManageLanguages.jsx";
import ManageInterests from "./common/ManageInterests.jsx";
import ManageHelp from "./common/ManageHelp.jsx";
import ManageHidden from "./common/ManageHidden.jsx";
import ManageDarkmode from "./common/ManageDarkmode.jsx";
import ManageLocation from "./common/ManageLocation.jsx";
import {
  Avatar,
  CloseCircleLink,
  Loader,
  SpinnerCircle,
  TextCenterBox,
} from "./common/Icons.jsx";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const { setFlyToLocation } = useContext(MapContext);

  const [editing, setEditing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [member, setMember] = useState({
    _id: user._id,
    name: "",
    description: "",
    languages: [],
    interests: [],
    darkmode: true,
    hidden: true,
    location: "",
    help: [],
  });

  const onPut = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await axios
        .put("/members", member)
        .then(() => setFlyToLocation(member.location))
        .then(() => toast("Updated"))
        .then(() => setIsUpdating(false))
        // in case name or location changed
        .then(() =>
          setUser((prevState) => ({
            ...prevState,
            name: member.name,
            location: member.location,
          })),
        );
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);
      await axios
        .get(`/members/${user._id}`)
        .then((res) => setMember(res.data))
        .then(() => setIsLoading(false))
        .catch((error) => toast.error(error));
    };

    getProfile();
  }, [user._id]);

  return (
    <Wrappers.Modal>
      <Wrappers.Header>
        <Avatar name={member.name} />
        <TextCenterBox text={member.name} />
        <CloseCircleLink />
      </Wrappers.Header>

      <Wrappers.Body>
        <SectionForm>
          {editing && (
            <div className='text-center mb-2'>
              Your Profile Avatar is based on your name
            </div>
          )}
        </SectionForm>
        <ManageName
          name={member.name}
          setParent={setMember}
          editing={editing}
        />

        <ManageDescription
          description={member.description}
          setParent={setMember}
          editing={editing}
        />

        <ManageLanguages
          languages={member.languages}
          setParent={setMember}
          editing={editing}
        />

        <ManageInterests
          interests={member.interests}
          setParent={setMember}
          editing={editing}
        />

        <ManageHelp
          help={member.help}
          setParent={setMember}
          editing={editing}
        />
        <ManageDarkmode
          darkmode={member.darkmode}
          setParent={setMember}
          editing={editing}
        />

        <ManageHidden
          hidden={member.hidden}
          setParent={setMember}
          editing={editing}
        />
        <ManageLocation
          location={member.location}
          setParent={setMember}
          editing={editing}
        />

        {isLoading && <Loader />}
      </Wrappers.Body>

      <Wrappers.Footer>
        <LinkButtoneBack />
        {editing ? (
          <>
            <span onClick={() => setEditing(false)}>
              <IconButton>View</IconButton>
            </span>
            <span onClick={onPut}>
              <IconButton>
                {isUpdating ? <SpinnerCircle /> : "Update"}
              </IconButton>
            </span>
          </>
        ) : (
          <span onClick={() => setEditing(true)}>
            <IconButton>Edit</IconButton>
          </span>
        )}
        <LinkButton to={"/account"}>Account</LinkButton>
      </Wrappers.Footer>
    </Wrappers.Modal>
  );
}

export default Profile;
