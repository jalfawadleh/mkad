import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";

const ActivitiesNew = () => {
  const navigate = useNavigate();

  const [activity, setActivity] = useState({ name: "", description: "" });
  const { name, description } = activity;

  const onSubmit = async (e) => {
    // checking for common required fields
    e.preventDefault();

    try {
      await axios.post("activities/", activity);
      navigate("/activities");
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

  return (
    <Card className='mb-1' key={0}>
      <Card.Body>
        <Card.Title>Create new Activity</Card.Title>

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
            <Button variant='primary' type='submit' className='w-50 '>
              Create
            </Button>
          </Container>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ActivitiesNew;
