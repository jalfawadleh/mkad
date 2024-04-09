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

import { ChocolateBar } from "../common/Wrappers";

const ListActivitiesJoined = () => {
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
      <ChocolateBar>
        <span className='p-0 m-0' onClick={() => setFolded(!folded)}>
          <IconFold color={folded ? "white" : "gray"} />
        </span>
        <div className='p-auto m-auto h5 text-center'>Activities </div>
        <div className='p-1 m-1' style={{ width: 35 }}></div>
      </ChocolateBar>

      {!folded &&
        (items.length ? (
          items.map((item) => (
            <ChocolateBar key={item._id}>
              <LinkCircleIconActivity item={item} />
              <LinkText item={item} />
              <IconLinkCircleFlyTo location={item.location} />
            </ChocolateBar>
          ))
        ) : (
          <ChocolateBar>
            <Icon>
              <IconExclamation color='white' />
            </Icon>
            <span className='p-auto m-auto'>No Activities Joined</span>
          </ChocolateBar>
        ))}

      {/* {isLoading && <IconLoading />} */}
    </>
  );
};

export default ListActivitiesJoined;
