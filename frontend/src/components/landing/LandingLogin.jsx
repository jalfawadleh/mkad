import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../store";
import { IconButton } from "../common/LinkItems";
import {
  OrganisationCircle,
  MemberCircle,
  ActivityCircle,
} from "../common/Icons";

function LoginForm() {
  // const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [register, setRegister] = useState(false);

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
  });

  const { username, password, confirmPassword, name, email } = userData;

  const onSubmit = async (e) => {
    // checking for common required fields
    e.preventDefault();

    if (!username) toast.error("Please Enter a Username");
    else if (!password) toast.error("Please Enter Password");
    else if (!register) {
      // Login
      try {
        const { data } = await axios.post("/users/login", {
          username,
          password,
        });
        setUser(data);
      } catch (error) {
        error?.response?.data?.message &&
          toast.error(error?.response.data.message);
        error?.response?.status > 499 && toast.error("Something went wrong");
      }
    } else {
      // register
      if (password !== confirmPassword) toast.error("Passwords do not match");
      else if (name === "") toast.error("Please Enter a Name");
      else if (email === "") toast.error("Please Enter Email");
      else {
        try {
          const { data } = await axios.post("/users/", userData);
          setUser(data);
        } catch (error) {
          error?.response?.data?.message &&
            toast.error(error?.response.data.message);
          error?.response?.status > 499 && toast.error("Something went wrong");
        }
      }
    }
  };

  const onChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginForm = (
    <div className='p-2 needs-validation border border-primary-subtle container'>
      <div className='d-flex justify-content-end mb-1 pb-1'>
        <span role='button' style={{ width: 80 }} />
        <span className='h5 text-center m-auto'>
          {!register ? "Welcome Back" : "Create Account"}
        </span>
        <span role='button' onClick={() => setRegister(!register)}>
          <IconButton>{!register ? " or Join Us " : "or Login"}</IconButton>
        </span>
      </div>
      <form onSubmit={onSubmit}>
        <div className='mb-3 form-floating bg-black'>
          <input
            placeholder='Username'
            name='username'
            type='text'
            id='username'
            className='form-control bg-black'
            value={username}
            onChange={onChange}
            autoCorrect='off'
            autoCapitalize='none'
            autoComplete='off'
          />
          <label htmlFor='username'>Username</label>
        </div>

        <div className='mb-3 form-floating bg-black'>
          <input
            placeholder='Password'
            name='password'
            type='password'
            id='password'
            className='form-control bg-black'
            value={password}
            onChange={onChange}
            autoCorrect='off'
            autoCapitalize='none'
            autoComplete='off'
          />
          <label htmlFor='password'>Password</label>
        </div>

        {register && (
          <>
            <div className='mb-3 form-floating bg-black'>
              <input
                placeholder='Confirm Password'
                name='confirmPassword'
                type='password'
                id='confirmPassword'
                className='form-control bg-black'
                value={confirmPassword}
                onChange={onChange}
                autoCorrect='off'
                autoCapitalize='none'
                autoComplete='off'
              />
              <label htmlFor='confirmPassword'>Confirm Password</label>
            </div>

            <div className='mb-3 form-floating bg-black'>
              <input
                placeholder='Name'
                name='name'
                type='text'
                id='name'
                className='form-control bg-black'
                value={name}
                onChange={onChange}
                autoCorrect='off'
                autoCapitalize='none'
                autoComplete='off'
              />
              <label htmlFor='name'>Name</label>
            </div>

            <div className='mb-3 form-floating bg-black'>
              <input
                placeholder='name@example.com'
                name='email'
                type='email'
                id='email'
                className='form-control bg-black'
                value={email}
                onChange={onChange}
                autoCorrect='off'
                autoCapitalize='none'
                autoComplete='off'
              />
              <small id='emailHelp' className='text-muted'>
                Email will only be used for password reset
              </small>
              <label htmlFor='email'>Email address</label>
            </div>
          </>
        )}

        <div className='text-center'>
          <button
            type='submit'
            role='button'
            className='bg-black w-50 btn btn-primary link-primary text-white'
          >
            {register ? "Join " : "Login"}
          </button>
        </div>
      </form>
    </div>
  );

  const countersBox = (
    <div className='d-flex justify-content-around h5 my-3 py-3 '>
      <div className='text-center m-auto p-auto'>
        <OrganisationCircle /> 3 Organisation
      </div>
      <div className='text-center m-auto p-auto'>
        <ActivityCircle /> 4 Activities
      </div>
      <div className='text-center m-auto p-auto'>
        <MemberCircle />
        12 Members
      </div>
    </div>
  );

  return (
    <>
      <div id='login' className='container mt-3'>
        <div className='d-sm-block d-md-none'>
          {loginForm}
          {countersBox}
        </div>
        <div className='d-none d-md-flex justify-content-between '>
          <div className='w-50'>{loginForm}</div>
          <div className='w-50 m-auto p-3'>{countersBox}</div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
