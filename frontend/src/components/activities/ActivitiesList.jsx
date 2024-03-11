import { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";

import Card from "react-bootstrap/esm/Card";

import { ActivitiesContext } from "../../store.js";

const ActivitiesList = () => {
  const { activities } = useContext(ActivitiesContext);

  return activities.length ? (
    activities.map((activity) => (
      <Card className='mb-1' key={activity._id}>
        <Card.Body>
          <Card.Title>{activity.name}</Card.Title>
          <LinkContainer to={"/activities/edit/" + activity._id}>
            <Card.Link>Edit</Card.Link>
          </LinkContainer>
          <LinkContainer to={"/activities/view/" + activity._id}>
            <Card.Link>View</Card.Link>
          </LinkContainer>
          <LinkContainer to={"/activities/delete/" + activity._id}>
            <Card.Link>Delete</Card.Link>
          </LinkContainer>
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
