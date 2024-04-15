import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Bar } from "../common/Wrappers";
import {
  DiscusstionCircleLink,
  Empty,
  ExclamationCircle,
  FoldCircle,
  LocationCircleLink,
  OrganisationCircleLink,
} from "../common/Icons";

const ListJoinedOrganisations = () => {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [folded, setFolded] = useState(true);
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

  const LinkText = ({ item }) => {
    return (
      <Link
        to={"organisation/" + item._id}
        className='p-auto m-auto w-100 fw-bold text-center link-underline link-underline-opacity-0'
      >
        {item.name}
      </Link>
    );
  };

  const ListItems = ({ items }) => {
    return items.map((item) => (
      <Bar key={item._id}>
        <OrganisationCircleLink id={item._id} />
        <LinkText item={item} />
        <DiscusstionCircleLink
          type='organisation'
          id={item._id}
          name={item.name}
          color='white'
        />
        <LocationCircleLink location={item.location} />
      </Bar>
    ));
  };

  return (
    <>
      <div className='my-2'></div>
      <Bar>
        <span onClick={() => setFolded(!folded)}>
          <FoldCircle color={folded ? "white" : "gray"} />
        </span>
        <div className='p-auto m-auto text-center'>Joined Organisatoins</div>
        <Empty />
      </Bar>

      {!folded &&
        (items.length ? (
          <ListItems items={items} />
        ) : (
          <Bar>
            <ExclamationCircle color='white' />
            <span className='p-auto m-auto'>No Organisations Joined</span>
          </Bar>
        ))}

      {/* {isLoading && <Loader />} */}
    </>
  );
};

export default ListJoinedOrganisations;
