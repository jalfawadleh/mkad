import { useContext } from "react";
import { Link } from "react-router-dom";
import { MapContext } from "../../store";

import { FaFlag } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";

const iconSize = 24;
const iconClass = "p-0 m-0";
const iconColor = "gray";

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
  return (
    <Icon>
      <FaFlag color={color} size={iconSize} className={iconClass} />
    </Icon>
  );
};

export const IconOrganisation = ({ color = iconColor }) => {
  return (
    <Icon>
      <FaHouseUser color={color} size={iconSize} className={iconClass} />
    </Icon>
  );
};

export const IconFlyTo = ({ location, color = iconColor }) => {
  const { setMapCenter } = useContext(MapContext);
  return (
    <Icon>
      <FaLocationCrosshairs
        size={iconSize}
        className={iconClass}
        color={color}
        onClick={() => setMapCenter(location)}
      />
    </Icon>
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

export const ChocolateBar = ({ children }) => {
  return (
    <div className='d-flex rounded-pill p-0 m-0 mb-1 bg-black'>{children}</div>
  );
};

export const ListLinks = ({ items }) => {
  return items.map((item) => (
    <ChocolateBar key={item._id}>
      {
        {
          member: <AvatarMember name={item.name} />,
          activity: <IconActivity color={"#bbb"} />,
          organisation: <IconOrganisation color={"#bbb"} />,
        }[item.type]
      }

      <Link
        to={item.type + "/" + item._id}
        className='p-auto m-auto w-100 fw-bold text-center link-underline link-underline-opacity-0'
      >
        {item.name}
      </Link>
      <IconFlyTo location={item.location} color={"white"} />
    </ChocolateBar>
  ));
};
