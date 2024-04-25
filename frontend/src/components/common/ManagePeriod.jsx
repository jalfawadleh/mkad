import moment from "moment";
import Datetime from "react-datetime";

const Period = ({ startOn, endOn, setParent, isEditing = false }) => {
  const onChangeToStart = (date) =>
    setParent((prev) => ({ ...prev, startOn: moment(date).toISOString() }));

  const onChangeToEnd = (date) =>
    setParent((prev) => ({ ...prev, endOn: new Date(date).toISOString() }));

  return isEditing ? (
    <>
      <div className='d-flex justify-content-start ms-2 mb-2'>
        <div
          className='p-2 my-auto text-bg-primary rounded-start'
          style={{ width: 50 }}
        >
          Start
        </div>
        <Datetime
          input={true}
          className='p-0 my-auto mx-0 bg-dark'
          value={moment(startOn)}
          onChange={onChangeToStart}
          isValidDate={(current) => {
            return current.isAfter(moment(Date.now()));
          }}
        />
      </div>
      <div className='d-flex justify-content-start ms-2'>
        <span
          className='p-2 my-auto text-bg-primary rounded-start'
          style={{ width: 50 }}
        >
          End
        </span>
        <Datetime
          className='p-0 my-auto mx-0 bg-dark'
          value={moment(endOn)}
          onChange={onChangeToEnd}
          isValidDate={(current) => {
            return current.isAfter(moment(startOn));
          }}
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
