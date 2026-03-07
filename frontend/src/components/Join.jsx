import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ScreenLanding = () => {
  const { c } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const userData = {};
    const formData = new FormData(e.target);
    formData.forEach((value, key) => (userData[key] = value));
    userData["code"] = c ? c : false;
    const { username, password, confirmPassword, name, terms } = userData;

    if (!username || username.length < 8)
      toast("Username min 8 characters required!");
    else if (username !== username.trim()) toast("Remove space from Username");
    else if (password !== password.trim()) toast("Remove space from Password");
    else if (!password || password.length < 8)
      toast("Password min 8 characterss required!");
    else if (!c || password !== confirmPassword)
      toast("Passwords do not match");
    else if (name === "" || name.length < 5) toast.error("Please Enter a Name");
    else if (!terms || terms !== "on")
      toast("Please accept terms and conditions");
    else {
      await axios
        .post("/users/", userData)
        .then((res) => {
          if (res.data) navigate("/");
          else toast.error("Something is wrong!");
        })
        .catch((error) => toast.error(error.response.data));
    }
  };

  return (
    <>
      <div className='p-2 needs-validation border border-primary-subtle container'>
        <div className='text-center mt-2 mb-3 fw-bold'>
          Join Us to MKaDifference
        </div>

        <form onSubmit={onSubmit}>
          <div className='mb-3 form-floating bg-black'>
            <input
              placeholder='Username'
              name='username'
              type='password'
              id='username'
              className='form-control bg-black'
              autoCorrect='off'
              autoCapitalize='none'
              autoComplete='off'
            />
            <label htmlFor='username'>Username Min 8 char</label>
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
            <label htmlFor='password'>Password Min 8 char</label>
            <small className='d-block text-center'>
              <a
                className='ms-1 text-center text-decoration-none'
                href='https://sprinto.com/blog/nist-password-guidelines/#NIST_recommendations_for_setting_up_passwords'
                target='_blank'
                rel='noopener noreferrer'
              >
                what is a secure password? Why no stars?
              </a>
            </small>
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
            <label htmlFor='confirmPassword'>Retype Password</label>
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
            <label htmlFor='name'>Name Min 4 char</label>
          </div>
          <div className='m-0 p-3 mb-3 form-check border rounded'>
            <input
              name='terms'
              className='m-1 p-0 form-check-input'
              type='checkbox'
              id='terms'
              style={{ transform: "scale(1.6)" }}
            />
            <label className='m-0 ps-2 text-center' htmlFor='terms'>
              accept terms and conditions
            </label>
          </div>
          <div className='mb-2 text-center'>
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
