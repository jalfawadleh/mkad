import { Section, SectionForm } from "./Wrappers";

/**
 * Help component.
 *
 * @param {Object} props.name - Item Name.
 * @param {Boolian} props.editing - if the field to be edited.
 * @param {function} props.setParent - function to update parent object.
 *
 * @returns {React.ReactElement} ManageText element.
 */
const ManageName = ({ name, setParent, editing = false }) => {
  return (
    editing && (
      <>
        <SectionForm>
          <div className='form-floating'>
            <input
              type='text'
              className='form-control'
              id='name'
              placeholder='Name'
              name='name'
              value={name}
              onChange={(e) =>
                setParent((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
            <label htmlFor='name'>Name</label>
          </div>
        </SectionForm>
        <hr className='my-2' />
      </>
    )
  );
};

export default ManageName;
