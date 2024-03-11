import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";

import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";

import { ActivitiesContext } from "../../store.js";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

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
      navigate("/activities");
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  return (
    <Card className='mb-1' key={0}>
      <Card.Body>
        <Card.Title>Delete Activity</Card.Title>
        <Card.Text>Are you Sure?</Card.Text>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col className='text-center'>
              <Button variant='danger' type='submit' className='w-50 '>
                Delete
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
  );
};

export default ActivitiesDelete;
