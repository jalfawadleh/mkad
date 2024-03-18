import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "axios";

import {
  Card,
  Col,
  Row,
  Button,
  Form,
  FloatingLabel,
  Modal,
  Stack,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { UserContext } from "../../store.js";

import Loader from "../common/Loader.jsx";
import ListItems from "../common/ListItems.jsx";

function SettingsProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [editing, setEditing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [member, setMember] = useState({
    _id: user._id,
    name: "",
    description: "",
    languages: [],
    help: [],
    interests: [],
    darkmood: true,
    hidden: true,
  });

  const { name, description, languages, help, interests, darkmood, hidden } =
    member;

  const onPut = async (e) => {
    e.preventDefault();

    try {
      await axios.put("/members", member).then(() => {
        toast("Updated");
        // in case name changed
        setUser((prevState) => ({ ...prevState, name }));
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

  useEffect(() => {
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

    getProfile();
  }, [user._id]);

  const closeActivity = () => {
    navigate("/search");
  };

  return (
    <>
      <Modal animation={false} show={true} onHide={closeActivity}>
        <Modal.Body>
          <Card.Body>
            {editing ? (
              <>
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
              </>
            ) : (
              <>
                <Stack direction='horizontal' gap={1}>
                  {name && (
                    <img
                      height='30px'
                      width='30px'
                      src={"https://api.multiavatar.com/" + name + ".png"}
                      alt='Profile Photo'
                    />
                  )}

                  <div className='h4 p-2 text-center w-100 pe-5'>{name}</div>
                </Stack>
                <Card.Text>{description}</Card.Text>
              </>
            )}

            <ListItems
              edit={editing}
              message='Languages'
              type='languages'
              title='language'
              items={languages}
              setParent={setMember}
            />

            <ListItems
              edit={editing}
              message='Help needed or offered'
              type='help'
              title='Help'
              items={help}
              setParent={setMember}
            />

            <ListItems
              edit={editing}
              message='Your interests or hobbies'
              type='interests'
              title='interest'
              items={interests}
              setParent={setMember}
            />
            {editing && (
              <>
                <Form.Check // prettier-ignore
                  className='mb-3'
                  type='switch'
                  id='hidden'
                  label='Hide profile'
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
              </>
            )}
            <div>
              <LinkContainer to={"/location"}>
                <Button variant='primary' type='button' className='mb-3'>
                  Manage Location
                </Button>
              </LinkContainer>
            </div>
            <div>
              <LinkContainer to={"/account"}>
                <Card.Link>
                  <Button variant='warning' type='button' className='mb-3'>
                    Manage Account
                  </Button>
                </Card.Link>
              </LinkContainer>
            </div>

            <Row>
              {editing && (
                <Col className='text-center'>
                  <Button
                    variant='primary'
                    type='button'
                    className='w-100'
                    onClick={onPut}
                  >
                    Update
                  </Button>
                </Col>
              )}

              {editing ? (
                <Col className='text-center'>
                  <Button
                    variant='primary'
                    type='button'
                    className='w-100'
                    onClick={() => setEditing(false)}
                  >
                    View
                  </Button>
                </Col>
              ) : (
                <Col className='text-center'>
                  <Button
                    variant='primary'
                    type='button'
                    className='w-100'
                    onClick={() => setEditing(true)}
                  >
                    Edit
                  </Button>
                </Col>
              )}
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
        </Modal.Body>
      </Modal>
      {isLoading && <Loader />}
    </>
  );
}

export default SettingsProfile;
