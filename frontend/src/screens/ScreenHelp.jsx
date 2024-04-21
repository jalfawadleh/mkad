import { Link, Outlet } from "react-router-dom";
import { Bar } from "../components/common/Wrappers";
import { Empty, HelpCircle } from "../components/common/Icons";

const ScreenHelp = () => {
  return (
    <>
      <Bar>
        <HelpCircle />
        <div className='p-auto m-auto text-center fw-bold'>Help</div>
        <Empty />
      </Bar>
      <Bar>
        <Link to='howto'>
          <HelpCircle />
        </Link>
        <Link
          to='howto'
          className='p-auto m-auto w-100 fw-bold text-center link-underline link-underline-opacity-0'
        >
          How To
        </Link>
        <Empty />
      </Bar>

      <Outlet />
    </>
  );
};

export default ScreenHelp;
