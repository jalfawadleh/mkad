import { FaLanguage } from "react-icons/fa";

export const Section = ({ children }) => {
  return (
    <>
      <section className='container m-1 p-0'>{children}</section>
      <hr className='my-1' />
    </>
  );
};

export const Bar = ({ children }) => {
  return (
    <div className='d-flex rounded-pill p-0 m-0 mb-1 bg-black justify-content-between'>
      {children}
    </div>
  );
};

export const Modal = ({ children }) => {
  return (
    <div
      role='dialog'
      aria-modal='true'
      className='fade modal show d-block bg-dark bg-opacity-75'
      tabIndex='-1'
      data-bs-backdrop='static'
    >
      <div className='modal-dialog modal-dialog-centered ' role='document'>
        <div className='modal-content bg-black p-0 border-1 border-primary'>
          {children}
        </div>
      </div>
    </div>
  );
};

export const Header = ({ children }) => {
  return (
    <>
      <div className='d-flex justify-content-between m-1 p-1'>{children}</div>
      <hr className='m-1' />
    </>
  );
};

export const Body = ({ children }) => {
  return <div className='overflow-y-auto p-1 m-0'>{children}</div>;
};

export const Footer = ({ children }) => {
  return (
    <div className='d-flex justify-content-between m-1 p-1'>{children}</div>
  );
};

export const Language = ({ children }) => {
  return (
    <>
      <div className='d-inline m-1 p-0'>
        <span className='my-auto p-1 text-bg-primary rounded-pill rounded-end'>
          <FaLanguage size={24} />
        </span>
        <span className='my-auto p-1 border border-gray'>{children}</span>
      </div>
    </>
  );
};

const Wrappers = { Modal, Body, Header, Footer, Bar, Language };
export default Wrappers;
