const ManageHidden = ({ hidden, editing = false, setParent }) => {
  return (
    editing && (
      <>
        <div className='p-1 m-1 hstack gap-2'>
          <input
            type='checkbox'
            className='btn-check mb-3'
            id='hidden'
            autoComplete='off'
            checked={hidden}
            onChange={() => setParent((prev) => ({ ...prev, hidden: !hidden }))}
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
        <hr className='m-2' />
      </>
    )
  );
};

export default ManageHidden;
