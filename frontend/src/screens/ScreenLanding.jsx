import LandingLogin from "../components/landing/LandingLogin";
import LandingAboutUs from "../components/landing/LandingAboutUs";
// import LandingFAQ from "../components/landing/LandingFAQ";

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
      <LandingAboutUs />
    </>
  );
};
export default ScreenLanding;
