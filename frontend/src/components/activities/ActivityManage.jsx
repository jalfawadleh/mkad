import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

import axios from "axios";

import { ActivitiesContext, UserContext } from "../../store.js";
import Loader from "../utils/Loader.jsx";

import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";

import { Col, Modal, Row } from "react-bootstrap";
import ListItems from "../common/ListItems.jsx";
import { useNavigate, useParams } from "react-router-dom";

const ActivityManage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const { setActivities } = useContext(ActivitiesContext);

  const [activity, setActivity] = useState({
    _id: id ? id : "",
    name: "",
    description: "",
    notes: [],
    languages: [],
    interests: [],
    helpOffered: [],
    helpNeeded: [],
    createdBy: [],
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
    createdBy,
  } = activity;

  const isOwner = createdBy?._id === user._id;
  const isCreating = activity._id ? false : true;
  const [isEditing, setIsEditing] = useState(isCreating);

  const [isLoading, setIsLoading] = useState(false);

  const onPut = async () => {
    // checking for common required fields
    setIsLoading(true);
    try {
      if (activity._id)
        await axios
          .put("/activities/", activity)
          .then(() => setIsLoading(false))
          .then(() => toast("Updated"));
      else
        await axios
          .post("/activities/", activity)
          .then(() => setIsLoading(false))
          .then(() => toast("Created"));

      // Refresh activities
      await axios.get(`/activities`).then((res) => setActivities(res.data));
      navigate(-1);
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  const onDelete = async () => {
    var result = confirm("Are you sure?");
    if (result) {
      setIsLoading(true);
      try {
        await axios
          .delete(`/activities/${id}`)
          .then(() => setIsLoading(false))
          .then(() => navigate(-1));
      } catch (error) {
        error?.response?.data?.message &&
          toast.error(error?.response.data.message);
        error?.response?.status > 499 && toast.error("Something went wrong");
      }
    }
  };

  const getActivity = async (id) => {
    setIsLoading(true);
    try {
      await axios
        .get(`/activities/${id}`)
        .then((res) => setActivity(res.data))
        .then(() => setIsLoading(false));
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

  const closeActivity = () => {
    navigate(-1);
  };

  useEffect(() => {
    activity._id && getActivity(activity._id);
  }, [activity._id]);

  return (
    <>
      <Modal
        animation={false}
        show={true}
        onHide={closeActivity}
        className='p-2'
      >
        <Modal.Body>
          <Modal.Header closeButton className='p-1'>
            <Modal.Title className='w-100 text-center'>{name}</Modal.Title>
          </Modal.Header>

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
          {createdBy?.name && (
            <div className='p-2 mb-3 text-right'>
              Created By: {createdBy.name}
            </div>
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
            message='Notes'
            type='notes'
            title='note'
            items={notes}
            setParent={setActivity}
          />
          <ListItems
            edit={isEditing}
            message='Related Interests and hobbies'
            type='interests'
            title='interest'
            items={interests}
            setParent={setActivity}
          />
          <ListItems
            edit={isEditing}
            message='Languages'
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
          {isEditing ? <div>Location</div> : <div>Show on the map</div>}

          <Row>
            {isOwner && isEditing && !isCreating && (
              <>
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
                <Col className='text-center'>
                  <Button
                    variant='warning'
                    type='button'
                    className='w-100 '
                    onClick={onPut}
                  >
                    Update
                  </Button>
                </Col>
                <Col className='text-center'>
                  <Button
                    variant='danger'
                    type='button'
                    className='w-100 '
                    onClick={onDelete}
                  >
                    Delete
                  </Button>
                </Col>
              </>
            )}

            {isOwner && !isEditing && (
              <Col className='text-center'>
                <Button
                  variant='warning'
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
                  onClick={closeActivity}
                >
                  Close
                </Button>
              </Card.Link>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      {isLoading && <Loader />}
    </>
  );
};

export default ActivityManage;
