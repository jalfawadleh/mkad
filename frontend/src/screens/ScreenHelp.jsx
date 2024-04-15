import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Bar } from "../components/common/Wrappers";
import {
  UpdatesCircle,
  Empty,
  MemberCircle,
  MKaDifferenceCircle,
  OrganisationCircle,
  ActivityCircle,
} from "../components/common/Icons";

const ScreenHelp = () => {
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
        <Empty />
      </Bar>
      <Bar>
        <MemberCircle color='white' />
        <div className='p-auto m-auto text-center'>For New Members</div>
        <Empty />
      </Bar>
      <Bar>
        <UpdatesCircle />
        <div className='p-auto m-auto text-center'>Updates</div>
        <Empty />
      </Bar>

      <Outlet />
    </>
  );
};

export default ScreenHelp;
