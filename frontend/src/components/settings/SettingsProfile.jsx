import { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";

import { Card, Col, Row, Button, Form, FloatingLabel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { UserContext } from "../../store.js";

import Loader from "../utils/Loader.jsx";
import ListItems from "../common/ListItems.jsx";

function SettingsProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const [member, setMember] = useState({
    _id: user._id,
    name: "",
    description: "",
    languages: [],
    help: [],
    interests: [],
    location: [],
    darkmood: true,
    hidden: true,
    contacts: [],
    organisations: [],
  });

  const { name, description, languages, help, interests, darkmood, hidden } =
    member;

  const getProfile = async () => {
    setIsLoading(true);
    try {
      await axios.get(`/members/${user._id}`).then((res) => {
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
      <Card
        className='mb-1 overflow-scroll'
        style={{ maxHeight: window.innerHeight - 100 }}
      >
        <Form>
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

            <ListItems
              edit={true}
              message='Languages for people to reach you with'
              type='languages'
              title='language'
              items={languages}
              setParent={setMember}
            />

            <ListItems
              edit={true}
              message='Help needed or offered'
              type='help'
              title='Help'
              items={help}
              setParent={setMember}
            />

            <ListItems
              edit={true}
              message='Your interests or hobbies'
              type='interests'
              title='interest'
              items={interests}
              setParent={setMember}
            />

            <Form.Check // prettier-ignore
              className='mb-3'
              type='switch'
              id='hidden'
              label='Hide profile from the map amd search '
              checked={hidden}
              onChange={() =>
                setMember((prevState) => ({
                  ...prevState,
                  hidden: !hidden,
                }))
              }
            />

            <Form.Check // prettier-ignore
              className='mb-3'
              type='switch'
              id='darkmood'
              label='Darkmood'
              checked={darkmood}
              onChange={() =>
                setMember((prevState) => ({
                  ...prevState,
                  darkmood: !darkmood,
                }))
              }
            />

            <Row>
              <Col className='text-center'>
                <Button
                  variant='primary'
                  type='button'
                  className='w-100'
                  onClick={onSubmit}
                >
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
          </Card.Body>
        </Form>
      </Card>
      {isLoading && <Loader />}
    </>
  );
}

export default SettingsProfile;
