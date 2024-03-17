import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";

import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";

import { ActivitiesContext } from "../../store.js";
import { Col, Modal, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ActivitiesDelete = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { activities, setActivities } = useContext(ActivitiesContext);

  const [show, setShow] = useState(true);

  const onDelete = async (e) => {
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

  useEffect(() => {
    setShow(true);
  }, [id]);

  return (
    <>
      <Modal show={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you Sure?</Modal.Body>
        <Modal.Footer>
          <Button
            onSubmit={onDelete}
            variant='danger'
            type='submit'
            className='w-50'
          >
            Delete
          </Button>
          <LinkContainer to={".."}>
            <Button
              variant='success'
              type='button'
              className='w-50'
              onClick={() => setShow(false)}
            >
              Close
            </Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>

      {/* <Card className='mb-1' key={0}>
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text></Card.Text>
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
      </Card> */}
    </>
  );
};

export default ActivitiesDelete;
