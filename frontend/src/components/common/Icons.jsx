import { useContext } from "react";
import { Link } from "react-router-dom";
import multiavatar from "@multiavatar/multiavatar/esm";
import { MapContext } from "../../store";

import {
  FaHandshakeSimple,
  FaLocationCrosshairs,
  FaPlus,
  FaRegEnvelope,
  FaUsers,
} from "react-icons/fa6";
import {
  FaBell,
  FaExclamationCircle,
  FaHouseUser,
  FaMoon,
  FaQuestion,
  FaSearch,
  FaSun,
  FaUser,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { RiArrowUpDownFill } from "react-icons/ri";
import { BiSolidFlag } from "react-icons/bi";
import { MdTune } from "react-icons/md";

export const Empty = () => {
  return <div className='p-1 m-1' style={{ width: 35, height: 24 }} />;
};

export const Circle = ({ children, borderColor = "primary" }) => {
  return (
    <span
      className={
        "p-1 m-1 badge rounded-pill border border-2 border-" + borderColor
      }
      role='button'
    >
      {children}
    </span>
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

export const Online = ({ color = "yellow" }) => {
  return <FaSun color={color} size={24} />;
};

export const OnlineCircle = ({ color = "yellow" }) => {
  return (
    <Circle>
      <Online color={color} />
    </Circle>
  );
};

export const Offline = ({ color = "white" }) => {
  return <FaMoon color={color} size={24} />;
};

export const OfflineCircle = ({ color = "white" }) => {
  return (
    <Circle>
      <Offline color={color} />
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

export const MessageCircleLink = ({ id, name, color = "white" }) => {
  return (
    <Link to={`/messaging/${id}/${name}`}>
      <MessageCircle color={color} />
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

export const DiscusstionCircleLink = ({ type, id, name, color = "white" }) => {
  return (
    <Link to={`/discussion/${type}/${id}/${name}`}>
      <DiscusstionCircle color={color} />
    </Link>
  );
};

export const AddActivity = ({ color = "white" }) => {
  return <FaPlus color={color} size={24} />;
};

export const AddActivityCircle = ({ color = "white" }) => {
  return (
    <Circle borderColor='success'>
      <AddActivity color={color} />
    </Circle>
  );
};

export const AddActivityCircleLink = ({ color = "white" }) => {
  return (
    <Link to='/manage/activity/new'>
      <AddActivityCircle color={color} />
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
    <Circle borderColor='warning'>
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
    <Circle borderColor='success'>
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
    <Link to={"/member/" + id} className='' style={{ height: 34, width: 34 }}>
      <Avatar name={name} />
    </Link>
  );
};

export const AvatarCustomLink = ({ name = "na", to = "/manage/member" }) => {
  return (
    <Link to={to}>
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
    <Link to={"member/" + id}>
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
      className='spinner-border text-primary m-0 p-0'
      role='status'
      style={{ height: 24, width: 24 }}
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

const Icons = {
  Delete,
  CircleMessage,
  CenterText,
  Empty,

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
