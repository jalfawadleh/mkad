export const Section = ({ children }) => {
  return (
    <>
      <section className='container m-1 p-0'>{children}</section>
      <hr className='my-1' />
    </>
  );
};

export const ChocolateBar = ({ children }) => {
  return (
    <div className='d-flex rounded-pill p-0 m-0 mb-1 bg-black justify-content-between'>
      {children}
    </div>
  );
};

export const WrapperModal = ({ children }) => {
  return (
    <div
      role='dialog'
      aria-modal='true'
      className='fade modal show d-block bg-dark bg-opacity-75'
      tabIndex='-1'
      data-bs-backdrop='static'
    >
      <div className='modal-dialog modal-dialog-centered ' role='document'>
        <div className='modal-content bg-black p-1 border-1 border-primary'>
          {children}
        </div>
      </div>
    </div>
  );
};
