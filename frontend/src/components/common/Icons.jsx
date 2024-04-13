import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa6";
import { RiArrowUpDownFill } from "react-icons/ri";
import { FaHandshakeSimple } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaHouseUser } from "react-icons/fa";
import { BiSolidFlag } from "react-icons/bi";

import multiavatar from "@multiavatar/multiavatar/esm";

export const Empty = () => {
  return <div className='p-1 m-1' style={{ width: 35 }} />;
};

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

export const Box = ({ children }) => {
  return (
    <div className='p-1 m-1 badge border border-primary w-100'>{children}</div>
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

export const BoxCenterText = ({ children }) => {
  return (
    <Box>
      <CenterText> {children} </CenterText>
    </Box>
  );
};

export const BoxCenterHeader = ({ children }) => {
  return (
    <Box>
      <CenterText>
        <span className='h5 text-wrap'>{children} </span>
      </CenterText>
    </Box>
  );
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

export const CircleDiscusstion = ({ color = "gray" }) => {
  return (
    <Circle>
      <FaHandshakeSimple color={color} size={24} />
    </Circle>
  );
};

export const LinkCircleDiscusstion = ({ type, id, name, color = "gray" }) => {
  return (
    <Link to={`/discussion/${type}/${id}/${name}`}>
      <Circle>
        <FaHandshakeSimple color={color} size={24} />
      </Circle>
    </Link>
  );
};

export const LinkCircleClose = () => {
  return (
    <Circle>
      <Link to={-1}>
        <AiOutlineClose color='white' size={24} />
      </Link>
    </Circle>
  );
};

export const Organisation = ({ color = "white" }) => {
  return <FaHouseUser color={color} size={24} />;
};

export const CircleOrganisation = ({ color = "white" }) => {
  return (
    <Circle>
      <Organisation color={color} />
    </Circle>
  );
};

export const LinkCircleOrganisation = ({ id }) => {
  return (
    <Link to={"/organisation/" + id}>
      <Circle>
        <Organisation color={"white"} />
      </Circle>
    </Link>
  );
};

export const Activity = ({ color = "white" }) => {
  return <BiSolidFlag color={color} size={24} />;
};

export const CircleActivity = ({ color = "white" }) => {
  return (
    <Circle>
      <Activity color={color} />
    </Circle>
  );
};

export const LinkCircleActivity = ({ id }) => {
  return (
    <Link to={"/activity/" + id}>
      <Circle>
        <BiSolidFlag color={"white"} size={24} />
      </Circle>
    </Link>
  );
};

export const Member = ({ name = "na" }) => {
  return (
    <img
      height={34}
      width={34}
      src={`data:image/svg+xml;utf8,${encodeURIComponent(multiavatar(name))}`}
      alt='Profile Photo'
      className='p-0 m-1'
    />
  );
};

const Icons = {
  Delete,
  CircleMessage,
  CenterText,
  Empty,
  Online,
  CircleFold,
  LinkCircleDiscusstion,
  CircleDiscusstion,
  LinkCircleClose,
  BoxCenterText,
  Organisation,
  CircleOrganisation,
  LinkCircleOrganisation,
  CircleActivity,
  Member,
};
export default Icons;
