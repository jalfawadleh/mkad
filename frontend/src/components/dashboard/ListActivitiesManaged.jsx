import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../store";

import {
  ChocolateBar,
  Icon,
  IconExclamation,
  IconFold,
  IconLinkCircleFlyTo,
  LinkCircleIconActivity,
  IconLoading,
  IconAddLink,
} from "../common/LinkItems";

const ListActivitiesManaged = () => {
  const { user } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [folded, setFolded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getItems = async () => {
    setIsLoading(true);
    await axios
      .get("/activities/managed")
      .then((res) => {
        setItems(res.data);
        console.log("got Items");
      })
      .then(() => setIsLoading(false))
      .catch((error) => {
        error?.response?.data?.message &&
          toast.error(error?.response.data.message);
        error?.response?.status > 499 && toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <div className='my-3'></div>
      <ChocolateBar>
        <span className='p-0 m-0' onClick={() => setFolded(!folded)}>
          <IconFold color={folded ? "white" : "gray"} />
        </span>
        <div className='p-auto m-auto h5 text-center'>Activities Managed </div>
        {user.type === "organisation" && <IconAddLink />}
      </ChocolateBar>

      {!folded &&
        (items.length ? (
          items.map((item) => (
            <ChocolateBar key={item._id}>
              <LinkCircleIconActivity item={item} />
              <Link
                to={"activity/manage/" + item._id}
                className='p-auto m-auto w-100 fw-bold text-center link-underline link-underline-opacity-0'
              >
                {item.name}
              </Link>
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

      {isLoading && <IconLoading />}
    </>
  );
};

export default ListActivitiesManaged;
