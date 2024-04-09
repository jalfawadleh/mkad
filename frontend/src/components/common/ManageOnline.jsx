import { Link } from "react-router-dom";

const ManageOnline = ({ online, setParent, editing = false }) => {
  return (
    <>
      {editing && (
        <>
          <div className='p-1 m-1 hstack gap-2'>
            <input
              type='checkbox'
              className='btn-check mb-3'
              id='online'
              autoComplete='off'
              checked={online.value}
              onChange={(e) =>
                setParent((prev) => ({
                  ...prev,
                  online: { value: e.target.checked, link: "" },
                }))
              }
            />
            <label
              className='btn btn-outline-success '
              htmlFor='online'
              style={{ width: 140 }}
            >
              Online
            </label>
            {online.value && <div className='m-auto'>Put the link below</div>}
          </div>
          {online.value && (
            <div className='form-floating m-1 p-1'>
              <input
                type='text'
                className='form-control'
                id='link'
                placeholder='Link to event'
                name='link'
                value={online.link}
                onChange={(e) =>
                  setParent((prev) => ({
                    ...prev,
                    online: { value: true, link: e.target.value },
                  }))
                }
              />
              <label htmlFor='link'>Link</label>
            </div>
          )}
          <hr className='m-1' />
        </>
      )}

      {/* Viewing */}
      {!editing && online.value && (
        <>
          <div className='p-1 m-1 w-100 d-flex justofy-contents-between'>
            <div className='p-1 my-auto text-center'>ONLINE</div>

            <Link
              to={location.link}
              target='_blank'
              className='p-1 m-auto text-center link-underline link-underline-opacity-0 border border-1 border-primary text-primary'
            >
              Open Link
            </Link>
            <div
              role='button'
              className='p-1 m-auto text-center border border-1 border-primary text-primary'
              onClick={() => {
                navigator.clipboard.writeText(online.link);
              }}
            >
              Copy Link
            </div>
          </div>

          <div className='p-1 m-1'>Link</div>
          <div className='p-2 my-2 small'>{online.link}</div>

          <hr className='m-1' />
        </>
      )}
    </>
  );
};

export default ManageOnline;
