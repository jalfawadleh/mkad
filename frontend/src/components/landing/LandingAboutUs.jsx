const LandingAboutUs = () => {
  return (
    <>
      {/* <!-- ======= aboutUs Section ======= --> */}
      <section
        id='about'
        className='container mt-3 pt-4 border-primary-subtle border-top bg-black'
      >
        <h2 className='text-center'>Who We Are</h2>

        <div className='row content'>
          <div className='col-lg-6'>
            <p style={{ textAlign: "justify" }}>
              MKaDifference is a platform for people to organise events in a
              healthy safe environment withought sacrificing there personal
              details.
            </p>
            <p style={{ textAlign: "justify" }}>
              Members can join events and keep up to date with their communities
              and unions.
            </p>
            <p style={{ textAlign: "justify" }}>
              Activities created by organisations to bring people together for a
              good cause.
            </p>
            <p style={{ textAlign: "justify" }}>
              Many social media platforms collect and merge personal data; to
              create a complete profile about each one of us.
            </p>
          </div>
          <div className='col-lg-6 pt-2 pt-lg-0'>
            <p style={{ textAlign: "justify" }}>
              MKaDifference will provide safe refuge, as there is no personal
              identification data collected from members (as you can see in the
              registration form).
            </p>
            <p style={{ textAlign: "justify" }}>
              No cookies stored on your browser, therefore trackers from other
              sites will find no trace and there is no way for other social
              media to link your profile to other profile they already
              collected.
            </p>
            <p style={{ textAlign: "justify" }}>
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
