import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import Card from "react-bootstrap/esm/Card";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../utils/Loader";
import { Button, Col, Row } from "react-bootstrap";

const ActivitiesView = (aId) => {
  const { id } = useParams();

  const [activity, setActivity] = useState([]);

  const { name, description } = activity;

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

  useEffect(() => {
    id && getActivity(id);
  }, [id]);

  return (
    <>
      <Card className='mb-1' key={0}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Row>
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
        </Card.Body>
      </Card>
      {isLoading && <Loader />}
    </>
  );
};

export default ActivitiesView;
