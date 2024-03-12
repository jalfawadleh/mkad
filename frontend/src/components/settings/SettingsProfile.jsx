import { useContext, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Card, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { UserContext } from "../../store.js";

function SettingsProfile() {
  const { user } = useContext(UserContext);

  const [newDetails, setNewDetails] = useState({
    _id: user._id,
    name: user.name,
    description: "",
  });
  const { name, description } = newDetails;

  const onSubmit = async (e) => {
    // checking for common required fields
    e.preventDefault();

    try {
      await axios
        .put("/users/", newDetails)
        .then((res) => res.data && toast("Updated"));
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
                <Button variant='danger' type='submit' className='w-50 '>
                  Update
                </Button>
              </Col>
              <Col className='text-center'>
                <LinkContainer to={".."}>
                  <Card.Link>
                    <Button variant='success' type='button' className='w-50 '>
                      Close
                    </Button>
                  </Card.Link>
                </LinkContainer>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default SettingsProfile;
