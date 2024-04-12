import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa6";
import { RiArrowUpDownFill } from "react-icons/ri";

export const Circle = ({ children }) => {
  return (
    <>
      <span
        className='p-1 m-1 badge rounded-pill border border-primary'
        role='button'
      >
        {children}
      </span>
    </>
  );
};

export const Delete = () => {
  return (
    <>
      <span role='button' className='d-inline m-0 ms-1 p-0 bg-danger'>
        <AiOutlineClose size={16} className='m-0 p-0' />
      </span>
    </>
  );
};

export const CircleMessage = ({ color = "gray" }) => {
  return (
    <Circle>
      <FaRegEnvelope size={24} className='m-0 p-0' color={color} />
    </Circle>
  );
};

export const CenterText = ({ children }) => {
  return (
    <span className='p-auto m-auto w-100 fw-bold text-center link-underline link-underline-opacity-0'>
      {children}
    </span>
  );
};

export const Empty = () => {
  return <div className='p-1 m-1' style={{ width: 35 }} />;
};

export const Online = ({ online }) => {
  const [blink, setBlink] = useState({});
  if (online) setInterval(() => setBlink(!blink), 1000);

  return (
    <Circle>
      <div className='p-0 m-1'>
        <div
          className={
            "m-auto p-auto rounded-pill " + (blink ? "bg-danger" : "bg-black")
          }
          style={{ width: 15, height: 15 }}
        ></div>
      </div>
    </Circle>
  );
};

export const CircleFold = ({ color = "gray" }) => {
  return (
    <Circle>
      <RiArrowUpDownFill color={color} size={24} />
    </Circle>
  );
};

export const Button = ({ children }) => {
  return (
    <div className='link-primary p-1 m-1 bg-black rounded-pill border border-primary'>
      <span role='button' className='link-primary text-white p-1 m-1'>
        {children}
      </span>
    </div>
  );
};

const Icons = { Delete, CircleMessage, CenterText, Empty, Online, CircleFold };
export default Icons;
