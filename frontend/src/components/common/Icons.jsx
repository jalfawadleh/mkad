import { useContext } from "react";
import { Link } from "react-router-dom";
import multiavatar from "@multiavatar/multiavatar/esm";
import { MapContext } from "../../store";

import { TbFlagCog, TbFlagPlus } from "react-icons/tb";
import {
  FaHandshakeSimple,
  FaLocationCrosshairs,
  FaRegEnvelope,
  FaUsers,
} from "react-icons/fa6";
import {
  FaBell,
  FaExclamationCircle,
  FaMoon,
  FaQuestion,
  FaSearch,
  FaSun,
  FaHome,
  FaShare,
  FaShareAlt,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { RiArrowUpDownFill } from "react-icons/ri";
import { BiSolidFlag } from "react-icons/bi";
import { MdTune } from "react-icons/md";
import {
  BsPersonFill,
  BsPersonFillCheck,
  BsPersonFillAdd,
  BsPersonFillX,
  BsPersonFillGear,
  BsPersonFillLock,
} from "react-icons/bs";

export const Empty = () => {
  return <div className='p-1 m-1' style={{ width: "34px", height: "34px" }} />;
};

export const Circle = ({
  children,
  borderColor = "primary",
  bgColor = "primary",
}) => {
  return (
    <span
      className={
        "p-1 m-1 badge rounded-pill border border-2 text-dark" +
        (borderColor ? " border-" + borderColor : "") +
        (bgColor ? " bg-" + bgColor : "")
      }
      role='button'
    >
      {children}
    </span>
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

export const DeleteCircle = () => {
  return (
    <Circle bgColor='warning'>
      <span role='button' className='bg-warning'>
        <AiOutlineClose size={24} color='white' />
      </span>
    </Circle>
  );
};

export const Box = ({ children }) => {
  return (
    <div className='p-1 m-1 badge border border-primary w-100'>{children}</div>
  );
};

export const TextCenterBox = ({ text }) => {
  return (
    <div className='p-auto my-auto mx-1 badge border border-primary w-100 overflow-x-auto'>
      <div className='p-1 text-center fs-6'>{text}</div>
    </div>
  );
};

export const TextCenterLink = ({ to, text }) => {
  return (
    <Link
      to={to}
      className='m-auto p-auto link-underline link-underline-opacity-0 text-center overflow-x-auto'
    >
      {text}
    </Link>
  );
};

export const Home = ({ color = "white" }) => {
  return <FaHome color={color} size={24} />;
};

export const HomeCircle = ({ borderColor = "light", color = "white" }) => {
  return (
    <Circle borderColor={borderColor}>
      <Home color={color} size={24} />
    </Circle>
  );
};

export const HomeCircleLink = ({ to = "/", color = "white" }) => {
  return (
    <Link to={to}>
      <HomeCircle borderColor='primary' color={color} />
    </Link>
  );
};

export const Fold = ({ color = "white" }) => {
  return <RiArrowUpDownFill color={color} size={24} />;
};

export const FoldCircle = ({ color = "white" }) => {
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

export const Search = ({ color = "white" }) => {
  return <FaSearch color={color} size={24} />;
};

export const SearchCircle = ({ color = "white" }) => {
  return (
    <Circle>
      <Search color={color} />
    </Circle>
  );
};

export const SearchCircleLink = ({ color = "white", to = "/search" }) => {
  return (
    <Link to={to}>
      <SearchCircle color={color} />
    </Link>
  );
};

export const Members = ({ color = "white" }) => {
  return <FaUsers color={color} size={24} />;
};

export const MembersCircle = ({ color = "white" }) => {
  return (
    <Circle>
      <Members color={color} />
    </Circle>
  );
};

export const Lightmode = ({ color = "yellow" }) => {
  return <FaSun color={color} size={24} />;
};
export const LightmodeCircle = ({ color = "yellow" }) => {
  return (
    <Circle>
      <Lightmode color={color} />
    </Circle>
  );
};

export const Darkmode = ({ color = "black" }) => {
  return <FaMoon color={color} size={24} />;
};
export const DarkmodeCircle = ({ color = "black" }) => {
  return (
    <Circle>
      <Darkmode color={color} />
    </Circle>
  );
};

export const Message = ({ color = "white" }) => {
  return <FaRegEnvelope color={color} size={24} />;
};

export const MessageCircle = ({ color = "white" }) => {
  return (
    <Circle borderColor='info'>
      <Message color={color} />
    </Circle>
  );
};

export const MessageCircleLink = ({ to }) => {
  return (
    <Link to={to}>
      <MessageCircle color={"white"} />
    </Link>
  );
};

export const Discusstion = ({ color = "white" }) => {
  return <FaHandshakeSimple color={color} size={24} />;
};

export const DiscusstionCircle = ({ color = "white" }) => {
  return (
    <Circle borderColor='info'>
      <Discusstion color={color} />
    </Circle>
  );
};

export const DiscusstionCircleLink = ({ to, color = "white" }) => {
  return (
    <Link to={to}>
      <DiscusstionCircle color={color} />
    </Link>
  );
};

export const ActivityAdd = ({ color = "white" }) => {
  return <TbFlagPlus color={color} size={24} />;
};

export const ActivityAddCircle = ({ color = "white" }) => {
  return (
    <Circle borderColor='success' bgColor='success'>
      <ActivityAdd color={color} />
    </Circle>
  );
};

export const ActivityAddCircleLink = ({ color = "white" }) => {
  return (
    <Link to='/manage/activity/new'>
      <ActivityAddCircle color={color} />
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

export const Organisation = () => {
  return (
    <svg
      style={{ margin: 0, padding: 0 }}
      viewBox='2 1 24 24'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      height='24px'
      width='24px'
    >
      <g
        id='🔍-Product-Icons'
        stroke='none'
        strokeWidth='1'
        fill='none'
        fillRule='evenodd'
      >
        <g
          id='ic_fluent_people_community_28_filled'
          fill='#ffffff'
          fillRule='nonzero'
        >
          <path
            d='M17.75,18 C18.7164983,18 19.5,18.7835017 19.5,19.75 L19.5,21.7519766 L19.4921156,21.8604403 C19.1813607,23.9866441 17.2715225,25.0090369 14.0667905,25.0090369 C10.8736123,25.0090369 8.93330141,23.9983408 8.51446278,21.8965776 L8.5,21.75 L8.5,19.75 C8.5,18.7835017 9.28350169,18 10.25,18 L17.75,18 Z M18.2439108,11.9999135 L24.25,12 C25.2164983,12 26,12.7835017 26,13.75 L26,15.7519766 L25.9921156,15.8604403 C25.6813607,17.9866441 23.7715225,19.0090369 20.5667905,19.0090369 L20.3985759,19.007437 C20.0900029,17.9045277 19.1110503,17.0815935 17.9288034,17.0057197 L17.75,17 L16.8277704,17.0007255 C17.8477843,16.1757619 18.5,14.9140475 18.5,13.5 C18.5,12.9740145 18.4097576,12.4691063 18.2439108,11.9999135 Z M3.75,12 L9.75608915,11.9999135 C9.59024243,12.4691063 9.5,12.9740145 9.5,13.5 C9.5,14.8308682 10.0777413,16.0267978 10.996103,16.8506678 L11.1722296,17.0007255 L10.25,17 C8.9877951,17 7.92420242,17.85036 7.60086562,19.0094363 L7.5667905,19.0090369 C4.37361228,19.0090369 2.43330141,17.9983408 2.01446278,15.8965776 L2,15.75 L2,13.75 C2,12.7835017 2.78350169,12 3.75,12 Z M14,10 C15.9329966,10 17.5,11.5670034 17.5,13.5 C17.5,15.4329966 15.9329966,17 14,17 C12.0670034,17 10.5,15.4329966 10.5,13.5 C10.5,11.5670034 12.0670034,10 14,10 Z M20.5,4 C22.4329966,4 24,5.56700338 24,7.5 C24,9.43299662 22.4329966,11 20.5,11 C18.5670034,11 17,9.43299662 17,7.5 C17,5.56700338 18.5670034,4 20.5,4 Z M7.5,4 C9.43299662,4 11,5.56700338 11,7.5 C11,9.43299662 9.43299662,11 7.5,11 C5.56700338,11 4,9.43299662 4,7.5 C4,5.56700338 5.56700338,4 7.5,4 Z'
            id='🎨-Color'
          ></path>
        </g>
      </g>
    </svg>
  );
};

export const OrganisationCircle = ({
  borderColor = "light",
  bgColor = "warning",
}) => {
  return (
    <Circle borderColor={borderColor} bgColor={bgColor}>
      <Organisation />
    </Circle>
  );
};

export const OrganisationCircleLink = ({ to = "/organisations" }) => {
  return (
    <Link to={to}>
      <OrganisationCircle borderColor='warning' />
    </Link>
  );
};

export const Activity = ({ color = "white" }) => {
  return <BiSolidFlag color={color} size={24} />;
};

export const ActivityCircle = ({
  borderColor = "light",
  color = "white",
  bgColor = "success",
}) => {
  return (
    <Circle borderColor={borderColor} bgColor={bgColor}>
      <Activity color={color} />
    </Circle>
  );
};

export const ActivityCircleLink = ({ to }) => {
  return (
    <Link to={to}>
      <ActivityCircle borderColor='success' color={"white"} />
    </Link>
  );
};

export const ActivityManage = ({ color = "white" }) => {
  return <TbFlagCog color={color} size={24} />;
};

export const ActivityManageCircle = ({
  borderColor = "light",
  color = "white",
}) => {
  return (
    <Circle borderColor={borderColor} bgColor='success'>
      <ActivityManage color={color} />
    </Circle>
  );
};

export const ActivityManageCircleLink = ({ to, color = "white" }) => {
  return (
    <Link to={to}>
      <ActivityManageCircle borderColor='success' color={color} />
    </Link>
  );
};

export const Avatar = ({ name = "na", size = 34 }) => {
  return (
    <img
      height={size}
      width={size}
      src={`data:image/svg+xml;utf8,${encodeURIComponent(multiavatar(name))}`}
      alt='Profile Photo'
      className='p-0 m-1'
    />
  );
};

export const AvatarLink = ({ name, to, size = 34 }) => {
  return (
    <Link to={to} style={{ height: size, width: size }}>
      <Avatar name={name} size={size} />
    </Link>
  );
};

export const AvatarCustomLink = ({ name = "na", to = "/profile" }) => {
  return (
    <Link to={to}>
      <Avatar name={name} />
    </Link>
  );
};

export const Member = ({ color = "white" }) => {
  return <BsPersonFill color={color} size={24} />;
};

export const MemberCircle = ({ borderColor = "light", color = "white" }) => {
  return (
    <Circle borderColor={borderColor} bgColor='primary'>
      <Member color={color} />
    </Circle>
  );
};

export const MemberCircleLink = ({ to }) => {
  return (
    <Link to={to}>
      <MemberCircle borderColor='primary' />
    </Link>
  );
};

export const MemberManage = ({ color = "white" }) => {
  return <BsPersonFillGear color={color} size={24} />;
};

export const MemberManageCircle = ({
  borderColor = "light",
  color = "white",
}) => {
  return (
    <Circle borderColor={borderColor} bgColor='primary'>
      <MemberManage color={color} />
    </Circle>
  );
};

export const MemberManageCircleLink = ({ to }) => {
  return (
    <Link to={to}>
      <MemberManageCircle borderColor='primary' />
    </Link>
  );
};

export const MemberAdd = ({ color = "white" }) => {
  return <BsPersonFillAdd color={color} size={24} />;
};

export const MemberAddCircle = ({ color = "white" }) => {
  return (
    <Circle borderColor='primary'>
      <MemberAdd color={color} />
    </Circle>
  );
};

export const MemberAddCircleLink = ({ to }) => {
  return (
    <Link to={to}>
      <MemberAddCircle color='white' />
    </Link>
  );
};

export const MemberApprove = ({ color = "white" }) => {
  return <BsPersonFillCheck color={color} size={24} />;
};

export const MemberApproveCircle = ({ color = "white" }) => {
  return (
    <Circle borderColor='primary'>
      <MemberApprove color={color} />
    </Circle>
  );
};

export const MemberApproveCircleLink = ({ to }) => {
  return (
    <Link to={to}>
      <MemberApproveCircle color='white' />
    </Link>
  );
};

export const MemberDelete = ({ color = "white" }) => {
  return <BsPersonFillX color={color} size={24} />;
};

export const MemberDeleteCircle = ({ color = "white" }) => {
  return (
    <Circle borderColor='primary'>
      <MemberDelete color={color} />
    </Circle>
  );
};

export const MemberDeleteCircleLink = ({ to }) => {
  return (
    <Link to={to}>
      <MemberDeleteCircle color='white' />
    </Link>
  );
};

export const MemberPassword = ({ color = "white" }) => {
  return <BsPersonFillLock color={color} size={24} />;
};

export const MemberPasswordCircle = ({ color = "white" }) => {
  return (
    <Circle borderColor='primary' bgColor='danger'>
      <MemberPassword color={color} />
    </Circle>
  );
};

export const MemberPasswordCircleLink = ({ to }) => {
  return (
    <Link to={to}>
      <MemberPasswordCircle color='white' />
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

export const UpdatesCircleLink = ({ to = "/updates", activated = false }) => {
  return (
    <Link to={to}>
      <UpdatesCircle color={activated ? "red" : "white"} size={24} />
    </Link>
  );
};

export const Location = ({ color = "white" }) => {
  return <FaLocationCrosshairs color={color} size={24} />;
};

export const LocationCircle = ({ color = "white" }) => {
  return (
    <Circle>
      <Location color={color} />
    </Circle>
  );
};

export const LocationCircleLink = ({ color = "white", location }) => {
  const { setFlyToLocation } = useContext(MapContext);
  return (
    <span role='button' onClick={() => setFlyToLocation(location)}>
      <LocationCircle color={color} />
    </span>
  );
};

export const Filter = ({ color = "white" }) => {
  return <MdTune color={color} size={24} />;
};

export const FilterCircle = ({ color = "white" }) => {
  return (
    <Circle>
      <MdTune color={color} size={24} />
    </Circle>
  );
};

export const MKaDifferenceCircle = () => {
  return (
    <div
      className='d-block m-1 p-0 border border-warning rounded-circle bg-black'
      style={{ width: 34, height: 34 }}
    >
      <svg
        fill='#ffffff'
        width='30'
        height='30'
        viewBox='40 0 300 300'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='m202.13 132.55q-9.2643-10.376-25.755-24.828-18.158-15.935-24.458-25.014-6.2997-9.2642-6.2997-20.196 0-16.305 15.193-25.569 15.193-9.4495 39.651-9.4495 24.458 0 42.615 8.3378 18.343 8.3379 18.343 22.975 0 7.0408-4.4448 11.673-4.4448 4.632-10.376 4.632-8.5227 0-20.011-12.785-11.673-12.97-19.825-18.158-7.9673-5.373-18.714-5.373-13.711 0-22.605 6.1144-8.7088 6.1144-8.7088 15.564 0 8.8936 7.2262 16.676 7.2262 7.7819 37.242 28.349 32.054 22.049 45.21 34.463 13.34 12.414 21.678 30.202 8.3383 17.787 8.3383 37.613 0 34.834-24.643 61.515-24.458 26.496-57.253 26.496-29.831 0-50.398-21.308-20.566-21.308-20.566-56.882 0-34.278 22.604-57.253 22.79-22.975 55.956-27.793zm8.1521 8.5231q-53.177 8.7083-53.177 73.002 0 33.166 13.155 51.509 13.341 18.343 30.943 18.343 18.343 0 30.201-17.602 11.858-17.787 11.858-47.989 0-43.727-32.981-77.264z' />
      </svg>
    </div>
  );
};

export const MKaDifferenceCircleLink = ({ to = "/" }) => {
  return (
    <Link to={to} className='m-0 p-0'>
      <div
        className='d-block m-1 p-0 border border-warning rounded-circle bg-black'
        style={{ width: 34, height: 34 }}
      >
        <svg
          fill='#ffffff'
          width='30'
          height='30'
          viewBox='40 0 300 300'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='m202.13 132.55q-9.2643-10.376-25.755-24.828-18.158-15.935-24.458-25.014-6.2997-9.2642-6.2997-20.196 0-16.305 15.193-25.569 15.193-9.4495 39.651-9.4495 24.458 0 42.615 8.3378 18.343 8.3379 18.343 22.975 0 7.0408-4.4448 11.673-4.4448 4.632-10.376 4.632-8.5227 0-20.011-12.785-11.673-12.97-19.825-18.158-7.9673-5.373-18.714-5.373-13.711 0-22.605 6.1144-8.7088 6.1144-8.7088 15.564 0 8.8936 7.2262 16.676 7.2262 7.7819 37.242 28.349 32.054 22.049 45.21 34.463 13.34 12.414 21.678 30.202 8.3383 17.787 8.3383 37.613 0 34.834-24.643 61.515-24.458 26.496-57.253 26.496-29.831 0-50.398-21.308-20.566-21.308-20.566-56.882 0-34.278 22.604-57.253 22.79-22.975 55.956-27.793zm8.1521 8.5231q-53.177 8.7083-53.177 73.002 0 33.166 13.155 51.509 13.341 18.343 30.943 18.343 18.343 0 30.201-17.602 11.858-17.787 11.858-47.989 0-43.727-32.981-77.264z' />
        </svg>
      </div>
    </Link>
  );
};

export const Spinner = () => {
  return (
    <div
      className='m-0 p-0 spinner-border text-primary'
      role='status'
      style={{ height: 20, width: 20 }}
    >
      <span className='visually-hidden w-100 h-100'>Loading...</span>
    </div>
  );
};

export const SpinnerCircle = () => {
  return (
    <Circle>
      <Spinner />
    </Circle>
  );
};

export const Loader = () => {
  return (
    <div className='d-block p-4 m-auto text-center'>
      <div
        className='spinner-border text-primary'
        role='status'
        style={{ height: 100, width: 100 }}
      >
        <span className='visually-hidden w-100 h-100'>Loading...</span>
      </div>
    </div>
  );
};

export const Exclamation = ({ color = "white" }) => {
  return <FaExclamationCircle color={color} size={24} />;
};

export const ExclamationCircle = ({ color = "white" }) => {
  return (
    <Circle>
      <Exclamation color={color} />
    </Circle>
  );
};

export const Share = () => {
  return <FaShare color='white' size={24} />;
};

export const ShareCircle = () => {
  return (
    <Circle borderColor='info' bgColor='primary'>
      <Share />
    </Circle>
  );
};

export const ShareCircleLink = ({ to }) => {
  return (
    <Link to={to}>
      <ShareCircle />
    </Link>
  );
};

export const Invite = () => {
  return <FaShareAlt color='white' size={24} />;
};

export const InviteCircle = () => {
  return (
    <Circle bgColor='info'>
      <Invite />
    </Circle>
  );
};

export const InviteCircleLink = ({ to }) => {
  return (
    <Link to={to}>
      <InviteCircle />
    </Link>
  );
};

const Icons = {
  Empty,
  Delete,

  TextCenterLink,
  TextCenterBox,

  Home,
  HomeCircle,
  HomeCircleLink,

  Close,
  CloseCircle,
  CloseCircleLink,

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

  ActivityManage,
  ActivityManageCircle,
  ActivityManageCircleLink,

  Search,
  SearchCircle,
  SearchCircleLink,

  Updates,
  UpdatesCircle,
  UpdatesCircleLink,

  Spinner,
  Loader,

  MKaDifferenceCircleLink,
};
export default Icons;
