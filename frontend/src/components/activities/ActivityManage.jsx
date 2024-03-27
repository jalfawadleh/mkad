import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

import axios from "axios";
import Datetime from "react-datetime";
import { ActivitiesContext, MapContext, UserContext } from "../../store.js";
import Loader from "../common/Loader.jsx";

import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";

import { Col, Modal, Row, Stack } from "react-bootstrap";
import ListItems from "../common/ListItems.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Location from "../common/Location.jsx";
import moment from "moment";
import { LinkContainer } from "react-router-bootstrap";

const ActivityManage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const { getMapItems } = useContext(MapContext);
  const { getActivities } = useContext(ActivitiesContext);

  const [activity, setActivity] = useState({
    _id: id ? id : "",
    name: "",
    startOn: "",
    endOn: "",
    description: "",
    notes: [],
    languages: [],
    interests: [],
    helpOffered: [],
    helpNeeded: [],
    createdBy: [],
    hidden: false,
    location: { lng: -122.2683, lat: 37.8243 },
  });

  const {
    name,
    startOn,
    endOn,
    description,
    languages,
    interests,
    notes,
    helpOffered,
    helpNeeded,
    hidden,
    createdBy,
    location,
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
          .then(() => toast("Updated"))
          .then(() => setIsLoading(false))
          .then(() => getActivities())
          .then(() => getMapItems());
      else
        await axios
          .post("/activities/", activity)
          .then(() => toast("Created"))
          .then(() => setIsLoading(false))
          .then(() => getActivities())
          .then(() => getMapItems());
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
          .then(() => getActivities())
          .then(() => getMapItems())
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
        className='p-1'
      >
        <Modal.Body>
          <Modal.Title className='w-100 text-center'>{name}</Modal.Title>

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
          {!isEditing && createdBy?.name && (
            <div className='p-2 m-0 float-right'>
              Created By: {createdBy.name}
            </div>
          )}

          <Stack direction='horizontal' gap={1} className='m-2'>
            <span className='p-0 '>Start:</span>
            <span className='ms-auto text-center'>
              {isEditing ? (
                <Datetime
                  value={startOn}
                  onChange={(e) => {
                    setActivity((prevState) => ({
                      ...prevState,
                      startOn: e,
                    }));
                  }}
                />
              ) : (
                <>
                  <div>{moment(startOn).format("DD MMMM YYYY")}</div>
                  <div>{moment(startOn).format("h:mm:ss a")}</div>
                </>
              )}
            </span>
            <span className='p-0 ms-auto'>End:</span>
            <span className='p-1 ms-auto text-center'>
              {isEditing ? (
                <Datetime
                  value={endOn}
                  onChange={(e) => {
                    setActivity((prevState) => ({
                      ...prevState,
                      endOn: e,
                    }));
                  }}
                />
              ) : (
                <>
                  <div>{moment(endOn).format("MMMM DD YYYY")}</div>
                  <div>{moment(endOn).format("h:mm:ss a")}</div>
                </>
              )}
            </span>
          </Stack>

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
            description && <div className='p-2 m-0'>{description}</div>
          )}

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
            message='Related Interests and hobbies'
            type='interests'
            title='interest'
            items={interests}
            setParent={setActivity}
          />

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
            message='Offering Help With'
            type='helpOffered'
            title='Help Offered'
            items={helpOffered}
            setParent={setActivity}
          />

          <ListItems
            edit={isEditing}
            message='Need Help With'
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
              label='Hide activity from search and map'
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

          {isEditing && (
            <Location
              editing={isEditing}
              location={location}
              setParent={setActivity}
            />
          )}

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
                  disabled={!name}
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
              <LinkContainer to={".."}>
                <Card.Link>
                  <Button variant='success' type='button' className='w-100'>
                    Close
                  </Button>
                </Card.Link>
              </LinkContainer>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      {isLoading && <Loader />}
    </>
  );
};

export default ActivityManage;
