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
import { LinkContainer } from "react-router-bootstrap";
import { AiOutlineClose } from "react-icons/ai";

const iconSize = 24;
const iconClass = "p-0 m-0";
const iconColor = "#dddddd";
export const iconWrapperClass =
  "p-1 m-1 bg-black rounded-pill border border-primary";

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

export const IconActivity = ({ color = iconColor }) => {
  return <BiSolidFlag color={color} size={iconSize} className={iconClass} />;
};

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

export const IconCircleClose = () => {
  return (
    <span
      className='p-1 m-1 badge rounded-pill border border-primary'
      role='button'
    >
      <Link to='..'>
        <AiOutlineClose color='white' size={iconSize} className={iconClass} />
      </Link>
    </span>
  );
};

export const IconOrganisation = ({ color = iconColor }) => {
  return <FaHouseUser color={color} size={iconSize} className={iconClass} />;
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

export const IconAddLink = ({ color = iconColor }) => {
  return (
    <LinkContainer to='new'>
      <span
        className='p-1 m-1 badge rounded-pill border border-primary'
        role='button'
      >
        <FaPlus color={color} size={iconSize} className={iconClass} />
      </span>
    </LinkContainer>
  );
};

export const IconHelp = ({ color = iconColor }) => {
  return <FaQuestion color={color} size={iconSize} className={iconClass} />;
};

export const IconFlyTo = ({ location, color = iconColor }) => {
  const { setMapCenter } = useContext(MapContext);
  return (
    <FaLocationCrosshairs
      size={iconSize}
      className={iconClass}
      color={color}
      onClick={() => setMapCenter({ lng: location.lng, lat: location.lat })}
    />
  );
};

export const IconMember = ({ color = iconColor }) => {
  return (
    <FaRegFaceGrinBeam color={color} size={iconSize} className={iconClass} />
  );
};

export const AvatarMember = ({ name }) => {
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

export const AvatarMemberLink = ({ member }) => {
  return (
    <Link
      className='link-underline link-underline-opacity-0 p-0 m-0'
      to={"/member/" + member._id}
    >
      <img
        height={34}
        width={34}
        src={"https://api.multiavatar.com/" + member.name + ".png"}
        alt='Profile Photo'
        className='p-0 m-1'
      />
    </Link>
  );
};

export const IconButton = ({ children }) => {
  return (
    <span className='link-primary p-1 m-1 bg-black rounded-pill border border-primary'>
      <span role='button' className='link-primary text-white px-3'>
        {children}
      </span>
    </span>
  );
};

export const IconButtonBack = () => {
  return (
    <span className='link-primary p-1 m-1 bg-black rounded-pill border border-primary'>
      <span role='button' className='link-primary px-3'>
        <Link
          className='text-white link-primary link-underline-opacity-0'
          to='..'
        >
          Back
        </Link>
      </span>
    </span>
  );
};

export const ChocolateBar = ({ children }) => {
  return (
    <div className='d-flex rounded-pill p-0 m-0 mb-1 bg-black justify-content-between'>
      {children}
    </div>
  );
};

export const ListLinks = ({ items }) => {
  return items.map((item) => (
    <ChocolateBar key={item._id}>
      {
        {
          member: <AvatarMember name={item.name} />,
          activity: (
            <Icon>
              <IconActivity color={"#bbb"} />
            </Icon>
          ),
          organisation: (
            <Icon>
              <IconOrganisation color={"#bbb"} />
            </Icon>
          ),
        }[item.type]
      }

      <Link
        to={item.type + "/" + item._id}
        className='p-auto m-auto w-100 fw-bold text-center link-underline link-underline-opacity-0'
      >
        {item.name}
      </Link>
      <span
        role='button'
        className='p-1 m-1 bg-black rounded-pill border border-primary'
      >
        <IconFlyTo location={item.location} color={"white"} />
      </span>
    </ChocolateBar>
  ));
};
