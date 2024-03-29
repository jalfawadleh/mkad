import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "axios";

import {
  Card,
  Col,
  Row,
  Button,
  Form,
  FloatingLabel,
  Modal,
  Stack,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { MapContext, UserContext } from "../../store.js";

import Loader from "../common/Loader.jsx";
import ListItems from "../common/ListItems.jsx";
import Location from "../common/Location.jsx";
import {
  AvatarMember,
  BoxCenterText,
  IconButton,
  IconCircleClose,
  LinkButton,
  LinkButtoneBack,
} from "../common/LinkItems.jsx";

function SettingsProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { getMapItems } = useContext(MapContext);

  const [editing, setEditing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [member, setMember] = useState({
    _id: user._id,
    name: "",
    description: "",
    languages: [],
    interests: [],
    helpOffered: [],
    helpNeeded: [],
    darkmood: true,
    hidden: true,
    location: "",
  });

  const {
    name,
    description,
    languages,
    interests,
    helpOffered,
    helpNeeded,
    hidden,
    location,
  } = member;

  const onPut = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios
        .put("/members", member)
        .then(() => getMapItems())
        .then(() => toast("Updated"))
        .then(() => setIsLoading(false))
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

  const closeActivity = () => {
    navigate(-1);
  };

  return (
    <>
      <Modal show={!isLoading} onHide={closeActivity} centered>
        <div className='bg-black p-1'>
          {/* icon itemName closeButton */}
          <div className='d-flex justify-content-between m-1 p-1'>
            <AvatarMember name={name} />
            <BoxCenterText text={name} />
            <IconCircleClose />
          </div>
          <hr className='my-1' />

          {editing && (
            <FloatingLabel controlId='name' label='Name' className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={onChange}
              />
              <Form.Text>Avatar depends on the name</Form.Text>
            </FloatingLabel>
          )}

          {editing ? (
            <FloatingLabel
              controlId='description'
              label='Description'
              className='mb-3'
            >
              <Form.Control
                type='text'
                placeholder='Description'
                name='description'
                value={description}
                onChange={onChange}
              />
            </FloatingLabel>
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
            message='Languages'
            type='languages'
            title='language'
            items={languages}
            setParent={setMember}
          />

          <ListItems
            edit={editing}
            message='Interests'
            type='interests'
            title='interest'
            items={interests}
            setParent={setMember}
          />

          <ListItems
            edit={editing}
            message='Offer'
            type='helpOffered'
            title='Help Offered'
            items={helpOffered}
            setParent={setMember}
          />

          <ListItems
            edit={editing}
            message='Want'
            type='helpNeeded'
            title='Help Needed'
            items={helpNeeded}
            setParent={setMember}
          />

          {editing && (
            <>
              <Form.Check // prettier-ignore
                className='mb-3'
                type='switch'
                id='hidden'
                label='Hide profile'
                checked={hidden}
                onChange={() =>
                  setMember((prev) => ({ ...prev, hidden: !hidden }))
                }
              />
              <hr className='my-1' />
            </>
          )}

          {editing && (
            <Location
              editing={editing}
              location={location}
              setParent={setMember}
            />
          )}

          <div className='d-flex justify-content-between m-1 p-1'>
            <LinkButtoneBack />
            {editing ? (
              <>
                <span onClick={() => setEditing(false)}>
                  <IconButton>View</IconButton>
                </span>
                <span onClick={onPut}>
                  <IconButton>Update</IconButton>
                </span>
              </>
            ) : (
              <span onClick={() => setEditing(true)}>
                <IconButton>Edit</IconButton>
              </span>
            )}
            <LinkButton to={"/account"}>Manage Account</LinkButton>
          </div>
        </div>
      </Modal>
      {isLoading && <Loader />}
    </>
  );
}

export default SettingsProfile;
