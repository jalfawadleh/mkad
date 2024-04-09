import { useState } from "react";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

/**
 * Interests component.
 *
 * @param {Object} props.interests - interests object.
 * @param {function} props.setParent - function to update parent object.
 * @param {object} props.editing - editing object default false.
 *
 * @returns {React.ReactElement} Interests element.
 */
const ManageInterests = ({ interests, setParent, editing = false }) => {
  const [interest, setInterest] = useState({ name: "" });

  const delItem = (i) => {
    setParent((prev) => ({
      ...prev,
      interests: interests.filter((interest) => interest.name !== i.name),
    }));
    // putParent();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    interests.push({ ...interest });
    setParent((prev) => ({ ...prev, interests }));
    setInterest({ name: "" });
  };

  return (
    <>
      {interests?.length > 0 && (
        <section className='container m-1 p-0'>
          Interests
          {interests.map((i, index) => (
            <div
              key={index}
              className='d-inline-block m-1 p-0 rounded-pill border border-primary'
            >
              <span className='m-0 p-1'>{i.name}</span>
              {editing && (
                <span
                  role='button'
                  className='m-0 p-1 rounded-pill rounded-start bg-danger text-center'
                  onClick={() => delItem(i)}
                >
                  <FaMinus size={16} className='m-0 p-0' />
                </span>
              )}
            </div>
          ))}
        </section>
      )}

      {editing && (
        <section className='container m-1 mt-2 p-1'>
          <form onSubmit={onSubmit}>
            <div className='hstack gap-2'>
              <input
                placeholder='Enter Interest'
                value={interest.name}
                onChange={(e) =>
                  setInterest((prev) => ({ ...prev, name: e.target.value }))
                }
                type='text'
                className='form-control form-control-sm'
              />
              <button
                type='submit'
                disabled={!interest.name}
                role='button'
                className='p-1 badge rounded-pill border-0 bg-primary'
              >
                <FaPlus size={20} />
              </button>
            </div>
          </form>
        </section>
      )}
      {(editing || interests?.length > 0) && <hr className='my-2' />}
    </>
  );
};

export default ManageInterests;
