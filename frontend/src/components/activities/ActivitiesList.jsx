import { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";

import Card from "react-bootstrap/esm/Card";

import { ActivitiesContext } from "../../store.js";
import { Button, Col, Row } from "react-bootstrap";

const ActivitiesList = () => {
  const { activities } = useContext(ActivitiesContext);

  return (
    <div style={{ width: "300px" }}>
      {activities.length ? (
        activities.map((activity) => (
          <Card
            className='p-2 m-1 text-center'
            style={{ borderRadius: 10 }}
            key={activity._id}
          >
            <span role='button' className='mb-2'>
              {activity.name}
            </span>
            <Row>
              <Col>
                <LinkContainer to={activity._id + "/delete"}>
                  <Card.Link>
                    <Button
                      variant='danger'
                      type='button'
                      className='w-100 btn-sm'
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
                      className='w-100 py-1'
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
                      className='w-100 py-1'
                    >
                      View
                    </Button>
                  </Card.Link>
                </LinkContainer>
              </Col>
            </Row>
          </Card>
        ))
      ) : (
        <Card className='mb-1' key={0}>
          <Card.Body>
            <Card.Title>You created no activities</Card.Title>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};
export default ActivitiesList;
