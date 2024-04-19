const LandingHeader = () => {
  return (
    <>
      <header className='m-0 p-0'>
        <nav className='navbar fixed-top bg-black'>
          <div className='container border-primary-subtle border-bottom'>
            <a href='#' className='navbar-brand h4 m-0'>
              δ MKaδifference
            </a>
            <div className='d-none d-md-block justify-content-end'>
              <div className='nav justify-content-around p-1'>
                <a href='#login' className='nav-link'>
                  Login or join
                </a>
                <a href='#about' className='nav-link'>
                  Who we are
                </a>
                <a href='#faq' className='nav-link'>
                  Why Join Us
                </a>
              </div>
            </div>
            <div
              className='d-xs-block d-md-none w-100'
              style={{ marginTop: -15 }}
            >
              <div className='nav justify-content-around p-1 w-100'>
                <a href='#login' className='nav-link p-1'>
                  Login or join
                </a>
                <a href='#about' className='nav-link p-1'>
                  Who we are
                </a>
                <a href='#faq' className='nav-link p-1'>
                  Why Join Us
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default LandingHeader;
