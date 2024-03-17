import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { Outlet } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import Card from "react-bootstrap/esm/Card";

import { ActivitiesContext } from "../store";
import { Modal, Stack } from "react-bootstrap";

import { FaPlusCircle } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";

import Activity from "../components/activities/Activity";

const ScreenActivities = () => {
  const [activities, setActivities] = useState([]);

  const [activity, setActivity] = useState({ _id: "", name: "" });

  const [modalShow, setModalShow] = useState(false);

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

  const closeActivity = () => {
    setActivity("");
    setModalShow(false);
  };

  const showActivity = (activity) => {
    setActivity(activity);
    setModalShow(true);
  };

  const addActivity = () => {
    setActivity({ _id: -1 });
    setModalShow(true);
  };

  return (
    <>
      <ActivitiesContext.Provider value={{ activities, setActivities }}>
        <div style={{ width: "300px", maxHeight: window.innerHeight }}>
          <Card className='p-1 m-1' style={{ borderRadius: 10 }}>
            <Stack direction='horizontal' gap={1}>
              <div className='p-1 m-0 h5 w-100 text-center'>Activities </div>
              <div className='p-2 ms-auto'>
                <span role='button' onClick={() => addActivity()}>
                  <FaPlusCircle size={20} />
                </span>
              </div>
            </Stack>
          </Card>
          {activities.length ? (
            activities.map((activity) => (
              <Card
                className='p-1 m-1'
                style={{ borderRadius: 10 }}
                key={activity._id}
              >
                <Stack direction='horizontal' gap={1}>
                  <span
                    className='p-1 w-100 text-center cursor-pointer'
                    onClick={() => showActivity(activity)}
                  >
                    {activity.name}
                  </span>
                  <div className='p-2 ms-auto'>
                    <span role='button'>
                      <FaLocationCrosshairs size={20} />
                    </span>
                  </div>
                </Stack>
              </Card>
            ))
          ) : (
            <Card className='mb-1'>
              <span role='button'>No Activities created</span>
            </Card>
          )}
        </div>

        <Modal animation={false} show={modalShow} onHide={closeActivity}>
          {activity._id && (
            <Activity id={activity._id} closeActivity={closeActivity} />
          )}
        </Modal>

        <Outlet />
      </ActivitiesContext.Provider>
    </>
  );
};

export default ScreenActivities;
