import { useState, useContext } from "react";

import { toast } from "react-toastify";
import axios from "axios";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

import { UserContext } from "../UserContext";

function LoginForm() {
  const { user, setUser } = useContext(UserContext);
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
      <Container className='p-3 needs-validation border'>
        <Container className='h4 text-center'>
          {!register ? "Welcome Back" : "Create Account"}
          <Button
            variant='success'
            type='submit'
            className='ms-3'
            onClick={() => setRegister(!register)}
          >
            or {!register ? "Join " : "Login"}
          </Button>
        </Container>

        <Form onSubmit={onSubmit}>
          <FloatingLabel controlId='username' label='Username' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Username'
              name='username'
              value={username}
              onChange={onChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId='password' label='Password' className='mb-3'>
            <Form.Control
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={onChange}
            />
          </FloatingLabel>

          {register && (
            <>
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
                  onChange={onChange}
                />
              </FloatingLabel>
              <FloatingLabel controlId='name' label='Name' className='mb-3'>
                <Form.Control
                  type='text'
                  placeholder='Name'
                  name='name'
                  value={name}
                  onChange={onChange}
                />
              </FloatingLabel>
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
                  onChange={onChange}
                />
                <small id='emailHelp' className='text-muted'>
                  Email will only be used for password reset.
                </small>
              </FloatingLabel>
            </>
          )}

          <Container className='text-center'>
            <Button variant='primary' type='submit' className='w-50 '>
              {register ? "Join " : "Login"}
            </Button>
          </Container>
        </Form>
      </Container>
    </>
  );
}

export default LoginForm;
