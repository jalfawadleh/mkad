import { Link } from "react-router-dom";
import { SectionForm } from "./Wrappers";

const ManageOnline = ({ online, setParent, editing = false }) => {
  return (
    <>
      {editing ? (
        <>
          <SectionForm>
            <div className='hstack gap-2'>
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
          </SectionForm>
          {online.value && (
            <SectionForm>
              <div className='form-floating'>
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
            </SectionForm>
          )}
        </>
      ) : (
        online.value && (
          <SectionForm>
            <div className='p-0 m-1 w-100 d-flex justofy-contents-between'>
              <div className='p-1 ps-2 my-auto text-start rounded-start-pill bg-primary'>
                Join Online
              </div>
              <Link
                to={location.link}
                target='_blank'
                className='p-1 m-auto link-underline link-underline-opacity-0 border border-1 border-primary text-light'
              >
                Open Link
              </Link>
              <div
                role='button'
                className='p-1 m-auto  border border-1 border-primary text-light'
                onClick={() => {
                  navigator.clipboard.writeText(online.link);
                }}
              >
                Copy Link
              </div>
            </div>
            <div className='p-2 mt-2 small'>{online.link}</div>
          </SectionForm>
        )
      )}
      {(editing || online.value) && <hr className='my-2' />}
    </>
  );
};

export default ManageOnline;
