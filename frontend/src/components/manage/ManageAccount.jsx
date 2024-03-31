import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { toast } from "react-toastify";
import { MapContext, UserContext } from "../../store.js";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import {
  IconButton,
  IconCircleClose,
  IconCirlceAccount,
  IconLoading,
  IconSpin,
  LinkButtoneBack,
  WrapperModal,
} from "../common/LinkItems.jsx";

function ManageAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useContext(UserContext);
  const { getMapItems } = useContext(MapContext);

  const [newDetails, setNewDetails] = useState({
    _id: user._id,
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    currentPassword: "",
  });

  const { username, password, confirmPassword, email, currentPassword } =
    newDetails;

  const onPut = async (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!currentPassword) {
      toast.error("Current Password is not valid");
      return;
    }
    setIsUpdating(true);
    try {
      await axios.put("/users/", newDetails).then((res) => {
        setIsUpdating(false);
        res.data && toast("Updated");
      });
    } catch (error) {
      setIsLoading(false);
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
          .delete(`/users`)
          .then(() => getMapItems())
          .then(() => setIsLoading(false))
          .then(() => navigate(-1));
      } catch (error) {
        error?.response?.data?.message &&
          toast.error(error?.response.data.message);
        error?.response?.status > 499 && toast.error("Something went wrong");
      }
    }
  };

  const onChange = (e) => {
    setNewDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <WrapperModal>
        {/* icon title join and close */}
        <div className='d-flex justify-content-between m-1 p-1'>
          <IconCirlceAccount />
          <div className='p-1 m-1 badge border border-primary w-100'>
            <span className='h5'>Update Account</span>
          </div>
          <IconCircleClose />
        </div>
        <hr className='m-1' />
        <div className='overflow-y-auto p-1 m-0'>
          <div className='p-0 mb-2 text-center'>
            Enter only fields you want to Update and Current Password
          </div>
          <FloatingLabel controlId='username' label='Username' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Username'
              name='username'
              value={username}
              size='small'
              onChange={onChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId='password' label='Password' className='mb-3'>
            <Form.Control
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              size='small'
              onChange={onChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId='confirmPassword'
            label='Confirm Password'
            className='mb-3'
          >
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              name='confirmPassword'
              value={confirmPassword}
              size='small'
              onChange={onChange}
            />
          </FloatingLabel>
          <div className='text-center'>
            Email will only be used for password reset
          </div>
          <FloatingLabel
            controlId='email'
            label='Email address'
            className='mb-3'
          >
            <Form.Control
              type='email'
              placeholder='name@example.com'
              name='email'
              value={email}
              size='small'
              onChange={onChange}
            />
          </FloatingLabel>
          <div className='text-center'>
            Enter Current password for verification
          </div>
          <FloatingLabel
            controlId='password'
            label='Current Password'
            className='mb-3'
          >
            <Form.Control
              type='password'
              placeholder='Current Password'
              name='currentPassword'
              value={currentPassword}
              onChange={onChange}
            />
          </FloatingLabel>

          {isLoading && <IconLoading />}
        </div>

        <div className='d-flex justify-content-between m-1 p-1'>
          <LinkButtoneBack />
          <span onClick={onPut}>
            <IconButton>{isUpdating ? <IconSpin /> : "Update"}</IconButton>
          </span>
          <span onClick={onDelete}>
            <IconButton>Delete</IconButton>
          </span>
        </div>
      </WrapperModal>
    </>
  );
}

export default ManageAccount;
