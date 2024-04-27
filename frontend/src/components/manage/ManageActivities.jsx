import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Bar } from "../common/Wrappers";
import {
  ActivityCircleLink,
  ExclamationCircle,
  LocationCircleLink,
  Empty,
  TextCenterLink,
  ActivityManageCircle,
  ActivityAddCircleLink,
  TextCenterBox,
} from "../common/Icons";

const ManageActivities = () => {
  const [items, setItems] = useState([]);
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
    getItems();
  }, []);

  return (
    <>
      <div className='my-2'></div>
      <Bar>
        <ActivityManageCircle />
        <TextCenterBox text='Manage Activities' />
        <ActivityAddCircleLink />
      </Bar>

      {items.length ? (
        items.map((item) => (
          <Bar key={item._id}>
            <ActivityCircleLink to={"/manage/activity/" + item._id} />
            <TextCenterLink
              to={"/manage/activity/" + item._id}
              text={item.name}
            />
            <LocationCircleLink color={"white"} location={item.location} />
          </Bar>
        ))
      ) : (
        <Bar>
          <ExclamationCircle color='white' />
          <span className='p-auto m-auto'>No Activities Created</span>
          <Empty />
        </Bar>
      )}
    </>
  );
};

export default ManageActivities;
