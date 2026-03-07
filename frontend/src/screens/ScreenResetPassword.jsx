import { Link, useParams } from "react-router-dom";

const ScreenResetPassword = () => {
  const { c } = useParams();

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

      <main className='container mt-4'>
        <div className='mx-auto p-3 border border-primary-subtle rounded' style={{ maxWidth: 560 }}>
          <h1 className='h4 text-center mb-3'>Password Reset Link</h1>
          {c ? (
            <p className='mb-3'>
              A reset token was received. Complete password reset from your account support workflow.
            </p>
          ) : (
            <p className='mb-3'>Reset link is invalid or missing token.</p>
          )}
          <div className='d-flex justify-content-center gap-2'>
            <Link className='btn btn-outline-primary' to='/'>
              Go Home
            </Link>
            <Link className='btn btn-primary' to='/join'>
              Open Join Page
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ScreenResetPassword;
