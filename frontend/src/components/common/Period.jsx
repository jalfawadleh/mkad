import moment from "moment";
import Datetime from "react-datetime";

const Period = ({ startOn, endOn, setParent, isEditing = false }) => {
  return isEditing ? (
    <>
      <div className='d-flex justify-content-between m-1 ps-1'>
        <div className='d-flex float-left w-50'>
          <span className='p-auto m-auto'>Start</span>
          <Datetime
            className='p-0 m-1'
            value={startOn}
            onChange={(e) => {
              setParent((prev) => ({ ...prev, startOn: e }));
            }}
          />
        </div>
        <div className='d-flex float-left w-50'>
          <span className='p-auto m-auto'>End</span>
          <Datetime
            className='p-0 m-1'
            value={endOn}
            onChange={(e) => {
              setParent((prev) => ({ ...prev, endOn: e }));
            }}
          />
        </div>
      </div>
      <hr className='m-1' />
    </>
  ) : (
    (startOn || endOn) && (
      <>
        <div className='d-flex justify-content-between m-1 p-0'>
          {startOn && (
            <div className='d-flex float-left w-50'>
              <span className='p-auto m-auto'>Start</span>
              <span className='p-auto m-auto'>
                <div>{moment(startOn).format("DD MMMM YYYY")}</div>
                <div>{moment(startOn).format("h:mm:ss a")}</div>
              </span>
            </div>
          )}
          {endOn && (
            <div className='d-flex float-left w-50'>
              <span className='p-auto m-auto'>End</span>
              <span className='p-auto m-auto'>
                <div>{moment(endOn).format("DD MMMM YYYY")}</div>
                <div>{moment(endOn).format("h:mm:ss a")}</div>
              </span>
            </div>
          )}
        </div>
        <hr className='m-1' />
      </>
    )
  );
};

export default Period;
