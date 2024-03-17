import axios from "axios";
import { useState } from "react";
import { Button, Card, Form, Stack } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      <div style={{ width: "300px" }}>
        <Card className='p-1 m-1' style={{ borderRadius: 10 }}>
          <Form onSubmit={onSubmit}>
            <Stack direction='horizontal' gap={2} className='p-1 m-0'>
              <Form.Control
                className='me-auto'
                placeholder='Search'
                size='sm'
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                size='sm'
                disabled={!searchText}
                type='submit'
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
              style={{ borderRadius: 10 }}
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
