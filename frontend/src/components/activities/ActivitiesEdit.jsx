import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";

import { ActivitiesContext } from "../../store.js";
import Loader from "../utils/Loader.jsx";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ListItems from "../common/ListItems.jsx";

const ActivitiesEdit = () => {
  const { id } = useParams();
  const { setActivities } = useContext(ActivitiesContext);

  const [activity, setActivity] = useState({
    name: "",
    description: "",
    notes: [],
    languages: [],
    help: [],
    interests: [],
    hidden: false,
  });

  const { name, description, notes, languages, help, interests, hidden } =
    activity;

  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = async (e) => {
    // checking for common required fields
    e.preventDefault();
    // setIsLoading(true);
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
      <Card
        className='mb-1 overflow-scroll'
        style={{ maxHeight: window.innerHeight - 80 }}
      >
        <Card.Body>
          <Card.Title>Update Activity</Card.Title>

          <Form>
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
                type='description'
                placeholder='Description'
                name='description'
                value={description}
                onChange={onChange}
              />
            </FloatingLabel>

            <ListItems
              edit={true}
              message='Notes about the activity'
              type='notes'
              title='note'
              items={notes}
              setParent={setActivity}
            />
            <ListItems
              edit={true}
              message='Interests or hobbies related to this activity'
              type='interests'
              title='interest'
              items={interests}
              setParent={setActivity}
            />
            <ListItems
              edit={true}
              message='Languages spoken by activity admins'
              type='languages'
              title='language'
              items={languages}
              setParent={setActivity}
            />
            <ListItems
              edit={true}
              message='Help provided or needed'
              type='help'
              title='help'
              items={help}
              setParent={setActivity}
            />

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

            <LinkContainer to={"/activities/edit/location/" + activity._id}>
              <Card.Body>
                <Button>Manage Location</Button>
              </Card.Body>
            </LinkContainer>

            <Row>
              <Col className='text-center'>
                <Button
                  variant='primary'
                  type='submit'
                  className='w-50 '
                  onClick={onSubmit}
                >
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
      {isLoading && <Loader />}
    </>
  );
};

export default ActivitiesEdit;
