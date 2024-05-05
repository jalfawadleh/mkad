import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../store";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = userData;

  const onSubmit = async (e) => {
    // checking for common required fields
    e.preventDefault();

    if (!username) toast.error("Please Enter a Username");
    else if (!password) toast.error("Please Enter Password");
    else {
      await axios
        .post("/users/login", { username, password })
        .then((res) => setUser(res.data))
        .catch(() => toast.error("Something went wrong"));
    }
  };

  const onChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className='p-2 needs-validation border border-primary-subtle container'>
        <div className='text-center mt-2 mb-3 fw-bold'>
          Welcome back to MKaDifference
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

          <div className='text-center mb-2'>
            <button
              type='submit'
              role='button'
              className='bg-black w-50 btn btn-primary link-primary text-white'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
