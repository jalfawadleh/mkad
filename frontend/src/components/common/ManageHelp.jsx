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

  const iconDel = (h) => {
    return (
      <span
        role='button'
        className='d-inline m-1 p-1 badge rounded-circle bg-danger'
        onClick={() => delItem(h)}
      >
        <FaMinus size={14} className='' />
      </span>
    );
  };

  const iconHelp = (h) => {
    return (
      <div
        role='button'
        className='d-inline m-1 p-1'
        onClick={() => offerHelp(h._id)}
      >
        {isHelping ? (
          <IconSpin />
        ) : (
          <FaRegHand size={20} className='m-auto p-0' />
        )}
      </div>
    );
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
        <section className=' container '>
          Help
          {help.map((h, index) => (
            <div
              key={index}
              className='d-inline-block m-1 p-0 rounded-pill border border-primary'
            >
              <div className='d-inline p-auto m-auto text-center '>
                <span className='p-1 me-1 d-inline-block fw-bold bg-success rounded-pill rounded-end '>
                  {h.offer ? "Offered " : "Needed "}
                </span>
                <span className='d-inline p-auto m-auto text-center'>
                  {h.text}
                </span>
              </div>

              {editing ? iconDel(h) : iconHelp(h)}
            </div>
          ))}
        </section>
      )}
      {editing && (
        <div className='d-block p-1 m-1 '>
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
        </div>
      )}
      {(editing || help?.length > 0) && <hr className='d-block m-2' />}
    </>
  );
};

export default ManageHelp;
