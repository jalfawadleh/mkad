import { useContext, useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";
import { UserContext } from "../../store.js";

import {
  BoxCenterText,
  IconButton,
  IconCircleClose,
  IconCirlceAccount,
  IconLoading,
  IconSpin,
  LinkButtoneBack,
} from "../common/LinkItems.jsx";
import { WrapperModal } from "./common/Wrappers.jsx";

function ManageAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user, setUser } = useContext(UserContext);
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
        await axios.delete(`/users`).then(() => setUser([]));
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
          <BoxCenterText text='Update Account' />
          <IconCircleClose />
        </div>
        <hr className='m-1' />
        <div className='overflow-y-auto p-1 m-0'>
          <div className='p-0 mb-2 text-center'>
            Enter only fields you want to Update and Current Password
          </div>

          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Username'
              id='username'
              name='username'
              value={username}
              size='small'
              onChange={onChange}
            />
            <label htmlFor='username'>Username</label>
          </div>

          <div className='form-floating mb-3'>
            <input
              className='form-control'
              id='password'
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              size='small'
              onChange={onChange}
            />
            <label htmlFor='password'>Password</label>
          </div>

          <div className='form-floating mb-3'>
            <input
              className='form-control mb-3'
              id='confirmPassword'
              type='password'
              placeholder='Confirm Password'
              name='confirmPassword'
              value={confirmPassword}
              size='small'
              onChange={onChange}
            />
            <label htmlFor='confirmPassword'>Confirm Password</label>
          </div>

          <div className='text-center'>
            Email will only be used for password reset
          </div>

          <div className='form-floating mb-3'>
            <input
              className='form-control mb-3'
              id='email'
              type='email'
              placeholder='email@proton.me'
              name='email'
              value={email}
              size='small'
              onChange={onChange}
            />
            <label htmlFor='email'>Email</label>
          </div>

          <div className='text-center'>
            Enter Current password for verification
          </div>

          <div className='form-floating mb-3'>
            <input
              className='form-control'
              id='currentPassword'
              type='password'
              placeholder='Current Password'
              name='currentPassword'
              value={currentPassword}
              onChange={onChange}
            />
            <label htmlFor='currentPassword'>Current Password</label>
          </div>

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
