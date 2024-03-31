import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../store";

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

  return (
    <>
      <div id='login' className=' container'>
        <div style={{ paddingTop: "80px" }} className='row'>
          <div
            style={{ margin: "0px auto", position: "relative" }}
            className='col-12 col-md-6  col'
          >
            <div className='p-2 needs-validation border container'>
              <div className='h4 mb-3 text-center container'>
                {!register ? "Welcome Back" : "Create Account"}
                {/* sdfsdf */}
                <button
                  type='submit'
                  className='ms-3 btn btn-success'
                  onClick={() => setRegister(!register)}
                >
                  {!register ? " or Join Us " : "or Login"}
                </button>
              </div>
              <div className='text-center mb-3 container'>
                <img height='100px' src='/logo.png' alt='Profile Photo' />
              </div>
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
                  <button type='submit' className='w-50 btn btn-primary'>
                    {register ? "Join " : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='col-12 col-md-6 pt-4 pt-lg-0 col'>
            <p>Example of how the website looks like</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
