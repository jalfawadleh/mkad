import LandingLogin from "../components/landing/LandingLogin";
import AboutUs from "../components/mkadifference/AboutUs";

const ScreenLanding = () => {
  return (
    <>
      <header>
        <nav className='bg-black'>
          <div className='container border-primary-subtle border-bottom'>
            <div className='m-1 p-1 py-2 h5'>δ MKaδifference</div>
          </div>
        </nav>
      </header>
      <LandingLogin />
      <AboutUs />
    </>
  );
};
export default ScreenLanding;
