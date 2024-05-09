import Join from "../components/Join";

import AboutUs from "../components/mkadifference/AboutUs";

const HelpJoin = () => {
  return (
    <>
      <div className='d-block mb-3 p-1 h4 text-center border-primary-subtle border-bottom border-top'>
        Terms and conditions
      </div>
      <div className='pb-2 overflow-auto' style={{ height: "430px" }}>
        <p>
          <b>1. Acceptance of Terms </b> By accessing or using MKaDifference,
          you agree to be bound by these terms and conditions. If you do not
          agree to these Terms, please do not use our services.
        </p>
        <p>
          <b>2. Changes to Terms </b> We reserve the right to modify these Terms
          at any time. Your continued use of the platform after such changes
          indicates your acceptance of the new Terms.
        </p>
        <p>
          <b>3. User Conduct </b> Users are expected to behave respectfully and
          responsibly. Harassment, bullying, and posting offensive content are
          strictly prohibited.
        </p>
        <p>
          <b>4. Content Ownership </b> Users retain ownership of the content
          they post but grant MKaDifference license to use in extream
          circumstances.
        </p>
        <p>
          <b>5. Intellectual Property </b> All intellectual property rights in
          the platform and its original content, features, and functionality are
          owned by MKaDifference.
        </p>
        <p>
          <b>6. Privacy Policy </b> Your privacy is important to us. Our Privacy
          Policy explains how we collect, use, and protect your personal
          information.
        </p>
        <p>
          <b>7. Account Termination </b> We may terminate or suspend access to
          our platform immediately, without prior notice, for any breach of
          these Terms.
        </p>
        <p>
          <b>8. Governing Law </b> These Terms shall be governed by the laws of
          Palestine, without regard to its conflict of law provisions.
        </p>
        <p>
          <b>9. Contact Us</b> If you have any questions about these Terms,
          please contact us at mkadifference@proton.me.
        </p>
      </div>
    </>
  );
};

const ScreenJoin = () => {
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
            <Join />
          </div>
          <div className='w-50 mx-3 px-3'>
            <HelpJoin />
          </div>
        </div>
        <div className='d-sm-block d-md-none'>
          <Join />
          <div className='my-3'>
            <HelpJoin />
          </div>
        </div>
      </div>
      <AboutUs />
    </>
  );
};
export default ScreenJoin;
