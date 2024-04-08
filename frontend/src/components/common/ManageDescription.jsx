/**
 * Help component.
 *
 * @param {Object} props.name - Item Name.
 * @param {Boolian} props.editing - if the field to be edited.
 * @param {function} props.setParent - function to update parent object.
 *
 * @returns {React.ReactElement} ManageText element.
 */
const ManageDescription = ({ description, setParent, editing = false }) => {
  return (
    <>
      {editing ? (
        <section className='container m-1 p-1'>
          <div className='form-floating'>
            <input
              type='text'
              className='form-control'
              id='discription'
              placeholder='Description'
              name='description'
              value={description}
              onChange={(e) =>
                setParent((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <label htmlFor='discription'>Description</label>
          </div>
        </section>
      ) : (
        description && (
          <section className='container m-1 p-1 d-flex justify-content-wrap'>
            {description}
          </section>
        )
      )}
      <hr className='my-2' />
    </>
  );
};

export default ManageDescription;
