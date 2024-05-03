import { Link } from "react-router-dom";

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
