import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { ActivitiesContext } from "../store";
import {
  ChocolateBar,
  Icon,
  IconAddLink,
  IconExclamation,
  IconFold,
  ListManageActivities,
} from "../components/common/LinkItems";

const ScreenActivities = () => {
  const [activities, setActivities] = useState([]);
  const [folded, setFolded] = useState(false);

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
      <ChocolateBar>
        <span className='p-0 m-0' onClick={() => setFolded(!folded)}>
          <IconFold color={folded ? "white" : "gray"} />
        </span>

        <div className='p-auto m-auto h5 text-center'>Activities </div>
        <IconAddLink />
      </ChocolateBar>

      {activities.length ? (
        !folded && <ListManageActivities items={activities} />
      ) : (
        <ChocolateBar>
          <Icon>
            <IconExclamation color='white' />
          </Icon>
          <span className='p-auto m-auto'>No Activities Created</span>
        </ChocolateBar>
      )}

      <ActivitiesContext.Provider value={{ getActivities }}>
        <Outlet />
      </ActivitiesContext.Provider>
    </>
  );
};

export default ScreenActivities;
