import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { Bar } from "../common/Wrappers";
import {
  ActivityCircleLink,
  DiscusstionCircleLink,
  Empty,
  ExclamationCircle,
  LocationCircleLink,
  TextCenterLink,
  ActivityCircle,
} from "../common/Icons";

const MemberActivities = () => {
  const [items, setItems] = useState([]);
  const [folded, setFolded] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);

  const getItems = async () => {
    await axios
      .get("/activities")
      .then((res) => setItems(res.data))
      .catch(() => toast.error("Something went wrong"));
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <div className='my-2'></div>
      <Bar>
        <ActivityCircle />
        <div
          role='button'
          onClick={() => setFolded(!folded)}
          className='p-auto m-auto text-center'
        >
          Attending Activities
        </div>
        <Empty />
      </Bar>

      {items.length ? (
        items.map((item) => (
          <Bar key={item._id}>
            <ActivityCircleLink to={item._id} />
            <TextCenterLink to={item._id} text={item.name} />
            <DiscusstionCircleLink
              to={`/discussion/activity/${item._id}/${item.name}`}
              color='white'
            />
            <LocationCircleLink location={item.location} />
          </Bar>
        ))
      ) : (
        <Bar>
          <ExclamationCircle color='white' />
          <span className='p-auto m-auto'>No Activities joined</span>
        </Bar>
      )}
      <Outlet />
    </>
  );
};

export default MemberActivities;
