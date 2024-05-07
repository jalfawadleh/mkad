import Login from "../components/Login";
import Counts from "../components/Counts";

import AboutUs from "../components/mkadifference/AboutUs";

const ScreenLogin = () => {
  return (
    <>
      <header>
        <nav className='bg-black'>
          <div className='container'>
            <div className='p-3 border-primary-subtle border-bottom h4'>
              δ MKaDifference
            </div>
          </div>
        </nav>
      </header>

      <div className='container mt-3'>
        <div className='d-none d-md-flex justify-content-between pb-3'>
          <div className='w-50'>
            <Login />
          </div>
          <div className='w-50 mx-3 px-3 d-flex flex-column justify-content-between fw-bold'>
            <Counts />
          </div>
        </div>
        <div className='d-sm-block d-md-none'>
          <Login />
          <div className='d-flex justify-content-between mt-3 px-auto py-2 fw-bold border-primary-subtle border-top'>
            <Counts />
          </div>
        </div>
      </div>
      <AboutUs />
    </>
  );
};
export default ScreenLogin;
