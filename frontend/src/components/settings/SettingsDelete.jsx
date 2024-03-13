import { useContext, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Card, Col, FloatingLabel, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { UserContext } from "../../store.js";
import Loader from "../utils/Loader.jsx";

function SettingsAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const [userDetails, setUserDetails] = useState({
    _id: user._id,
    username: "",
    password: "",
  });

  const { username, password } = userDetails;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      toast.error("Passwords is not Valid");
      return;
    }
    if (!username) {
      toast.error("Username not Valid");
      return;
    }
    try {
      await axios.delete("/users/", userDetails).then(() => setUser(null));
    } catch (error) {
      setIsLoading(false);
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  const onChange = (e) => {
    setUserDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Card className='mb-1'>
        <Card.Body>
          <Card.Title>Delete Account</Card.Title>
          <Card.Text>Are you sure?</Card.Text>
          <Form onSubmit={onSubmit}>
            <FloatingLabel controlId='user' label='Username' className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Username'
                name='username'
                value={username}
                onChange={onChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId='pass' label='Password' className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Password'
                name='password'
                value={password}
                onChange={onChange}
              />
            </FloatingLabel>

            <Row>
              <Col className='text-center'>
                <Button variant='danger' type='submit' className='w-100 '>
                  Delete
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
