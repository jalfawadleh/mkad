import { useContext } from "react";
import { useParams } from "react-router-dom";

import Card from "react-bootstrap/esm/Card";

import { ActivitiesContext } from "../../store.js";
import { LinkContainer } from "react-router-bootstrap";

const ActivitiesView = () => {
  const { id } = useParams();

  const { activities } = useContext(ActivitiesContext);

  const activity = activities.filter((a) => a._id === id)[0];

  const { name, description } = activity;

  return (
    <Card className='mb-1' key={0}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <LinkContainer to='/activities/'>
          <Card.Link>Close</Card.Link>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default ActivitiesView;
