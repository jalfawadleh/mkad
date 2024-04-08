import { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaRegHand } from "react-icons/fa6";
import { IconSpin } from "./LinkItems";

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

  const [isHelping, setIsHelping] = useState(false);

  const offerHelp = async (id) => {
    setIsHelping(true);
    await axios
      .post(`/help`, { itemType: parent.type, itemId: parent._id, id })
      .then((res) => setParent({ ...parent, help: [res.data] }))
      .then(() => setIsHelping(false))
      .catch((error) => {
        error?.response?.data?.message &&
          toast.error(error?.response.data.message);
        error?.response?.status > 499 && toast.error("Something went wrong");
      });
  };

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
    setItem({ text: "", offer: true });
  };

  return (
    <>
      {help?.length > 0 && (
        <section className='container m-1 p-0'>
          Help
          {help.map((h, index) => (
            <div
              key={index}
              className='d-inline-block m-1 p-0 rounded-pill border border-primary'
            >
              <span className='m-0 p-1 ps-2 bg-success rounded-pill rounded-end '>
                {h.offer ? "Offered " : "Needed "}
              </span>
              <span className='m-0 p-1'>{h.text}</span>
              {editing ? (
                <span
                  role='button'
                  className='m-0 p-1 rounded-pill rounded-start bg-danger text-center'
                  onClick={() => delItem(h)}
                >
                  <FaMinus size={16} className='m-0 p-0' />
                </span>
              ) : (
                <span
                  role='button'
                  className='m-0 p-1 rounded-pill rounded-start bg-success text-center'
                  onClick={() => offerHelp(h._id)}
                >
                  {isHelping ? (
                    <IconSpin />
                  ) : (
                    <FaRegHand size={16} className='m-0 p-0' />
                  )}
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
              <div
                className={`p-1 btn btn-${offer ? "" : "outline-"}success`}
                onClick={() => setItem((prev) => ({ ...prev, offer: true }))}
                style={{ width: 70 }}
              >
                Offered
              </div>
              <div
                className={`p-1 btn btn-${offer ? "outline-" : ""}success`}
                onClick={() => setItem((prev) => ({ ...prev, offer: false }))}
                style={{ width: 70 }}
              >
                Needed
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
