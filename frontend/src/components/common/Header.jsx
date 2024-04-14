import { UserContext } from "../../store.js";
import { useContext } from "react";

import {
  AvatarMember,
  IconHelp,
  IconLinkCircleFlyTo,
  IconSearch,
} from "./LinkItems";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <nav className='w-100 position-absolute bottom-0 none d-sm-none navbar navbar-expand navbar-light m-0 p-0'>
        <div className='w-100 p-0 m-0 justify-content-around navbar-nav'>
          <Link
            to='/dashboard'
            className='m-1 p-1 border border-primary rounded-circle bg-black'
            style={{ boxShadow: "0 0 5px 5px gold" }}
          >
            <svg
              fill='#ffffff'
              width='24'
              height='24'
              viewBox='20 0 350 350'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='m202.13 132.55q-9.2643-10.376-25.755-24.828-18.158-15.935-24.458-25.014-6.2997-9.2642-6.2997-20.196 0-16.305 15.193-25.569 15.193-9.4495 39.651-9.4495 24.458 0 42.615 8.3378 18.343 8.3379 18.343 22.975 0 7.0408-4.4448 11.673-4.4448 4.632-10.376 4.632-8.5227 0-20.011-12.785-11.673-12.97-19.825-18.158-7.9673-5.373-18.714-5.373-13.711 0-22.605 6.1144-8.7088 6.1144-8.7088 15.564 0 8.8936 7.2262 16.676 7.2262 7.7819 37.242 28.349 32.054 22.049 45.21 34.463 13.34 12.414 21.678 30.202 8.3383 17.787 8.3383 37.613 0 34.834-24.643 61.515-24.458 26.496-57.253 26.496-29.831 0-50.398-21.308-20.566-21.308-20.566-56.882 0-34.278 22.604-57.253 22.79-22.975 55.956-27.793zm8.1521 8.5231q-53.177 8.7083-53.177 73.002 0 33.166 13.155 51.509 13.341 18.343 30.943 18.343 18.343 0 30.201-17.602 11.858-17.787 11.858-47.989 0-43.727-32.981-77.264z' />
            </svg>
          </Link>

          <span role='button' className='p-0 m-0'>
            <Link to='dashboard/manage/member'>
              <AvatarMember name={user.name} />
            </Link>
          </span>
          <span
            role='button'
            className='p-1 m-1 bg-black rounded-pill border border-primary'
          >
            <Link to='/'>
              <IconSearch />
            </Link>
          </span>
          <span
            role='button'
            className='p-1 m-1 bg-black rounded-pill border border-primary bg-black'
          >
            <Link to='help'>
              <IconHelp />
            </Link>
          </span>

          <IconLinkCircleFlyTo location={user.location} />
        </div>
      </nav>
    </>
  );
};

export default Header;
