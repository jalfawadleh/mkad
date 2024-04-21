import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Bar } from "../components/common/Wrappers";
import {
  Empty,
  MemberCircle,
  MKaDifferenceCircle,
  OrganisationCircle,
  ActivityCircle,
  HelpCircle,
  UpdatesCircleLink,
} from "../components/common/Icons";

const ScreenMKaDifference = () => {
  const [count, setCount] = useState(0);

  const updateCount = async () => {
    await axios.get("/members/count").then(({ data }) => setCount(data));
    // setTimeout(() => updateCount(), 1000);
  };

  useEffect(() => {
    updateCount();
  }, []);

  return (
    <>
      <Bar>
        <MKaDifferenceCircle />
        <div className='p-auto m-auto text-center fw-bold'>MKaδifference</div>
        <Empty />
      </Bar>
      <Bar>
        <MemberCircle />
        <div className='py-auto my-auto pe-4 ps-0'>{count}</div>
        <OrganisationCircle />
        <div className='py-auto my-auto pe-4 ps-0'>{count}</div>
        <ActivityCircle />
        <div className='py-auto my-auto pe-4 ps-0'>{count}</div>
      </Bar>
      <Bar>
        <Link to='whoweare'>
          <HelpCircle />
        </Link>
        <Link
          to='whoweare'
          className='p-auto m-auto w-100 fw-bold text-center link-underline link-underline-opacity-0'
        >
          Who We Are
        </Link>
        <Empty />
      </Bar>
      <Bar>
        <UpdatesCircleLink to='updates' />
        <Link
          to='updates'
          className='p-auto m-auto w-100 fw-bold text-center link-underline link-underline-opacity-0'
        >
          Updates
        </Link>
        <Empty />
      </Bar>
      <Bar>
        <Link to='contactus'>
          <HelpCircle />
        </Link>
        <Link
          to='contactus'
          className='p-auto m-auto w-100 fw-bold text-center link-underline link-underline-opacity-0'
        >
          Contact Us
        </Link>
        <Empty />
      </Bar>
      <Outlet />
    </>
  );
};

export default ScreenMKaDifference;
