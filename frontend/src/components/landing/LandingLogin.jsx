import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../store";
import { IconButton } from "../common/LinkItems";

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
      <div className='d-flex justify-content-end m-1 p-1'>
        <span className='h4 text-center m-auto'>
          {!register ? "Welcome Back" : "Create Account"}
        </span>
        {/* sdfsdf */}
        <span role='button' onClick={() => setRegister(!register)}>
          <IconButton>{!register ? " or Join Us " : "or Login"}</IconButton>
        </span>
      </div>
      {/* <div className='text-center mb-3 container'>
        <img
          height='100px'
          width='100px'
          src='data:image/svg+xml;utf8,<svg fill="#ffffff" width="100" height="100" viewBox="20 -40 350 350" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="m202.13 132.55q-9.2643-10.376-25.755-24.828-18.158-15.935-24.458-25.014-6.2997-9.2642-6.2997-20.196 0-16.305 15.193-25.569 15.193-9.4495 39.651-9.4495 24.458 0 42.615 8.3378 18.343 8.3379 18.343 22.975 0 7.0408-4.4448 11.673-4.4448 4.632-10.376 4.632-8.5227 0-20.011-12.785-11.673-12.97-19.825-18.158-7.9673-5.373-18.714-5.373-13.711 0-22.605 6.1144-8.7088 6.1144-8.7088 15.564 0 8.8936 7.2262 16.676 7.2262 7.7819 37.242 28.349 32.054 22.049 45.21 34.463 13.34 12.414 21.678 30.202 8.3383 17.787 8.3383 37.613 0 34.834-24.643 61.515-24.458 26.496-57.253 26.496-29.831 0-50.398-21.308-20.566-21.308-20.566-56.882 0-34.278 22.604-57.253 22.79-22.975 55.956-27.793zm8.1521 8.5231q-53.177 8.7083-53.177 73.002 0 33.166 13.155 51.509 13.341 18.343 30.943 18.343 18.343 0 30.201-17.602 11.858-17.787 11.858-47.989 0-43.727-32.981-77.264z"></path></svg>'
          alt='Profile Photo'
        />
      </div> */}
      <form onSubmit={onSubmit}>
        <div className='mb-3 form-floating'>
          <input
            placeholder='Username'
            name='username'
            type='text'
            id='username'
            className='form-control'
            value={username}
            onChange={onChange}
          />
          <label htmlFor='username'>Username</label>
        </div>

        <div className='mb-3 form-floating'>
          <input
            placeholder='Password'
            name='password'
            type='password'
            id='password'
            className='form-control'
            value={password}
            onChange={onChange}
          />
          <label htmlFor='password'>Password</label>
        </div>

        {register && (
          <>
            <div className='mb-3 form-floating'>
              <input
                placeholder='Confirm Password'
                name='confirmPassword'
                type='password'
                id='confirmPassword'
                className='form-control'
                value={confirmPassword}
                onChange={onChange}
              />
              <label htmlFor='confirmPassword'>Confirm Password</label>
            </div>

            <div className='mb-3 form-floating'>
              <input
                placeholder='Name'
                name='name'
                type='text'
                id='name'
                className='form-control'
                value={name}
                onChange={onChange}
              />
              <label htmlFor='name'>Name</label>
            </div>

            <div className='mb-3 form-floating'>
              <input
                placeholder='name@example.com'
                name='email'
                type='email'
                id='email'
                className='form-control'
                value={email}
                onChange={onChange}
              />
              <small id='emailHelp' className='text-muted'>
                Email will only be used for password reset
              </small>
              <label htmlFor='email'>Email address</label>
            </div>
          </>
        )}

        <div className='text-center container'>
          <button
            type='submit'
            role='button'
            className='text-center bg-black w-50 btn btn-primary border-0'
          >
            <IconButton>{register ? "Join " : "Login"}</IconButton>
          </button>
        </div>
      </form>
    </div>
  );

  const countersBox = (
    <div className='d-flex justify-content-around' style={{ height: 300 }}>
      <div className='d-flex flex-column'>
        <div className='text-center h4 m-auto p-auto'>
          <div
            data-purecounter-start='0'
            data-purecounter-end='65'
            data-purecounter-duration='2'
            className='purecounter'
          ></div>
          Members
        </div>

        <div className='text-center h4 m-auto p-auto'>
          <div
            data-purecounter-start='0'
            data-purecounter-end='85'
            data-purecounter-duration='2'
            className='d-block purecounter'
          ></div>
          Activities
        </div>
      </div>
      <div className='d-flex flex-column'>
        <div className='text-center h4 m-auto p-auto'>
          <div
            data-purecounter-start='0'
            data-purecounter-end='30'
            data-purecounter-duration='2'
            className='purecounter h3'
          ></div>
          Organisations
        </div>

        <div className='text-center h4 m-auto p-auto'>
          <div
            data-purecounter-start='0'
            data-purecounter-end='24'
            data-purecounter-duration='2'
            className='purecounter h3'
          ></div>
          Unions
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div id='login' className='container'>
        <div style={{ paddingTop: "90px" }}>
          <div className='d-sm-block d-md-none'>
            {loginForm}
            {countersBox}
          </div>
          <div className='d-none d-md-flex justify-content-between'>
            <div className='w-50'>{loginForm}</div>
            <div className='w-50 m-auto'>{countersBox}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
