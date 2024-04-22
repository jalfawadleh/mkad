const LandingHeader = () => {
  return (
    <>
      <header className='m-0 p-0'>
        <nav className='navbar fixed-top bg-black'>
          <div className='container border-primary-subtle border-bottom '>
            <a href='#' className='navbar-brand h5 m-0'>
              δ MKaδifference
            </a>
            <div className='d-flex justify-content-around text-primary'>
              <a href='#login' className='nav-link p-0 px-1'>
                Login
              </a>
              <a href='#about' className='nav-link p-0 px-1'>
                Who we are
              </a>
              {/* <a href='#faq' className='nav-link p-0 px-1'>
                Why Join Us
              </a> */}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default LandingHeader;
