import { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaLocationCrosshairs, FaRegEnvelope } from "react-icons/fa6";
import { RiArrowUpDownFill } from "react-icons/ri";
import { FaHandshakeSimple } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaBell, FaHouseUser, FaQuestion } from "react-icons/fa";
import { BiSolidFlag } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import multiavatar from "@multiavatar/multiavatar/esm";
import { MdTune } from "react-icons/md";
import { MapContext } from "../../store";

export const Empty = () => {
  return <div className='p-1 m-1' style={{ width: 35, height: 24 }} />;
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

export const TextCenterBox = ({ children }) => {
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

export const Fold = ({ color = "gray" }) => {
  return <RiArrowUpDownFill color={color} size={24} />;
};

export const FoldCircle = ({ color = "gray" }) => {
  return (
    <Circle>
      <Fold color={color} size={24} />
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

export const Members = ({ color = "gray" }) => {
  return <FaUsers color={color} size={24} />;
};

export const MembersCircle = ({ color = "gray" }) => {
  return (
    <Circle>
      <Members color={color} />
    </Circle>
  );
};

export const Discusstion = ({ color = "gray" }) => {
  return <FaHandshakeSimple color={color} size={24} />;
};

export const DiscusstionCircle = ({ color = "gray" }) => {
  return (
    <Circle>
      <Discusstion color={color} />
    </Circle>
  );
};

export const DiscusstionCircleLink = ({ type, id, name, color = "gray" }) => {
  return (
    <Link to={`/discussion/${type}/${id}/${name}`}>
      <DiscusstionCircle color={color} />
    </Link>
  );
};

export const Close = ({ color = "white" }) => {
  return <AiOutlineClose color={color} size={24} />;
};

export const CloseCircle = ({ color = "white" }) => {
  return (
    <Circle>
      <Close color={color} />
    </Circle>
  );
};

export const CloseCircleLink = ({ color = "white" }) => {
  return (
    <Link to={-1}>
      <CloseCircle color={color} />
    </Link>
  );
};

export const Organisation = ({ color = "white" }) => {
  return <FaHouseUser color={color} size={24} />;
};

export const OrganisationCircle = ({ color = "white" }) => {
  return (
    <Circle>
      <Organisation color={color} />
    </Circle>
  );
};

export const OrganisationCircleLink = ({ color = "white", id }) => {
  return (
    <Link to={"/organisation/" + id}>
      <OrganisationCircle color={color} />
    </Link>
  );
};

export const Activity = ({ color = "white" }) => {
  return <BiSolidFlag color={color} size={24} />;
};

export const ActivityCircle = ({ color = "white" }) => {
  return (
    <Circle>
      <Activity color={color} />
    </Circle>
  );
};

export const ActivityCircleLink = ({ id, color = "white" }) => {
  return (
    <Link to={"/activity/" + id}>
      <ActivityCircle color={color} />
    </Link>
  );
};

export const Avatar = ({ name = "na" }) => {
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

export const AvatarLink = ({ name = "na", id }) => {
  return (
    <Link to={"/member/" + id}>
      <Avatar name={name} />
    </Link>
  );
};

export const Member = ({ color = "white" }) => {
  return <FaUser color={color} size={24} />;
};

export const MemberCircle = ({ color = "white" }) => {
  return (
    <Circle>
      <Member color={color} />
    </Circle>
  );
};

export const MemberCircleLink = ({ id, color = "white" }) => {
  return (
    <Link to={"/member/" + id}>
      <Circle>
        <Member color={color} />
      </Circle>
    </Link>
  );
};

export const Help = ({ color = "white" }) => {
  return <FaQuestion color={color} size={24} />;
};

export const HelpCircle = ({ color = "white" }) => {
  return (
    <Circle>
      <Help color={color} />
    </Circle>
  );
};

export const HelpCircleLink = ({ to = "/help", color = "white" }) => {
  return (
    <Link to={to}>
      <HelpCircle color={color} />
    </Link>
  );
};

export const Updates = ({ color = "white" }) => {
  return <FaBell color={color} size={24} />;
};

export const UpdatesCircle = ({ color = "white" }) => {
  return (
    <Circle>
      <Updates color={color} />
    </Circle>
  );
};

export const UpdatesCircleLink = ({
  to = "/help/updates",
  color = "white",
}) => {
  return (
    <Link to={to}>
      <UpdatesCircle color={color} size={24} />
    </Link>
  );
};

export const Location = ({ color }) => {
  return <FaLocationCrosshairs color={color} size={24} />;
};

export const LocationCircle = ({ color }) => {
  return (
    <Circle>
      <Location color={color} />
    </Circle>
  );
};

export const LocationCircleLink = ({ color, location }) => {
  const { setFlyToLocation } = useContext(MapContext);
  return (
    <span role='button' onClick={() => setFlyToLocation(location)}>
      <LocationCircle color={color} />
    </span>
  );
};

export const Filter = ({ color = color }) => {
  return <MdTune color={color} size={24} />;
};

export const FilterCircle = ({ color = color }) => {
  return (
    <Circle>
      <MdTune color={color} size={24} />
    </Circle>
  );
};

const Icons = {
  Delete,
  CircleMessage,
  CenterText,
  Empty,
  Online,

  Close,
  CloseCircle,
  CloseCircleLink,

  TextCenterBox,

  Filter,
  FilterCircle,

  Location,
  LocationCircle,
  LocationCircleLink,

  Fold,
  FoldCircle,

  Help,
  HelpCircle,
  HelpCircleLink,

  Avatar,
  AvatarLink,

  Member,
  MemberCircle,
  MemberCircleLink,

  Members,
  MembersCircle,

  Discusstion,
  DiscusstionCircle,
  DiscusstionCircleLink,

  Organisation,
  OrganisationCircle,
  OrganisationCircleLink,

  Activity,
  ActivityCircle,
  ActivityCircleLink,

  Updates,
  UpdatesCircle,
  UpdatesCircleLink,
};
export default Icons;
