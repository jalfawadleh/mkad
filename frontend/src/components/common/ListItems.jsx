import { useState } from "react";
import { Form, Stack, Badge, Button, Card } from "react-bootstrap";

const ListItems = ({
  message = "",
  type,
  title,
  items,
  setParent,
  edit = false,
}) => {
  const [item, setItem] = useState("");

  const addItem = () => {
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
    <div className='border mb-3 p-2'>
      <Card.Text className='text-center'>{message}</Card.Text>
      <Stack direction='horizontal' gap={2} className='mb-1'>
        {items &&
          items.map((i, index) => (
            <Badge key={index} pill bg='secondary'>
              {i.name}
              {edit && (
                <Badge
                  pill
                  bg='danger'
                  className='ms-1'
                  onClick={() => delItem(i)}
                  style={{ cursor: "pointer" }}
                >
                  X
                </Badge>
              )}
            </Badge>
          ))}
      </Stack>
      {edit && (
        <Stack direction='horizontal' gap={2}>
          <Form.Control
            type='text'
            placeholder={"Enter " + title}
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />

          <Button disabled={!item} onClick={() => addItem()}>
            +
          </Button>
        </Stack>
      )}
    </div>
  );
};

export default ListItems;
