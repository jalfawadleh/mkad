import { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";

import Card from "react-bootstrap/esm/Card";

import { ActivitiesContext } from "../../store.js";
import { Button, Col, Row } from "react-bootstrap";

const ActivitiesList = () => {
  const { activities } = useContext(ActivitiesContext);

  return activities.length ? (
    activities.map((activity) => (
      <Card className='mb-1' key={activity._id}>
        <Card.Body>
          <Card.Title className='text-center'>{activity.name}</Card.Title>
          <Row>
            <Col>
              <LinkContainer to={activity._id + "/delete"}>
                <Card.Link>
                  <Button
                    size='sm'
                    variant='danger'
                    type='button'
                    className='w-100'
                  >
                    Delete
                  </Button>
                </Card.Link>
              </LinkContainer>
            </Col>
            <Col>
              <LinkContainer to={activity._id + "/edit"}>
                <Card.Link>
                  <Button
                    size='sm'
                    variant='success'
                    type='button'
                    className='w-100'
                  >
                    Edit
                  </Button>
                </Card.Link>
              </LinkContainer>
            </Col>
            <Col>
              <LinkContainer to={activity._id}>
                <Card.Link>
                  <Button
                    size='sm'
                    variant='primary'
                    type='button'
                    className='w-100'
                  >
                    View
                  </Button>
                </Card.Link>
              </LinkContainer>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    ))
  ) : (
    <Card className='mb-1' key={0}>
      <Card.Body>
        <Card.Title>You created no activities</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default ActivitiesList;
