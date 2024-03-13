import Card from "react-bootstrap/esm/Card";
import ScreenHeader from "../components/Header";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const ScreenSettings = () => {
  return (
    <>
      <ScreenHeader>Settings</ScreenHeader>

      <Row className='p-0 m-0'>
        <Col xs={12} sm={4} md={4} lg={4} className='p-1 m-0'>
          <LinkContainer to='/settings/profile'>
            <Card className='mb-1' key={0}>
              <Card.Body>
                <Button className='w-100'>Update Profile</Button>
              </Card.Body>
            </Card>
          </LinkContainer>
          <LinkContainer to='/settings/location'>
            <Card className='mb-1' key={0}>
              <Card.Body>
                <Button className='w-100'>Update Location</Button>
              </Card.Body>
            </Card>
          </LinkContainer>
          <LinkContainer to='/settings/account'>
            <Card className='mb-1' key={0}>
              <Card.Body>
                <Button variant='warning' className='w-100'>
                  Update Account
                </Button>
              </Card.Body>
            </Card>
          </LinkContainer>
          <LinkContainer to='/settings/delete'>
            <Card className='mb-1' key={0}>
              <Card.Body>
                <Button variant='danger' className='w-100'>
                  Delete Account
                </Button>
              </Card.Body>
            </Card>
          </LinkContainer>
        </Col>
        <Col xs={12} sm={7} md={7} lg={6} className='p-1 m-0'>
          <Outlet />
        </Col>
      </Row>
    </>
  );
};

export default ScreenSettings;
