import { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import { FaRegHand } from "react-icons/fa6";
import { IconSpin } from "./LinkItems";

const ListItems = ({
  message = "",
  type,
  title,
  items,
  parent = [],
  setParent,
  edit = false,
  canHelp = false,
}) => {
  const [item, setItem] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const offerHelp = async () => {
    setIsLoading(true);

    await axios
      .get(`/activities/join/${id}`)
      .then((res) => setActivity(res.data))
      .then(() => setIsLoading(false))
      .catch((error) => {
        error?.response?.data?.message &&
          toast.error(error?.response.data.message);
        error?.response?.status > 499 && toast.error("Something went wrong");
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    items.push({ name: item });

    setParent((prevState) => ({
      ...prevState,
      [type]: items,
    }));
    setItem("");
  };

  const delItem = (t) => {
    const temp = items.filter((i) => i.name !== t.name);

    setParent((prevState) => ({
      ...prevState,
      [type]: temp,
    }));
  };

  const onHelp = (id) => {
    alert("offerHelp");
  };

  return (
    <>
      {items?.length > 0 && (
        <div className='p-1 m-1 inline-block'>
          <span className='font-weight-bold m-0 h5'>{message}:</span>
          {items.map((i, index) => (
            <span key={index} className='m-1 bg-dark'>
              <span className='m-1 bg-gray text-light'>{i.name}</span>

              {edit ? (
                <span
                  role='button'
                  className='p-1 badge rounded-pill bg-danger'
                  onClick={() => delItem(i)}
                >
                  X
                </span>
              ) : (
                <span className='m-1 text-light'>
                  <span
                    className='p-1 m-1 badge rounded-pill border border-primary'
                    role='button'
                    onClick={() => offerHelp()}
                  >
                    {isLoading ? <IconSpin /> : <FaRegHand size={20} />}
                  </span>
                </span>
              )}
            </span>
          ))}
        </div>
      )}
      {edit && (
        <div className='p-1 m-1 inline-block'>
          <form onSubmit={onSubmit}>
            <div className='hstack gap-2'>
              <input
                placeholder={"Enter " + title}
                value={item}
                onChange={(e) => setItem(e.target.value)}
                type='text'
                className='form-control form-control-sm'
              />
              <button
                type='submit'
                disabled={!item}
                className='btn btn-primary btn-sm'
              >
                +
              </button>
            </div>
          </form>
        </div>
      )}
      {items?.length > 0 && <hr className='m-1' />}
    </>
  );
};

export default ListItems;
