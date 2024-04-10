import { useState } from "react";

import { Language, Section, SectionForm } from "./Wrappers";
import { FaPlus } from "react-icons/fa";
import { Delete } from "./Icons";

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
        <Section>
          {languages.map((l, index) => (
            <Language key={index}>
              {l.name}
              {editing && (
                <span onClick={() => delItem(l)}>
                  <Delete />
                </span>
              )}
            </Language>
          ))}
        </Section>
      )}

      {editing && (
        <SectionForm>
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
                className='m-0 p-1 badge border-0 text-bg-primary'
              >
                <FaPlus size={20} />
              </button>
            </div>
          </form>
        </SectionForm>
      )}
      {(editing || languages?.length > 0) && <hr className='my-2' />}
    </>
  );
};

export default ManageLanguages;
