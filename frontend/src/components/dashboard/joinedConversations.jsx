import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Bar } from "../common/Wrappers";
import {
  DiscusstionCircleLink,
  Empty,
  ExclamationCircle,
  LocationCircleLink,
  MessageCircle,
  MessageCircleLink,
  OrganisationCircle,
  OrganisationCircleLink,
  TextCenterLink,
} from "../common/Icons";

const joinedConversations = () => {
  const [items, setItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const getItems = async () => {
    // setIsLoading(true);
    await axios
      .get("/conversations/join")
      .then((res) => setItems(res.data))
      // .then(() => setIsLoading(false))
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
      <div className='my-2'></div>
      <Bar>
        <MessageCircle />
        <div className='p-auto m-auto text-center'>Joined Conversations</div>
        <Empty />
      </Bar>

      {items.length ? (
        items.map((item) => (
          <Bar key={item._id}>
            <MessageCircleLink
              to={`/conversations/${item.type}/${item._id}/${item.name}`}
            />
            <TextCenterLink to={item._id} text={item.name} />
            <DiscusstionCircleLink
              type='organisation'
              id={item._id}
              name={item.name}
              color='white'
            />
            <LocationCircleLink location={item.location} />
          </Bar>
        ))
      ) : (
        <Bar>
          <ExclamationCircle color='white' />
          <span className='p-auto m-auto'>No Organisations Joined</span>
        </Bar>
      )}

      <Outlet />
    </>
  );
};

export default joinedConversations;
