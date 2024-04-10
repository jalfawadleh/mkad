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
      <div className='d-flex justify-content-between m-2'>
        <span className='p-2 my-auto text-bg-primary rounded-start'>Start</span>
        <Datetime
          input={true}
          className='p-0 me-1'
          value={moment(startOn)}
          onChange={onChangeToStart}
        />

        <span className='p-2 ms-3 my-auto text-bg-primary rounded-start'>
          End
        </span>
        <Datetime
          className='p-0 rounded-end'
          value={moment(endOn)}
          onChange={onChangeToEnd}
        />
      </div>
      <hr className='my-2' />
    </>
  ) : (
    (startOn || endOn) && (
      <>
        {startOn && (
          <div className='d-inline-block m-2'>
            <span className='p-1 ps-2 my-auto text-start bg-primary rounded-pill rounded-end'>
              Start
            </span>
            <span className='p-1 my-auto border border-gray'>
              {moment(startOn).format("h:mm a DD MMMM YYYY ")}
            </span>
          </div>
        )}
        {endOn && (
          <div className='d-inline-block m-2'>
            <span className='p-1 ps-2 my-auto text-end bg-primary rounded-pill rounded-end'>
              End
            </span>
            <span className='p-1 my-auto border border-gray'>
              {moment(endOn).format("h:mm a DD MMMM YYYY")}
            </span>
          </div>
        )}

        <hr className='my-2' />
      </>
    )
  );
};

export default Period;
