import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";

import { ActivitiesContext } from "../../store.js";
import Loader from "../utils/Loader.jsx";
import { LinkContainer } from "react-router-bootstrap";
import { Col, Row } from "react-bootstrap";

const ActivitiesNew = () => {
  const navigate = useNavigate();
  const { activities, setActivities } = useContext(ActivitiesContext);

  const [activity, setActivity] = useState({ name: "", description: "" });
  const { name, description } = activity;

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    // checking for common required fields
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("activities/", activity).then((res) => {
        setActivities([...activities, res.data.activity]);
        setIsLoading(false);
        navigate("/activities");
      });
    } catch (error) {
      setIsLoading(false);
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
    <>
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

            <Row>
              <Col className='text-center'>
                <Button variant='primary' type='submit' className='w-50 '>
                  Create
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

export default ActivitiesNew;
