import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Interest, Section, SectionForm } from "./Wrappers";
import { Delete } from "./Icons";

/**
 * Interests component.
 *
 * @param {Object} props.interests - interests object.
 * @param {function} props.setParent - function to update parent object.
 * @param {object} props.editing - editing object default false.
 *
 * @returns {React.ReactElement} Interests element.
 */
const ManageInterests = ({ interests = [], setParent, editing = false }) => {
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
    setParent((prev) => ({ ...prev, interests: [...interests, { ...interest }] }));
    setInterest({ name: "" });
  };

  return (
    <>
      {interests?.length > 0 && (
        <Section>
          {interests.map((i) => (
            <Interest key={i.name}>
              {i.name}
              {editing && (
                <span onClick={() => delItem(i)}>
                  <Delete />
                </span>
              )}
            </Interest>
          ))}
        </Section>
      )}

      {editing && (
        <SectionForm>
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
                className='m-0 p-1 badge border-0 text-bg-primary'
              >
                <FaPlus size={20} />
              </button>
            </div>
          </form>
        </SectionForm>
      )}
      {(editing || interests?.length > 0) && <hr className='my-2' />}
    </>
  );
};

export default ManageInterests;
