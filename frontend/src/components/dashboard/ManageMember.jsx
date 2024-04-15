import { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";

import { MapContext, UserContext } from "../../store.js";

import {
  AvatarMember,
  TextCenterBox,
  IconButton,
  IconCircleClose,
  IconLoading,
  IconSpin,
  LinkButton,
  LinkButtoneBack,
} from "../common/LinkItems.jsx";
import Wrappers from "../common/Wrappers.jsx";

import ManageName from "../common/ManageName.jsx";
import ManageDescription from "../common/ManageDescription.jsx";
import ManageLanguages from "../common/ManageLanguages.jsx";
import ManageInterests from "../common/ManageInterests.jsx";
import ManageHelp from "../common/ManageHelp.jsx";
import ManageHidden from "../common/ManageHidden.jsx";
import ManageLocation from "../common/ManageLocation.jsx";

function ManageMember() {
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
    darkmood: true,
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
          }))
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
        .catch((error) => {
          setIsLoading(false);
          error?.response?.data?.message &&
            toast.error(error?.response.data.message);
          error?.response?.status > 499 && toast.error("Something went wrong");
        });
    };

    getProfile();
  }, [user._id]);

  return (
    <Wrappers.Modal>
      {/* icon itemName closeButton */}
      <Wrappers.Header>
        <AvatarMember name={member.name} />
        <TextCenterBox text={member.name} />
        <IconCircleClose />
      </Wrappers.Header>

      <Wrappers.Body>
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

        {isLoading && <IconLoading />}
      </Wrappers.Body>

      <Wrappers.Footer>
        <LinkButtoneBack />
        {editing ? (
          <>
            <span onClick={() => setEditing(false)}>
              <IconButton>View</IconButton>
            </span>
            <span onClick={onPut}>
              <IconButton>{isUpdating ? <IconSpin /> : "Update"}</IconButton>
            </span>
          </>
        ) : (
          <span onClick={() => setEditing(true)}>
            <IconButton>Edit</IconButton>
          </span>
        )}
        <LinkButton to={"/manage/account"}>Account</LinkButton>
      </Wrappers.Footer>
    </Wrappers.Modal>
  );
}

export default ManageMember;
