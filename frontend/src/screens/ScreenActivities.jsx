import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { RiArrowUpDownFill } from "react-icons/ri";
import { LinkContainer } from "react-router-bootstrap";
import Card from "react-bootstrap/esm/Card";

import { ActivitiesContext } from "../store";
import { ListLinks } from "../components/common/Wrapers";

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
      <Card className='mb-2 border-0 bg-black' style={{ borderRadius: 20 }}>
        <div className='d-flex m-0 p-0'>
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
          <div className='p-auto m-auto h5 text-center'>Activities </div>
          <LinkContainer to='new/'>
            <span role='button' className='p-1 m-1 badge rounded-pill border'>
              <FaPlus size={24} className='p-0 m-0' />
            </span>
          </LinkContainer>
        </div>
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

      <ActivitiesContext.Provider value={{ setActivities }}>
        <Outlet />
      </ActivitiesContext.Provider>
    </>
  );
};

export default ScreenActivities;
