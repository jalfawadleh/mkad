import { useContext, useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";
import { UserContext } from "../store.js";
import { getErrorMessage } from "../utils/http.js";

import { IconButton, LinkButtoneBack } from "./common/LinkItems.jsx";
import Wrappers, { SectionForm } from "./common/Wrappers.jsx";
import {
  CloseCircleLink,
  Loader,
  MemberCircle,
  SpinnerCircle,
  TextCenterBox,
} from "./common/Icons.jsx";

function Account() {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [newDetails, setNewDetails] = useState({
    _id: user._id,
    username: "",
    password: "",
    confirmPassword: "",
    currentPassword: "",
  });

  const { username, password, confirmPassword, currentPassword } = newDetails;

  const onPut = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
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
      setIsUpdating(false);
      toast.error(getErrorMessage(error));
    }
  };

  const onDelete = async () => {
    const result = confirm("Are you sure?");
    if (result) {
      setIsLoading(true);
      try {
        await axios.delete(`/users`).then(() => setUser([]));
      } catch (error) {
        toast.error(getErrorMessage(error));
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
      <Wrappers.Modal>
        <Wrappers.Header>
          <MemberCircle />
          <TextCenterBox text='Update Account' />
          <CloseCircleLink />
        </Wrappers.Header>

        <Wrappers.Body>
          <div className='p-0 mb-2 text-center text-warning'>
            Enter only fields you want to Update and Current Password
          </div>
          <hr className='my-2' />
          <SectionForm>
            <div className='form-floating m-1'>
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
          </SectionForm>
          <hr className='my-2' />
          <SectionForm>
            <div className='form-floating m-1'>
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

            <div className='form-floating m-1'>
              <input
                className='form-control'
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
          </SectionForm>
          <hr className='my-2' />
          <SectionForm>
            <div className='text-center'>
              Enter Current password for verification
            </div>

            <div className='form-floating m-1'>
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
          </SectionForm>
          {isLoading && <Loader />}
        </Wrappers.Body>
        <hr className='my-2' />
        <Wrappers.Footer>
          <LinkButtoneBack />
          <span onClick={onPut}>
            <IconButton>{isUpdating ? <SpinnerCircle /> : "Update"}</IconButton>
          </span>
          <span onClick={onDelete}>
            <IconButton>Delete</IconButton>
          </span>
        </Wrappers.Footer>
      </Wrappers.Modal>
    </>
  );
}

export default Account;
