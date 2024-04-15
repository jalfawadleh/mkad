import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { Bar } from "../common/Wrappers";
import {
  ActivityCircleLink,
  DiscusstionCircleLink,
  Empty,
  ExclamationCircle,
  FoldCircle,
  LocationCircleLink,
} from "../common/Icons";

const ListJoinedActivities = () => {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [folded, setFolded] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);

  const getItems = async () => {
    // setIsLoading(true);
    await axios
      .get("/activities")
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

  const LinkText = ({ item }) => {
    return (
      <Link
        to={"activity/" + item._id}
        className='p-auto m-auto w-100 fw-bold text-center link-underline link-underline-opacity-0'
      >
        {item.name}
      </Link>
    );
  };

  return (
    <>
      <div className='my-2'></div>
      <Bar>
        <span onClick={() => setFolded(!folded)}>
          <FoldCircle color={folded ? "white" : "gray"} />
        </span>
        <div className='p-auto m-auto text-center'>Joined Activities </div>
        <Empty />
      </Bar>

      {!folded &&
        (items.length ? (
          items.map((item) => (
            <Bar key={item._id}>
              <ActivityCircleLink id={item._id} />
              <LinkText item={item} />
              <DiscusstionCircleLink
                type='organisation'
                id={item._id}
                name={item.id}
                color='white'
              />
              <LocationCircleLink location={item.location} />
            </Bar>
          ))
        ) : (
          <Bar>
            <ExclamationCircle color='white' />
            <span className='p-auto m-auto'>No Activities Joined</span>
          </Bar>
        ))}
    </>
  );
};

export default ListJoinedActivities;
