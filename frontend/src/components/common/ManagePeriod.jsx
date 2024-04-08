import moment from "moment";
import Datetime from "react-datetime";
import { toast } from "react-toastify";

const Period = ({ startOn, endOn, setParent, isEditing = false }) => {
  const onChangeToStart = (date) => {
    if (moment(date).isBefore(Date.now()))
      toast.error("Please choose a start in the future");
    else
      setParent((prev) => ({ ...prev, startOn: moment(date).toISOString() }));
  };

  const onChangeToEnd = (date) => {
    if (moment(date).isBefore(startOn))
      toast.error("End should be after start");
    else
      setParent((prev) => ({ ...prev, endOn: new Date(date).toISOString() }));
  };

  return isEditing ? (
    <>
      <div className='d-flex justify-content-between m-1 ps-1'>
        <div className='d-flex float-left w-50'>
          <span className='p-auto m-auto'>Start</span>
          <Datetime
            input={true}
            className='p-0 m-1'
            value={moment(startOn)}
            onChange={onChangeToStart}
          />
        </div>
        <div className='d-flex float-left w-50'>
          <span className='p-auto m-auto'>End</span>
          <Datetime
            className='p-0 m-1'
            value={moment(endOn)}
            onChange={onChangeToEnd}
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
