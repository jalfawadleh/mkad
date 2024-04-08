import { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";

import { MapContext, UserContext } from "../../store.js";

import ListItems from "../common/ListItems.jsx";
import ManageHelp from "../common/ManageHelp.jsx";
import ManageLocation from "../common/ManageLocation.jsx";

import {
  AvatarMember,
  BoxCenterText,
  IconButton,
  IconCircleClose,
  IconLoading,
  IconSpin,
  LinkButton,
  LinkButtoneBack,
  WrapperModal,
} from "../common/LinkItems.jsx";
import ManageHidden from "../common/ManageHidden.jsx";

function SettingsProfile() {
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

  const { name, description, languages, interests, hidden, location, help } =
    member;

  const onPut = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await axios
        .put("/members", member)
        .then(() => setFlyToLocation(location))
        .then(() => toast("Updated"))
        .then(() => setIsUpdating(false))
        // in case name or location changed
        .then(() => setUser((prevState) => ({ ...prevState, name, location })));
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  const onChange = (e) => {
    setMember((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);
      try {
        await axios.get(`/members/${user._id}`).then((res) => {
          setMember(res.data);
          setIsLoading(false);
        });
      } catch (error) {
        setIsLoading(false);
        error?.response?.data?.message &&
          toast.error(error?.response.data.message);
        error?.response?.status > 499 && toast.error("Something went wrong");
      }
    };

    getProfile();
  }, [user._id]);

  return (
    <WrapperModal>
      {/* icon itemName closeButton */}
      <div className='d-flex justify-content-between m-1 p-1'>
        <AvatarMember name={name} />
        <BoxCenterText text={name} />
        <IconCircleClose />
      </div>
      <hr className='m-1' />

      <div className='overflow-y-auto p-1 m-0'>
        {editing && (
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

        {editing ? (
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
          edit={editing}
          message='Interests'
          type='interests'
          title='interest'
          items={interests}
          setParent={setMember}
        />

        <ManageHelp help={help} setParent={setMember} editing={editing} />
        <ListItems
          edit={editing}
          message='Languages'
          type='languages'
          title='language'
          items={languages}
          setParent={setMember}
        />

        <ManageHidden hidden={hidden} setParent={setMember} editing={editing} />
        <ManageLocation
          location={location}
          setParent={setMember}
          editing={editing}
        />

        {isLoading && <IconLoading />}
      </div>

      <div className='d-flex justify-content-between m-1 p-1'>
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
        <LinkButton to={"/account"}>Account</LinkButton>
      </div>
    </WrapperModal>
  );
}

export default SettingsProfile;
