import { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Card, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { UserContext } from "../../store.js";
import Loader from "../utils/Loader.jsx";

function SettingsProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const [newDetails, setNewDetails] = useState({
    _id: user._id,
    name: user.name,
    description: "",
  });
  const { name, description } = newDetails;

  const getProfile = async (id) => {
    setIsLoading(true);
    try {
      await axios.get(`/users/${id}`).then((res) => {
        setNewDetails(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put("/users/", newDetails).then((res) => {
        res.data && toast("Updated");
        setUser((prevState) => ({
          ...prevState,
          name: res.data.name,
          description: res.data.description,
        }));

        console.log(res.data);
      });
    } catch (error) {
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

  useEffect(() => {
    getProfile(user._id);
  }, [user._id]);

  return (
    <>
      <Card className='mb-1'>
        <Card.Body>
          <Card.Title>Update Profile</Card.Title>

          <Form onSubmit={onSubmit}>
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
              controlId='description'
              label='Description'
              className='mb-3'
            >
              <Form.Control
                type='text'
                placeholder='Description'
                name='description'
                value={description}
                onChange={onChange}
              />
            </FloatingLabel>

            <Row>
              <Col className='text-center'>
                <Button variant='primary' type='submit' className='w-100'>
                  Update
                </Button>
              </Col>
              <Col className='text-center'>
                <LinkContainer to={".."}>
                  <Card.Link>
                    <Button variant='success' type='button' className='w-100'>
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

export default SettingsProfile;
