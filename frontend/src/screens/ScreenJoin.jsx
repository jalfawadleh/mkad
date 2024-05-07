import Join from "../components/Join";

import AboutUs from "../components/mkadifference/AboutUs";

const HelpJoin = () => {
  return (
    <>
      <div className='d-block mb-3 p-1 h4 text-center border-primary-subtle border-bottom border-top'>
        Terms and conditions
      </div>
      <div className='pb-2 overflow-auto' style={{ height: "430px" }}>
        lasdk fnals dkfna lsdk fasl asdkfn alsdkf nalsd kfasl asdkfn alsdkf
        nalsdk faslasd kfnalsd lasdk fnals dkfna lsdk fasl asdkfn alsdkf nalsd
        kfasl asdkfn alsdkf nalsdk faslasd kfnalsd lasdk fnals dkfna lsdk fasl
        asdkfn alsdkf nalsd kfasl asdkfn alsdkf nalsdk faslasd kfnalsd lasdk
        fnals dkfna lsdk fasl asdkfn alsdkf nalsd kfasl asdkfn alsdkf nalsdk
        faslasd kfnalsd lasdk fnals dkfna lsdk fasl asdkfn alsdkf nalsd kfasl
        asdkfn alsdkf nalsdk faslasd kfnalsd lasdk fnals dkfna lsdk fasl asdkfn
        alsdkf nalsd kfasl asdkfn alsdkf nalsdk faslasd kfnalsd lasdk fnals
        dkfna lsdk fasl asdkfn alsdkf nalsd kfasl asdkfn alsdkf nalsdk faslasd
        kfnalsd lasdk fnals dkfna lsdk fasl asdkfn alsdkf nalsd kfasl asdkfn
        alsdkf nalsdk faslasd kfnalsd lasdk fnals dkfna lsdk fasl asdkfn alsdkf
        nalsd kfasl asdkfn alsdkf nalsdk faslasd kfnalsd lasdk fnals dkfna lsdk
        fasl asdkfn alsdkf nalsd kfasl asdkfn alsdkf nalsdk faslasd kfnalsd
        lasdk fnals dkfna lsdk fasl asdkfn alsdkf nalsd kfasl asdkfn alsdkf
        nalsdk faslasd kfnalsd lasdk fnals dkfna lsdk fasl asdkfn alsdkf nalsd
        kfasl asdkfn alsdkf nalsdk faslasd kfnalsd lasdk fnals dkfna lsdk fasl
        asdkfn alsdkf nalsd kfasl asdkfn alsdkf nalsdk faslasd kfnalsd lasdk
        fnals dkfna lsdk fasl asdkfn alsdkf nalsd kfasl asdkfn alsdkf nalsdk
        faslasd kfnalsd lasdk fnals dkfna lsdk fasl asdkfn alsdkf nalsd kfasl
        asdkfn alsdkf nalsdk faslasd kfnalsd lasdk fnals dkfna lsdk fasl asdkfn
        alsdkf nalsd kfasl asdkfn alsdkf nalsdk faslasd kfnalsd lasdk fnals
        dkfna lsdk fasl asdkfn alsdkf nalsd kfasl asdkfn alsdkf nalsdk faslasd
        kfnalsd
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
