import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getErrorMessage } from "../../utils/http.js";
import { Bar } from "../common/Wrappers";
import {
  ActivityCircleLink,
  ExclamationCircle,
  LocationCircleLink,
  Empty,
  TextCenterLink,
  ActivityManageCircle,
  ActivityAddCircleLink,
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
      .catch((error) => toast.error(getErrorMessage(error)));
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <div className='my-2'></div>
      <Bar>
        <ActivityManageCircle />
        <div className='m-auto p-auto text-center'>Manage Activities</div>
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
            <LocationCircleLink color={"white"} lat={item.lat} lng={item.lng} />
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
