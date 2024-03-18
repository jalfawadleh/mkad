import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { Outlet } from "react-router-dom";

import Card from "react-bootstrap/esm/Card";

import { ActivitiesContext } from "../store";

import { Stack } from "react-bootstrap";

import { FaPlusCircle } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const ScreenActivities = () => {
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

  const locateActivity = (activity) => {
    alert("Locate Activity " + JSON.stringify(activity.locations[0]));
  };

  return (
    <>
      <div style={{ width: "300px", maxHeight: window.innerHeight }}>
        <Card className='p-1 m-1' style={{ borderRadius: 10 }}>
          <Stack direction='horizontal' gap={1}>
            <div className='p-1 m-0 h5 w-100 text-center'>Activities </div>
            <LinkContainer to='new/'>
              <span role='button' className='p-2 ms-auto'>
                <FaPlusCircle size={20} />
              </span>
            </LinkContainer>
          </Stack>
        </Card>
        {activities.length ? (
          activities.map((activity) => (
            <Card
              className='p-1 m-1 button'
              style={{ borderRadius: 10 }}
              key={activity._id}
            >
              <Stack direction='horizontal' gap={1}>
                <span role='button' className='p-2 ms-auto'>
                  <FaFlag size={20} />
                </span>

                <LinkContainer to={activity._id}>
                  <span role='button' className='p-1 w-100 text-center fw-bold'>
                    {activity.name}
                  </span>
                </LinkContainer>

                <span
                  role='button'
                  className='p-2 ms-auto'
                  onClick={() => locateActivity(activity)}
                >
                  <FaLocationCrosshairs size={20} />
                </span>
              </Stack>
            </Card>
          ))
        ) : (
          <Card className='mb-1'>
            <span role='button'>No Activities created</span>
          </Card>
        )}
      </div>

      <ActivitiesContext.Provider value={{ setActivities }}>
        <Outlet />
      </ActivitiesContext.Provider>
    </>
  );
};

export default ScreenActivities;
