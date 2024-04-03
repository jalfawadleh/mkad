import { useState, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { ActivitiesContext, UserContext } from "../store";
import {
  ChocolateBar,
  Icon,
  IconAddLink,
  IconExclamation,
  IconFold,
  IconLinkCircleFlyTo,
  LinkCircleIconActivity,
} from "../components/common/LinkItems";

const ScreenActivities = () => {
  const { user } = useContext(UserContext);

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

  const IconLinkActivityText = ({ item }) => {
    return (
      <Link
        to={
          item.createdBy._id === user._id
            ? "manageactivity/" + item._id
            : "activity/" + item._id
        }
        className='p-auto m-auto w-100 fw-bold text-center link-underline link-underline-opacity-0'
      >
        {item.createdBy._id === user._id ? "Manage - " : "View - "}
        {item.name}
      </Link>
    );
  };

  const ListManageActivities = ({ items }) => {
    return items.map((item) => (
      <ChocolateBar key={item._id}>
        <LinkCircleIconActivity item={item} />
        <IconLinkActivityText item={item} />
        <IconLinkCircleFlyTo location={item.location} />
      </ChocolateBar>
    ));
  };

  return (
    <>
      <ChocolateBar>
        <span className='p-0 m-0' onClick={() => setFolded(!folded)}>
          <IconFold color={folded ? "white" : "gray"} />
        </span>
        <div className='p-auto m-auto h5 text-center'>Activities </div>
        {user.type === "organisation" && <IconAddLink />}
      </ChocolateBar>

      {activities.length
        ? !folded && <ListManageActivities items={activities} />
        : !folded && (
            <ChocolateBar>
              <Icon>
                <IconExclamation color='white' />
              </Icon>
              <span className='p-auto m-auto'>
                No Activities joined{" "}
                {user.type === "member" ? " yet" : " or created yet"}
              </span>
            </ChocolateBar>
          )}

      <ActivitiesContext.Provider value={{ getActivities }}>
        <Outlet />
      </ActivitiesContext.Provider>
    </>
  );
};

export default ScreenActivities;
