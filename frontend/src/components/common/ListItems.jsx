import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";

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
        <>
          <div className='p-1 m-1 inline-block'>
            <span className='font-weight-bold m-2'>{message}</span>
            {items.map((i, index) => (
              <Badge key={index} pill bg='dark' className='m-1 p-0'>
                <span className='p-0 m-1 text-light'>{i.name}</span>
                {edit && (
                  <Badge
                    pill
                    bg='danger'
                    className='p-1 m-0'
                    onClick={() => delItem(i)}
                    style={{ cursor: "pointer" }}
                  >
                    X
                  </Badge>
                )}
              </Badge>
            ))}
          </div>
        </>
      )}
      {edit && (
        <>
          <div className='p-1 m-1 inline-block'>
            <form onSubmit={onSubmit}>
              <Stack direction='horizontal' gap={2}>
                <Form.Control
                  type='text'
                  placeholder={"Enter " + title}
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  size='sm'
                />

                <Button disabled={!item} size='sm' type='submit'>
                  +
                </Button>
              </Stack>
            </form>
          </div>
        </>
      )}
      {items?.length > 0 && <hr className='m-1' />}
    </>
  );
};

export default ListItems;
