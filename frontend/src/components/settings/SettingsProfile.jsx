import { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";

import { Card, Col, Row, Button, Form, FloatingLabel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { UserContext } from "../../store.js";

import Loader from "../utils/Loader.jsx";
import Languages from "../common/Languages.jsx";

function SettingsProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const [member, setMember] = useState({
    _id: user._id,
    name: "",
    description: "",
    languages: [],
  });

  const { name, description, languages } = member;

  const getProfile = async () => {
    setIsLoading(true);
    const id = user._id;
    try {
      await axios.get(`/members/${id}`).then((res) => {
        setMember(res.data);
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
      await axios.put("/members", member).then(() => {
        toast("Updated");
        setUser((prevState) => ({
          ...prevState,
          name,
          description,
          languages,
        }));
      });
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  const onChange = (e) => {
    setMember((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(function () {
    getProfile();
  }, []);

  return (
    <>
      <Card className='mb-1'>
        <Form onSubmit={onSubmit}>
          <Card.Body>
            <Card.Title>Update Profile</Card.Title>
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

            <Languages languages={languages} setMember={setMember} />
          </Card.Body>
          <Card.Footer className='text-muted'>
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
          </Card.Footer>
        </Form>
      </Card>
      {isLoading && <Loader />}
    </>
  );
}

export default SettingsProfile;
