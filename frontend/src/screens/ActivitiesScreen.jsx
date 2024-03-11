import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { Outlet } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import Navbar from "react-bootstrap/esm/Navbar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import ScreenHeaderContainer from "../components/ScreenHeaderContainer";
import ActivitiesList from "../components/ActivitiesList";
import { ActivitiesContext } from "../store";

const ActivitiesScreen = () => {
  const { innerHeight } = window;
  const [activities, setActivities] = useState([]);

  const getActivities = async () => {
    try {
      const { data } = await axios.get("/activities");
      setActivities(data);
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <>
      <ActivitiesContext.Provider value={{ activities, setActivities }}>
        <Row className='p-0 m-0'>
          <Col xs={12} sm={4} md={4} className='p-1 m-0'>
            <ScreenHeaderContainer>
              <Navbar.Brand className='h3 p-0 m-0'>Activities</Navbar.Brand>
            </ScreenHeaderContainer>
          </Col>
        </Row>

        <Row className='p-0 m-0'>
          <Col xs={12} sm={4} md={4} lg={4} className='p-1 m-0'>
            <div
              className='p-0 m-0'
              style={{
                maxHeight: innerHeight - 100,
                overflow: "scroll",
              }}
            >
              <ActivitiesList />
              <LinkContainer to='/activities/new/'>
                <Card className='mb-1' key={0}>
                  <Card.Body>
                    <Button>Create New</Button>
                  </Card.Body>
                </Card>
              </LinkContainer>
            </div>
          </Col>
          <Col xs={12} sm={7} md={7} lg={6} className='p-1 m-0'>
            <Outlet />
          </Col>
        </Row>
      </ActivitiesContext.Provider>
    </>
  );
};

export default ActivitiesScreen;
