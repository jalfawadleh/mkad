const Error = () => {
  return (
    <>
      <div className='container mt-4'>
        <header>
          <nav className='bg-black'>
            <div className='container border-primary-subtle border-bottom'>
              <div className='m-1 p-1 py-2 h5'>δ MKaδifference</div>
            </div>
          </nav>
        </header>
        <h1 className='text-center text-primary'>
          <hr />
          Hey! where are you going?
          <hr />
        </h1>
        <h2 className='m-auto p-auto text-center text-primary '>
          <span role='button' className=' p-2 border border-2 border-primary'>
            <a href='/'>go back to home page</a>
          </span>
        </h2>
      </div>
    </>
  );
};

export default Error;
