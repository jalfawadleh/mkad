import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HelpItem, Section, SectionForm } from "./Wrappers";
import { Delete } from "./Icons";

/**
 * Help component.
 *
 * @param {Object} props.help - help object.
 * @param {function} props.setParent - function to update parent object.
 * @param {Boolean} props.editing - editing object.
 *
 * @returns {React.ReactElement} Help element.
 */
const ManageHelp = ({ help = [], setParent, editing = false }) => {
  const [item, setItem] = useState({ text: "", offer: true });
  const { text, offer } = item;

  const delItem = (t) => {
    setParent((prev) => ({
      ...prev,
      help: help.filter((h) => h.text !== t.text),
    }));
    // putParent();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setParent((prev) => ({ ...prev, help: [...help, { ...item }] }));
    setItem((prev) => ({ ...prev, text: "" }));
  };

  return (
    <>
      {help?.length > 0 && (
        <Section>
          {help.map((h) => (
            <HelpItem key={h.text} offer={h.offer}>
              {h.text}
              {editing && (
                <span onClick={() => delItem(h)}>
                  <Delete />
                </span>
              )}
            </HelpItem>
          ))}
        </Section>
      )}

      {editing && (
        <SectionForm>
          <form onSubmit={onSubmit}>
            <div className='hstack gap-2'>
              <div
                className={`m-0 p-1 btn btn-${offer ? "" : "outline-"}primary`}
                onClick={() => setItem((prev) => ({ ...prev, offer: true }))}
              >
                Offer
              </div>
              <div
                className={`p-1 btn btn-${offer ? "outline-" : ""}success`}
                onClick={() => setItem((prev) => ({ ...prev, offer: false }))}
              >
                Need
              </div>

              <input
                placeholder={"Enter help " + (offer ? "offered" : "needed")}
                value={text}
                onChange={(e) =>
                  setItem((prev) => ({ ...prev, text: e.target.value }))
                }
                type='text'
                className='form-control form-control-sm'
              />
              <button
                type='submit'
                disabled={!text}
                role='button'
                className='m-0 p-1 badge border-0 text-bg-primary'
              >
                <FaPlus size={20} />
              </button>
            </div>
          </form>
        </SectionForm>
      )}
      {(editing || help?.length > 0) && <hr className='my-2' />}
    </>
  );
};

export default ManageHelp;
