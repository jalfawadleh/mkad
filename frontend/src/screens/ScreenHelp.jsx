import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Bar } from "../components/common/Wrappers";
import {
  HelpCircle,
  UpdatesCircle,
  Empty,
  MembersCircle,
  MemberCircle,
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
        <HelpCircle />
        <div className='p-auto m-auto text-center'>Help Topics</div>
        <Empty />
      </Bar>
      <Bar>
        <MembersCircle color='white' />
        <div className='p-auto m-auto text-center'>Members Count: {count}</div>
        <Empty />
      </Bar>
      <Bar>
        <MemberCircle color='white' />
        <div className='p-auto m-auto text-center'>New Member</div>
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
