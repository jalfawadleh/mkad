import { SectionForm } from "./Wrappers";

const ManageDarkmode = ({ darkmode, editing = false, setParent }) => {
  return (
    editing && (
      <>
        <SectionForm>
          <div className='d-flex justify-content-around'>
            <input
              type='checkbox'
              className='btn-check mb-3'
              id='darkbtn'
              autoComplete='off'
              checked={darkmode}
              onChange={() =>
                setParent((prev) => ({ ...prev, darkmode: true }))
              }
            />
            <label
              className='btn btn-outline-info '
              htmlFor='darkbtn'
              style={{ width: 140 }}
            >
              Darkmode
            </label>

            <input
              type='checkbox'
              className='btn-check mb-3'
              id='lightbtn'
              autoComplete='off'
              checked={!darkmode}
              onChange={() =>
                setParent((prev) => ({ ...prev, darkmode: false }))
              }
            />
            <label
              className='btn btn-outline-light '
              htmlFor='lightbtn'
              style={{ width: 140 }}
            >
              Lightmode
            </label>
          </div>
        </SectionForm>
        <hr className='m-2' />
      </>
    )
  );
};

export default ManageDarkmode;
