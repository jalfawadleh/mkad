const LandingHeader = () => {
  return (
    <>
      <header className='m-0 p-0'>
        <nav className='navbar fixed-top bg-black'>
          <div className='container border-primary-subtle border-bottom'>
            <a href='#' className='navbar-brand h4 m-0'>
              <img
                className='mb-1 me-1 p-1 border border-1 border-primary'
                src='data:image/svg+xml;utf8,<svg fill="#ffffff" width="30" height="30" viewBox="20 -40 400 400" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="m202.13 132.55q-9.2643-10.376-25.755-24.828-18.158-15.935-24.458-25.014-6.2997-9.2642-6.2997-20.196 0-16.305 15.193-25.569 15.193-9.4495 39.651-9.4495 24.458 0 42.615 8.3378 18.343 8.3379 18.343 22.975 0 7.0408-4.4448 11.673-4.4448 4.632-10.376 4.632-8.5227 0-20.011-12.785-11.673-12.97-19.825-18.158-7.9673-5.373-18.714-5.373-13.711 0-22.605 6.1144-8.7088 6.1144-8.7088 15.564 0 8.8936 7.2262 16.676 7.2262 7.7819 37.242 28.349 32.054 22.049 45.21 34.463 13.34 12.414 21.678 30.202 8.3383 17.787 8.3383 37.613 0 34.834-24.643 61.515-24.458 26.496-57.253 26.496-29.831 0-50.398-21.308-20.566-21.308-20.566-56.882 0-34.278 22.604-57.253 22.79-22.975 55.956-27.793zm8.1521 8.5231q-53.177 8.7083-53.177 73.002 0 33.166 13.155 51.509 13.341 18.343 30.943 18.343 18.343 0 30.201-17.602 11.858-17.787 11.858-47.989 0-43.727-32.981-77.264z"></path></svg>'
                alt='δ'
                height='24'
                width='24'
              />
              MKaδifference
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
