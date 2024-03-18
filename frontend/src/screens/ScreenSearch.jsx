import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

import { Button, Card, Form, Stack } from "react-bootstrap";

const ScreenSearch = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);

  const getResults = async () => {
    try {
      await axios.get(`search/${searchText}`).then((res) => {
        setResults(res.data);
      });
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getResults();
  };

  return (
    <>
      <div style={{ maxWidth: "400px", maxHeight: window.innerHeight }}>
        <Card
          className='p-1 mb-2'
          style={{
            borderRadius: 15,
            borderWidth: 1,
            borderColor: "whitesmoke",
          }}
        >
          <Form onSubmit={onSubmit}>
            <Stack direction='horizontal' gap={2} className='p-1 m-0'>
              <Form.Control
                autoFocus={true}
                className='me-auto border-0'
                placeholder='Search'
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                disabled={!searchText}
                type='submit'
                size={"sm"}
                variant='primary'
              >
                Search
              </Button>
            </Stack>
          </Form>
        </Card>
        {results &&
          results.map((result) => (
            <Card
              key={result._id}
              className='p-1 m-1'
              style={{ borderRadius: 15 }}
              onClick={() => navigate(result.type + "/" + result._id)}
            >
              <span role='button'>{result.name}</span>
            </Card>
          ))}
      </div>
      <Outlet />
    </>
  );
};

export default ScreenSearch;
