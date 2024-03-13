const LandingAboutUs = () => {
  return (
    <>
      {/* <!-- ======= aboutUs Section ======= --> */}
      <section id='about' className='container' style={{ paddingTop: "80px" }}>
        <h2 className='text-center pb-4'>Who We Are</h2>
        <div className='container pb-2'>
          <div className='row justify-content-center'>
            <div className='col-sm-3 col-6'>
              <div className='text-center'>
                <span
                  data-purecounter-start='0'
                  data-purecounter-end='65'
                  data-purecounter-duration='2'
                  className='purecounter h3'
                ></span>
                <p>Members</p>
              </div>
            </div>

            <div className='col-sm-3 col-6'>
              <div className='text-center'>
                <span
                  data-purecounter-start='0'
                  data-purecounter-end='85'
                  data-purecounter-duration='2'
                  className='purecounter h3'
                ></span>
                <p>Activities</p>
              </div>
            </div>

            <div className='col-sm-3 col-6'>
              <div className='text-center'>
                <span
                  data-purecounter-start='0'
                  data-purecounter-end='30'
                  data-purecounter-duration='2'
                  className='purecounter h3'
                ></span>
                <p>Organisations</p>
              </div>
            </div>
            <div className='col-sm-3 col-6'>
              <div className='text-center'>
                <span
                  data-purecounter-start='0'
                  data-purecounter-end='24'
                  data-purecounter-duration='2'
                  className='purecounter h3'
                ></span>
                <p>Unions</p>
              </div>
            </div>
          </div>
        </div>
        <div className='row content'>
          <div className='col-lg-6'>
            <p>
              MKaDifference is a platform for people to organise events in a
              healthy safe environment withought sacrificing there personal
              details.
            </p>
            <p>
              Members can join events and keep up to date with their communities
              and unions.
            </p>
            <p>
              Activities created by organisations to bring people together for a
              good cause.
            </p>
            <p>
              Many social media platforms collect and merge personal data; to
              create a complete profile about each one of us.
            </p>
          </div>
          <div className='col-lg-6 pt-2 pt-lg-0'>
            <p>
              MKaDifference will provide safe refuge, as there is no personal
              identification data collected from members (as you can see in the
              registration form).
            </p>
            <p>
              No cookies stored on your browser, therefore trackers from other
              sites will find no trace and there is no way for other social
              media to link your profile to other profile they already
              collected.
            </p>
            <p>
              The moment you refresh the page or close the browser you are
              logged out and your data connection is elementated.
            </p>
            <b>
              <i>Never share what you don&apos;t want strangers to know!</i>
            </b>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingAboutUs;
