import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../store";

import { Bar } from "../common/Wrappers";
import {
  ActivityCircleLink,
  AddActivityCircleLink,
  AvatarCustomLink,
  ExclamationCircle,
  FoldCircle,
  LocationCircleLink,
} from "../common/Icons";

const ListManagedActivities = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [folded, setFolded] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const getItems = async () => {
    // setIsLoading(true);
    await axios
      .get("/activities/managed")
      .then((res) => setItems(res.data))
      // .then(() => setIsLoading(false))
      .catch((error) => {
        error?.response?.data?.message &&
          toast.error(error?.response.data.message);
        error?.response?.status > 499 && toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    if (location.pathname === "/") getItems();
  }, [location]);

  return (
    <>
      <div className='m-1'></div>
      <Bar>
        <span className='p-0 m-0' onClick={() => setFolded(!folded)}>
          <FoldCircle color={folded ? "white" : "gray"} />
        </span>
        <AvatarCustomLink name={user.name} />
        <div className='p-auto m-auto text-center'> Manage Activities</div>
        {user.type === "organisation" && <AddActivityCircleLink />}
      </Bar>

      {!folded &&
        (items.length ? (
          items.map((item) => (
            <Bar key={item._id}>
              <ActivityCircleLink id={item._id} color='white' />
              <Link
                to={"/manage/activity/" + item._id}
                className='p-auto m-auto w-100 fw-bold text-center link-underline link-underline-opacity-0'
              >
                {item.name}
              </Link>
              <LocationCircleLink color={"white"} location={item.location} />
            </Bar>
          ))
        ) : (
          <Bar>
            <ExclamationCircle color='white' />
            <span className='p-auto m-auto'>No Activities Created</span>
          </Bar>
        ))}
    </>
  );
};

export default ListManagedActivities;
