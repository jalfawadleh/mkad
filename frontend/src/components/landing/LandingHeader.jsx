const LandingHeader = () => {
  const links = (
    <div className='nav justify-content-around'>
      <a href='#login' className='nav-link'>
        Login or Join
      </a>
      <a href='#about' className='nav-link'>
        About
      </a>
      <a href='#faq' className='nav-link'>
        Why Join
      </a>
    </div>
  );

  return (
    <>
      <header className='m-0 p-0'>
        <nav className='navbar fixed-top bg-black'>
          <div className='container border-primary-subtle border-bottom'>
            <a href='#' className='navbar-brand h4 m-0'>
              <img
                className='mb-1 me-1 border border-1 border-primary'
                src='/logo.png'
                alt='δ'
                height='24'
                width='24'
              />
              MKaδifference
            </a>
            <div className='d-none d-sm-block justify-content-end'>{links}</div>
            <div className='d-block d-sm-none w-100' style={{ marginTop: -15 }}>
              {links}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default LandingHeader;
