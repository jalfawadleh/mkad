import Navbar from "react-bootstrap/esm/Navbar";

const ScreenHeaderContainer = ({ children }) => {
  return (
    <>
      <Navbar
        bg='dark'
        className='float-sm-start float-md-start float-lg-start p-1 m-1'
        variant='dark'
        style={{ borderRadius: 10 }}
      >
        {children}
      </Navbar>
      <hr className='w-100 h-0 m-0' style={{ opacity: 0 }} />
    </>
  );
};

export default ScreenHeaderContainer;
