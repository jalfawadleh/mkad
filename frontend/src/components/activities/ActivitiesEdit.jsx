import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";

import { ActivitiesContext } from "../../store.js";

const ActivitiesEdit = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { activities, setActivities } = useContext(ActivitiesContext);

  const [activity, setActivity] = useState({ name: "", description: "" });

  const { name, description } = activity;

  const onSubmit = async (e) => {
    // checking for common required fields
    e.preventDefault();

    try {
      await axios.put("activities/", activity).then(() => {
        const tmp = activities.filter((a) => a._id !== id);
        setActivities([...tmp, activity]);
        navigate("/activities");
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

  const onCancel = () => {
    navigate("/activities");
  };

  useEffect(() => {
    setActivity(activities.filter((a) => a._id === id)[0]);
  }, [activities, id]);

  return (
    <Card className='mb-1' key={0}>
      <Card.Body>
        <Card.Title>Update Activity</Card.Title>

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
              type='description'
              placeholder='Description'
              name='description'
              value={description}
              onChange={onChange}
            />
          </FloatingLabel>

          <Container className='text-center'>
            <Button variant='alert' type='submit' className='w-50 '>
              Update
            </Button>
            <Button
              variant='sucess'
              type='button'
              onClick={onCancel}
              className='w-50 '
            >
              Cancel
            </Button>
          </Container>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ActivitiesEdit;
