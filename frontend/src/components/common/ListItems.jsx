import { useState } from "react";
const ListItems = ({
  message = "",
  type,
  title,
  items,
  setParent,
  edit = false,
}) => {
  const [item, setItem] = useState("");

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

  return (
    <>
      {items?.length > 0 && (
        <div className='p-1 m-1 inline-block'>
          <span className='font-weight-bold m-2'>{message}</span>
          {items.map((i, index) => (
            <span key={index} className='m-1 bg-black'>
              <span className='m-1 text-light'>{i.name}</span>
              {edit && (
                <span
                  role='button'
                  className='p-1 badge rounded-pill bg-danger'
                  onClick={() => delItem(i)}
                >
                  X
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
