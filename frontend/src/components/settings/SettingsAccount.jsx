import { useContext, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Card, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { UserContext } from "../../store.js";
import Loader from "../utils/Loader.jsx";

function SettingsAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

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

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!currentPassword) {
      toast.error("Current Password is not valid");
      return;
    }
    setIsLoading(true);
    try {
      await axios.put("/users/", newDetails).then((res) => {
        setIsLoading(false);
        res.data && toast("Updated");
      });
    } catch (error) {
      setIsLoading(false);
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
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
      <Card className='mb-1'>
        <Card.Body>
          <Card.Title>Update Account</Card.Title>

          <Form onSubmit={onSubmit}>
            <Card.Text>
              Enter only fields you want to Update and Current Password
            </Card.Text>

            <FloatingLabel
              controlId='username'
              label='Username'
              className='mb-3'
            >
              <Form.Control
                type='text'
                placeholder='Username'
                name='username'
                value={username}
                onChange={onChange}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId='password'
              label='Password'
              className='mb-3'
            >
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
                value={password}
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
                Email will only be used for password reset
              </small>
            </FloatingLabel>

            <Card.Text>Enter Current password for verification</Card.Text>
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

            <Row>
              <Col className='text-center'>
                <Button variant='warning' type='submit' className='w-100 '>
                  Update
                </Button>
              </Col>
              <Col className='text-center'>
                <LinkContainer to={".."}>
                  <Card.Link>
                    <Button variant='success' type='button' className='w-100 '>
                      Close
                    </Button>
                  </Card.Link>
                </LinkContainer>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      {isLoading && <Loader />}
    </>
  );
}

export default SettingsAccount;
