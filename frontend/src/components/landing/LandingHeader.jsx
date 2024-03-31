const LandingHeader = () => {
  return (
    <>
      <nav className='bg-black navbar navbar-expand-sm navbar-light fixed-top border-primary-subtle border-bottom'>
        <div className='bg-black container'>
          <a href='#' className='navbar-brand'>
            <h4>
              <img
                src='/logo.png'
                alt='δ'
                className='img-thumbnail border-0'
                height='30'
                width='30'
                style={{ marginTop: "-6px" }}
              />
              MKaδifference
            </h4>
          </a>
          <button
            aria-controls='basic-navbar-nav'
            type='button'
            aria-label='Toggle navigation'
            className='navbar-toggler collapsed'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='justify-content-end navbar-collapse collapse'
            id='basic-navbar-nav'
          >
            <div className='navbar-nav'>
              <a
                href='#login'
                data-rr-ui-event-key='#login'
                className='nav-link'
              >
                Login or Join
              </a>
              <a
                href='#about'
                data-rr-ui-event-key='#about'
                className='nav-link'
              >
                Who We Are
              </a>
              <a href='#faq' data-rr-ui-event-key='#faq' className='nav-link'>
                Why Join Us
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default LandingHeader;
