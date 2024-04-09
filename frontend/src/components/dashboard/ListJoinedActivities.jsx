import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Icon,
  IconExclamation,
  IconFold,
  IconLinkCircleFlyTo,
  LinkCircleIconActivity,
  // IconLoading,
} from "../common/LinkItems";

import { Bar } from "../common/Wrappers";

const ListJoinedActivities = () => {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [folded, setFolded] = useState(false);
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
    if (location.pathname === "/dashboard") getItems();
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
      <div className='my-3'></div>
      <Bar>
        <span className='p-0 m-0' onClick={() => setFolded(!folded)}>
          <IconFold color={folded ? "white" : "gray"} />
        </span>
        <div className='p-auto m-auto text-center'>Joined Activities </div>
        <div className='p-1 m-1' style={{ width: 35 }}></div>
      </Bar>

      {!folded &&
        (items.length ? (
          items.map((item) => (
            <Bar key={item._id}>
              <LinkCircleIconActivity item={item} />
              <LinkText item={item} />
              <IconLinkCircleFlyTo location={item.location} />
            </Bar>
          ))
        ) : (
          <Bar>
            <Icon>
              <IconExclamation color='white' />
            </Icon>
            <span className='p-auto m-auto'>No Activities Joined</span>
          </Bar>
        ))}

      {/* {isLoading && <IconLoading />} */}
    </>
  );
};

export default ListJoinedActivities;
