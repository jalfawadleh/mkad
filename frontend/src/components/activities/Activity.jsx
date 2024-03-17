import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

import axios from "axios";

import { ActivitiesContext } from "../../store.js";
import Loader from "../utils/Loader.jsx";

import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";

import { Col, Modal, Row } from "react-bootstrap";
import ListItems from "../common/ListItems.jsx";

const Activity = ({ id, closeActivity }) => {
  const { setActivities } = useContext(ActivitiesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(id < 0 ? true : false);
  const [isCreating, setIsCreating] = useState(id < 0 ? true : false);

  const [activity, setActivity] = useState({
    _id: id,
    name: "",
    description: "",
    notes: [],
    languages: [],
    help: [],
    interests: [],
    helpOffered: [],
    helpNeeded: [],
    hidden: false,
  });

  const {
    name,
    description,
    notes,
    languages,
    interests,
    helpOffered,
    helpNeeded,
    hidden,
  } = activity;

  const getActivity = async (id) => {
    setIsLoading(true);
    try {
      await axios.get(`/activities/${id}`).then((res) => {
        setIsLoading(false);
        setActivity(res.data);
      });
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  const onPut = async (e) => {
    // checking for common required fields
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put("/activities/", activity).then((res) => {
        setIsLoading(false);
        setActivities(res.data);
        toast("updated");
      });
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  const onChange = (e) => {
    setActivity((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    getActivity(id);
  }, [id]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {isEditing && (
            <FloatingLabel controlId='name' label='Name' className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={onChange}
                className='mt-1'
              />
            </FloatingLabel>
          )}
          {isEditing ? (
            <FloatingLabel
              controlId='description'
              label='Description'
              className='mb-3'
            >
              <Form.Control
                type='description'
                placeholder='Description'
                name='description'
                value={description}
                onChange={onChange}
              />
            </FloatingLabel>
          ) : (
            <div className='p-2 mb-3'>{description}</div>
          )}
          <ListItems
            edit={isEditing}
            message='Notes about the activity'
            type='notes'
            title='note'
            items={notes}
            setParent={setActivity}
          />
          <ListItems
            edit={isEditing}
            message='Interests or hobbies related to this activity'
            type='interests'
            title='interest'
            items={interests}
            setParent={setActivity}
          />
          <ListItems
            edit={isEditing}
            message='Languages spoken by activity admins'
            type='languages'
            title='language'
            items={languages}
            setParent={setActivity}
          />

          <ListItems
            edit={isEditing}
            message='Help Offered'
            type='helpOffered'
            title='Help Offered'
            items={helpOffered}
            setParent={setActivity}
          />
          <ListItems
            edit={isEditing}
            message='Help Needed'
            type='helpNeeded'
            title='Help Needed'
            items={helpNeeded}
            setParent={setActivity}
          />
          {isEditing && (
            <Form.Check // prettier-ignore
              className='mb-3'
              type='checkbox'
              id='hidden'
              label='Hide activity from the map amd search '
              name='hidden'
              checked={hidden}
              onChange={() => {
                setActivity((prevState) => ({
                  ...prevState,
                  hidden: !hidden,
                }));
              }}
            />
          )}
          {isEditing && <div>Location</div>}
          <Row>
            {isEditing && !isCreating && (
              <>
                <Col className='text-center'>
                  <Button
                    variant='primary'
                    type='button'
                    className='w-100 '
                    onClick={onPut}
                  >
                    Update
                  </Button>
                </Col>
                <Col className='text-center'>
                  <Button
                    variant='primary'
                    type='button'
                    className='w-100 '
                    onClick={() => setIsEditing(false)}
                  >
                    View
                  </Button>
                </Col>
              </>
            )}

            {!isEditing && !isCreating && (
              <Col className='text-center'>
                <Button
                  variant='primary'
                  type='button'
                  className='w-100 '
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              </Col>
            )}

            {isCreating && (
              <Col className='text-center'>
                <Button
                  variant='primary'
                  type='button'
                  className='w-100 '
                  onClick={onPut}
                >
                  Create
                </Button>
              </Col>
            )}

            <Col className='text-center'>
              <Card.Link>
                <Button
                  variant='success'
                  type='button'
                  className='w-100'
                  onClick={() => closeActivity()}
                >
                  Close
                </Button>
              </Card.Link>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      {isLoading && <Loader />}
    </>
  );
};

export default Activity;
