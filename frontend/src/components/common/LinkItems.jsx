import { useContext } from "react";
import { Link } from "react-router-dom";
import { MapContext } from "../../store";

import { BiSolidFlag } from "react-icons/bi";
import { FaHouseUser } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaRegFaceGrinBeam } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { RiArrowUpDownFill } from "react-icons/ri";
import { MdTune } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineManageAccounts } from "react-icons/md";

const iconSize = 24;
const iconClass = "p-0 m-0";
const iconColor = "#dddddd";
export const iconWrapperClass =
  "p-1 m-1 bg-black rounded-pill border border-primary";

export const Section = ({ children }) => {
  return (
    <>
      <div className='d-flex justify-content-between m-1 p-0'>{children}</div>
      <hr className='my-1' />
    </>
  );
};

export const Icon = ({ children }) => {
  return (
    <span
      role='button'
      className='p-1 m-1 bg-black rounded-pill border border-primary-settle'
    >
      {children}
    </span>
  );
};

export const Circle = ({ children }) => {
  return (
    <span
      className='p-1 m-1 badge rounded-pill border border-primary'
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

export const BoxCenterText = ({ text }) => {
  return (
    <Box>
      <span className='h5'>{text}</span>
    </Box>
  );
};

export const IconCircleClose = () => {
  return (
    <span
      className='p-1 m-1 badge rounded-pill border border-primary'
      role='button'
    >
      <Link to='/'>
        <AiOutlineClose color='white' size={iconSize} className={iconClass} />
      </Link>
    </span>
  );
};

export const IconMessage = ({ color = iconColor }) => {
  return <FaEnvelope color={color} size={iconSize} className={iconClass} />;
};

export const IconUpdate = ({ color = iconColor }) => {
  return <FaBell color={color} size={iconSize} className={iconClass} />;
};

export const IconFold = ({ color = iconColor }) => {
  return (
    <span
      className='p-1 m-1 badge rounded-pill border border-primary'
      role='button'
    >
      <RiArrowUpDownFill color={color} size={iconSize} className={iconClass} />
    </span>
  );
};

export const IconFilter = ({ color = iconColor }) => {
  return <MdTune color={color} size={iconSize} className={iconClass} />;
};

export const IconSearch = ({ color = iconColor }) => {
  return <FaSearch color={color} size={iconSize} className={iconClass} />;
};

export const IconExclamation = ({ color = iconColor }) => {
  return (
    <FaExclamationCircle color={color} size={iconSize} className={iconClass} />
  );
};

export const IconAdd = ({ color = iconColor }) => {
  return <FaPlus color={color} size={iconSize} className={iconClass} />;
};

export const IconAccount = () => {
  return (
    <MdOutlineManageAccounts color='white' size={24} className={iconClass} />
  );
};

export const IconCirlceAccount = () => {
  return (
    <span
      className='p-1 m-1 badge rounded-pill border border-primary'
      role='button'
    >
      <MdOutlineManageAccounts color='white' size={24} className={iconClass} />
    </span>
  );
};

export const IconAddLink = ({ color = iconColor }) => {
  return (
    <Link to='new'>
      <span
        className='p-1 m-1 badge rounded-pill border border-primary'
        role='button'
      >
        <FaPlus color={color} size={iconSize} className={iconClass} />
      </span>
    </Link>
  );
};

export const IconCircleHelp = ({ color = iconColor }) => {
  return (
    <span
      className='p-1 m-1 badge rounded-pill border border-primary'
      role='button'
    >
      <FaQuestion color={color} size={iconSize} className={iconClass} />
    </span>
  );
};

export const IconHelp = ({ color = iconColor }) => {
  return <FaQuestion color={color} size={iconSize} className={iconClass} />;
};

export const IconFlyTo = ({ location }) => {
  const { setMapCenter } = useContext(MapContext);
  return (
    <span
      role='button'
      className='p-1 m-1 bg-black rounded-pill border border-primary'
    >
      <FaLocationCrosshairs
        size={iconSize}
        className={iconClass}
        color={"white"}
        onClick={() => setMapCenter({ lng: location.lng, lat: location.lat })}
      />
    </span>
  );
};

export const IconLinkCircleFlyTo = ({ location }) => {
  const { setMapCenter } = useContext(MapContext);
  return (
    <span className='p-0 m-0'>
      <span
        role='button'
        className='p-1 m-1 badge rounded-pill border border-primary'
      >
        <FaLocationCrosshairs
          size={24}
          className={iconClass}
          onClick={() => setMapCenter({ lng: location.lng, lat: location.lat })}
        />
      </span>
    </span>
  );
};

export const IconLocation = () => {
  return (
    <span className='p-0 m-0'>
      <span
        role='button'
        className='p-1 m-1 badge rounded-pill border border-primary'
      >
        <FaLocationCrosshairs size={24} className={iconClass} />
      </span>
    </span>
  );
};

export const IconMember = ({ color = iconColor }) => {
  return (
    <FaRegFaceGrinBeam color={color} size={iconSize} className={iconClass} />
  );
};

export const AvatarMember = ({ name = "na" }) => {
  return (
    <img
      height={iconSize + 10}
      width={iconSize + 10}
      src={"https://api.multiavatar.com/" + name + ".png"}
      alt='Profile Photo'
      className='p-0 m-1'
    />
  );
};

export const LinkAvatarMember = ({ item }) => {
  return (
    <Link
      className='link-underline link-underline-opacity-0 p-0 m-0'
      to={"/member/" + item._id}
    >
      <img
        height={34}
        width={34}
        src={"https://api.multiavatar.com/" + item.name + ".png"}
        alt='Profile Photo'
        className='p-0 m-1'
      />
    </Link>
  );
};

export const IconButton = ({ children }) => {
  return (
    <div className='link-primary p-1 m-1 bg-black rounded-pill border border-primary'>
      <span role='button' className='link-primary text-white p-1 m-1'>
        {children}
      </span>
    </div>
  );
};

export const LinkButton = ({ to, children }) => {
  return (
    <Link
      className='text-white link-primary link-underline-opacity-0 p-0 m-0'
      to={to}
    >
      <IconButton>{children}</IconButton>
    </Link>
  );
};

export const LinkButtoneBack = () => {
  return (
    <Link
      className='text-white link-primary link-underline-opacity-0 p-0 m-0'
      to={-1}
    >
      <IconButton>Back</IconButton>
    </Link>
  );
};

export const IconLinkCenterText = ({ item }) => {
  return (
    <Link
      to={item.type + "/" + item._id}
      className='p-auto m-auto w-100 fw-bold text-center link-underline link-underline-opacity-0'
    >
      {item.name}
    </Link>
  );
};

// Organisation

export const IconOrganisation = () => {
  return <FaHouseUser color={"white"} size={24} className={iconClass} />;
};

export const CircleIconOrganisation = () => {
  return (
    <Circle>
      <IconOrganisation />
    </Circle>
  );
};

export const LinkCircleIconOrganisation = ({ item }) => {
  return (
    <Link to={"organisation/" + item._id}>
      <CircleIconOrganisation />
    </Link>
  );
};

// activity

export const IconCircleActivity = ({ color = iconColor }) => {
  return (
    <span
      className='p-1 m-1 badge rounded-pill border border-primary'
      role='button'
    >
      <BiSolidFlag color={color} size={iconSize} className={iconClass} />
    </span>
  );
};

export const IconActivity = ({ color = iconColor }) => {
  return <BiSolidFlag color={color} size={iconSize} className={iconClass} />;
};

export const LinkCircleIconActivity = ({ item }) => {
  return (
    <Link to={"activity/" + item._id}>
      <Circle>
        <BiSolidFlag color={"white"} size={24} className={iconClass} />
      </Circle>
    </Link>
  );
};

export const IconLinkMembersCircle = ({ item }) => {
  return (
    <Link to={item.type + "/" + item._id + "/members"}>
      <span
        className='p-1 m-1 badge rounded-pill border border-primary'
        role='button'
      >
        <FaPeopleGroup color={"white"} size={24} className={iconClass} />
      </span>
    </Link>
  );
};

export const ChocolateBar = ({ children }) => {
  return (
    <div className='d-flex rounded-pill p-0 m-0 mb-1 bg-black justify-content-between'>
      {children}
    </div>
  );
};

export const ListManageActivities = ({ items }) => {
  return items.map((item) => (
    <ChocolateBar key={item._id}>
      <LinkCircleIconActivity item={item} />
      <IconLinkCenterText item={item} />
      {/* <IconLinkMembersCircle item={item} /> */}
      <IconLinkCircleFlyTo location={item.location} />
    </ChocolateBar>
  ));
};

export const ListLinks = ({ items }) => {
  return (
    items.length &&
    items.map((item) => (
      <ChocolateBar key={item._id}>
        {
          {
            location: <IconLinkCircleFlyTo location={item.location} />,
            member: <LinkAvatarMember item={item} />,
            activity: <LinkCircleIconActivity item={item} />,
            organisation: <LinkCircleIconOrganisation item={item} />,
          }[item.type]
        }

        <IconLinkCenterText item={item} />
        <IconLinkCircleFlyTo location={item.location} />
      </ChocolateBar>
    ))
  );
};

export const WrapperModal = ({ children }) => {
  return (
    <div
      role='dialog'
      aria-modal='true'
      className='fade modal show d-block'
      tabIndex='-1'
    >
      <div
        className='modal-dialog modal-dialog-centered modal-dialog-scrollable'
        role='document'
      >
        <div className='modal-content bg-black p-1'>{children}</div>
      </div>
    </div>
  );
};

export const IconSpin = () => {
  return (
    <div
      className='spinner-border text-primary'
      role='status'
      style={{ height: 20, width: 20, padding: 0, margin: 0 }}
    >
      <span className='visually-hidden w-100 h-100'>Loading...</span>
    </div>
  );
};

export const IconLoading = () => {
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
