import { useState } from "react";

import { Language } from "./Wrappers";
import { FaPlus } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

/**
 * Languages component.
 *
 * @param {Object} props.languages - languages object.
 * @param {Function} props.setParent - function to update parent object.
 * @param {Boolean} props.editing - editing object default false.
 *
 * @returns {React.ReactElement} languages element.
 */
const ManageLanguages = ({ languages = [], setParent, editing = false }) => {
  const [language, setLanguage] = useState({ name: "" });

  const delItem = (l) => {
    setParent((prev) => ({
      ...prev,
      languages: languages.filter((language) => language.name !== l.name),
    }));
    // putParent();languages
  };

  const onSubmit = (e) => {
    e.preventDefault();
    languages.push({ ...language });
    setParent((prev) => ({ ...prev, languages }));
    setLanguage({ name: "" });
  };

  return (
    <>
      {languages?.length > 0 && (
        <section className='container m-1 p-0'>
          {languages.map((l, index) => (
            <Language key={index}>
              {l.name}
              {editing && (
                <span
                  role='button'
                  className='d-inline m-0 ms-1 p-0 bg-danger'
                  onClick={() => delItem(l)}
                >
                  <AiOutlineClose size={16} className='m-0 p-0' />
                </span>
              )}
            </Language>
          ))}
        </section>
      )}

      {editing && (
        <section className='container m-1 mt-2 p-1'>
          <form onSubmit={onSubmit}>
            <div className='hstack gap-2'>
              <input
                placeholder='Enter Language'
                value={language.name}
                onChange={(e) =>
                  setLanguage((prev) => ({ ...prev, name: e.target.value }))
                }
                type='text'
                className='form-control form-control-sm'
              />
              <button
                type='submit'
                disabled={!language.name}
                role='button'
                className='p-1 badge rounded-pill border-0 bg-primary'
              >
                <FaPlus size={20} />
              </button>
            </div>
          </form>
        </section>
      )}
      {(editing || languages?.length > 0) && <hr className='my-2' />}
    </>
  );
};

export default ManageLanguages;
