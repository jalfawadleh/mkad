import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Bar } from "../common/Wrappers";
import {
  DiscusstionCircleLink,
  Empty,
  ExclamationCircle,
  LocationCircleLink,
  OrganisationCircle,
  OrganisationCircleLink,
  TextCenterLink,
} from "../common/Icons";

const Organisations = () => {
  const location = useLocation();
  const [items, setItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const getItems = async () => {
    // setIsLoading(true);
    await axios
      .get("/organisations/join")
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
      <div className='my-2'></div>
      <Bar>
        <OrganisationCircle />
        <div className='p-auto m-auto text-center'>Joined Organisatoins</div>
        <Empty />
      </Bar>

      {items.length ? (
        items.map((item) => (
          <Bar key={item._id}>
            <OrganisationCircleLink to={"/organisation/" + item._id} />
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

export default Organisations;
