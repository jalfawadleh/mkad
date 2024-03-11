import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";

import Form from "react-bootstrap/esm/Form";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";

import { ActivitiesContext } from "../../store.js";

const ActivitiesDelete = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { activities, setActivities } = useContext(ActivitiesContext);

  const onSubmit = async (e) => {
    // checking for common required fields
    e.preventDefault();

    try {
      await axios.delete(`activities/${id}`);
      setActivities(activities.filter((a) => a._id !== id));

      // setActivities([...activities, data.activity]);
      navigate("/activities");
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  const onCancel = () => {
    navigate("/activities");
  };

  return (
    <Card className='mb-1' key={0}>
      <Card.Body>
        <Card.Title>Delete Activity</Card.Title>
        <Card.Text>Are you Sure?</Card.Text>
        <Form onSubmit={onSubmit}>
          <Container className='text-center'>
            <Button variant='alert' type='submit' className='w-50 '>
              Delete
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

export default ActivitiesDelete;
