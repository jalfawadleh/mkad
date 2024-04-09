import { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { HelpItem } from "./Wrappers";
import { AiOutlineClose } from "react-icons/ai";
import { Delete } from "./Icons";

/**
 * Help component.
 *
 * @param {Object} props.parent - parent object.
 * @param {function} props.setParent - function to update parent object.
 *
 * @returns {React.ReactElement} Help element.
 */
const ManageHelp = ({ help, setParent, editing = false }) => {
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
    help.push({ ...item });
    setParent((prev) => ({ ...prev, help }));
    item.text = "";
  };

  return (
    <>
      {help?.length > 0 && (
        <div className='d-inline-block m-1 p-0'>
          {help.map((h, index) => (
            <HelpItem key={index} offer={h.offer}>
              {h.text}
              {editing && (
                <span onClick={() => delItem(h)}>
                  <Delete />
                </span>
              )}
            </HelpItem>
          ))}
        </div>
      )}

      {editing && (
        <section className='container m-1 mt-2 p-1'>
          <form onSubmit={onSubmit}>
            <div className='hstack gap-2'>
              <div
                className={`p-1 btn btn-${offer ? "" : "outline-"}primary`}
                onClick={() => setItem((prev) => ({ ...prev, offer: true }))}
                style={{ width: 70 }}
              >
                Offer
              </div>
              <div
                className={`p-1 btn btn-${offer ? "outline-" : ""}success`}
                onClick={() => setItem((prev) => ({ ...prev, offer: false }))}
                style={{ width: 70 }}
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
                className='p-1 badge rounded-pill border-0 bg-primary'
              >
                <FaPlus size={20} />
              </button>
            </div>
          </form>
        </section>
      )}
      {(editing || help?.length > 0) && <hr className='my-2' />}
    </>
  );
};

export default ManageHelp;
