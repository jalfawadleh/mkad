import { SectionForm } from "./Wrappers";

const ManageHidden = ({ hidden, editing = false, setParent }) => {
  return (
    editing && (
      <>
        <SectionForm>
          <div className='hstack gap-2'>
            <input
              type='checkbox'
              className='btn-check mb-3'
              id='hidden'
              autoComplete='off'
              checked={hidden}
              onChange={() =>
                setParent((prev) => ({ ...prev, hidden: !hidden }))
              }
            />
            <label
              className='btn btn-outline-warning '
              htmlFor='hidden'
              style={{ width: 140 }}
            >
              Hide
            </label>
            <div className='m-auto text-warning'>
              {hidden ? "Hidden" : "Public"}
            </div>
          </div>
        </SectionForm>
        <hr className='m-2' />
      </>
    )
  );
};

export default ManageHidden;
