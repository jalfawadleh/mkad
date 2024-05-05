import { useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../store";

const ScreenLanding = () => {
  const { setUser } = useContext(UserContext);
  const { code } = useParams();

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = {};
    const formData = new FormData(e.target);
    formData.forEach((value, key) => (userData[key] = value));
    userData["code"] = code;
    const { username, password, confirmPassword, name } = userData;

    if (!username) toast.error("Please Enter a Username");
    else if (!password) toast.error("Please Enter Password");
    else if (password !== confirmPassword)
      toast.error("Passwords do not match");
    else if (name === "") toast.error("Please Enter a Name");
    else {
      await axios
        .post("/users/", userData)
        .then((res) => setUser(res.data))
        .then(() => toast.error("Something went wrong"));
    }
  };

  return (
    <>
      <div className='p-2 needs-validation border border-primary-subtle container'>
        <div className='h5 text-center m-auto my-3'>
          Welcome to MKaDifference
        </div>

        <form onSubmit={onSubmit}>
          <div className='mb-3 form-floating bg-black'>
            <input
              placeholder='Username'
              name='username'
              type='text'
              id='username'
              className='form-control bg-black'
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
              autoCorrect='off'
              autoCapitalize='none'
              autoComplete='off'
            />
            <label htmlFor='password'>Password</label>
          </div>
          <div className='mb-3 form-floating bg-black'>
            <input
              placeholder='Confirm Password'
              name='confirmPassword'
              type='password'
              id='confirmPassword'
              className='form-control bg-black'
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
              autoCorrect='off'
              autoCapitalize='none'
              autoComplete='off'
            />
            <label htmlFor='name'>Name</label>
          </div>
          accept terms and conditions
          <div className='text-center'>
            <button
              type='submit'
              role='button'
              className='bg-black w-50 btn btn-primary link-primary text-white'
            >
              Join
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default ScreenLanding;
