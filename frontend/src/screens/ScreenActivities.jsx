import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { Outlet } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";

import ScreenHeader from "../components/common/ScreenHeader";

import ActivitiesList from "../components/activities/ActivitiesList";
import { ActivitiesContext } from "../store";

const ScreenActivities = () => {
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
        <ScreenHeader>Activities</ScreenHeader>

        <Row className='p-0 m-0'>
          <Col xs={12} sm={4} md={4} lg={4} className='p-1 m-0'>
            <div
              className='p-0 m-0 overflow-scroll'
              style={{
                maxHeight: innerHeight - 100,
                overflow: "scroll",
              }}
            >
              <ActivitiesList />
              <LinkContainer to='new'>
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

export default ScreenActivities;
