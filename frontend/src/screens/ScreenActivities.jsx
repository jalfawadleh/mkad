import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { Outlet } from "react-router-dom";

import Card from "react-bootstrap/esm/Card";

import { ActivitiesContext } from "../store";

import { Stack } from "react-bootstrap";

import { FaPlusCircle } from "react-icons/fa";
import { RiArrowUpDownFill } from "react-icons/ri";

import { LinkContainer } from "react-router-bootstrap";

import ListLinks from "../components/common/ListLinks";

const ScreenActivities = () => {
  const [activities, setActivities] = useState([]);
  const [showResults, setShowResults] = useState(true);

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
      <div
        className='m-2'
        style={{ maxWidth: "320px", maxHeight: window.innerHeight }}
      >
        <Card className='mb-2 bg-black' style={{ borderRadius: 25 }}>
          <Stack direction='horizontal' gap={1} className='p-0 m-0'>
            <span
              className='p-1 m-1 badge rounded-pill border'
              role='button'
              onClick={() => setShowResults(!showResults)}
            >
              <RiArrowUpDownFill
                size={24}
                className='p-0 m-0'
                color={activities?.length ? "white" : "gray"}
              />
            </span>
            <div className='p-1 m-0 h5 w-100 text-center'>Activities </div>
            <LinkContainer to='new/'>
              <span role='button' className='p-2 ms-auto'>
                <FaPlusCircle size={24} />
              </span>
            </LinkContainer>
          </Stack>
        </Card>

        {activities.length ? (
          showResults && <ListLinks items={activities} />
        ) : (
          <Card className='ps-2 m-0 bg-black' style={{ borderRadius: 15 }}>
            <span role='button' className='p-1 m-0 bg-black rounded-circle'>
              No Activities Created
            </span>
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
