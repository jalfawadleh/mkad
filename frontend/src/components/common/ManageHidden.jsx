import { SectionForm } from "./Wrappers";

const ManageHidden = ({ hidden, editing = false, setParent }) => {
  return (
    editing && (
      <>
        <SectionForm>
          <div className='d-flex justify-content-around'>
            <input
              type='checkbox'
              className='btn-check mb-3'
              id='hidden'
              autoComplete='off'
              checked={hidden}
              onChange={() => setParent((prev) => ({ ...prev, hidden: true }))}
            />
            <label
              className='btn btn-outline-danger '
              htmlFor='hidden'
              style={{ width: 140 }}
            >
              Hide
            </label>
            <input
              type='checkbox'
              className='btn-check mb-3'
              id='public'
              autoComplete='off'
              checked={!hidden}
              onChange={() => setParent((prev) => ({ ...prev, hidden: false }))}
            />
            <label
              className='btn btn-outline-warning '
              htmlFor='public'
              style={{ width: 140 }}
            >
              public
            </label>
          </div>
        </SectionForm>
        <hr className='m-2' />
      </>
    )
  );
};

export default ManageHidden;
