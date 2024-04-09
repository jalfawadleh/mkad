import { AiOutlineClose } from "react-icons/ai";

export const Delete = () => {
  return (
    <>
      <span role='button' className='d-inline m-0 ms-1 p-0 bg-danger'>
        <AiOutlineClose size={16} className='m-0 p-0' />
      </span>
    </>
  );
};

const Icons = { Delete };
export default Icons;
