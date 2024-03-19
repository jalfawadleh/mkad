import { useState } from "react";
import { Outlet } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

import { Button, Card, Form, Stack } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { FaSearch } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";

const ScreenSearch = () => {
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
      <div style={{ maxWidth: "320px", maxHeight: window.innerHeight }}>
        <Card
          className='p-0 mb-2 border border-primary'
          style={{
            borderRadius: 25,
          }}
        >
          <Form onSubmit={onSubmit}>
            <Stack direction='horizontal' gap={0} className='p-0 m-0'>
              <Form.Control
                autoFocus={true}
                className='me-auto rounded-pill border-0'
                placeholder='Search'
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                disabled={!searchText}
                type='submit'
                variant='dark'
                className='rounded-circle pe-2'
              >
                <FaSearch size={28} />
              </Button>
            </Stack>
          </Form>
        </Card>
        {results ? (
          results.map((result) => (
            <Card
              className='p-0 m-1 button'
              style={{ borderRadius: 25 }}
              key={result._id}
            >
              <Stack direction='horizontal' gap={1}>
                <span role='button' className='p-0 m-0 ms-auto'>
                  <img
                    height='35px'
                    width='35px'
                    src={
                      result.type == "activity"
                        ? "./flag.svg"
                        : "https://api.multiavatar.com/" + result.name + ".png"
                    }
                    alt='Profile Photo'
                  />
                </span>

                <LinkContainer to={result.type + "/" + result._id}>
                  <span role='button' className='p-1 w-100 text-center fw-bold'>
                    {result.name}
                  </span>
                </LinkContainer>

                <span role='button' className='p-1 m-0 ms-auto'>
                  <FaLocationCrosshairs size={30} />
                </span>
              </Stack>
            </Card>
          ))
        ) : (
          <Card className='p-1 m-1' style={{ borderRadius: 15 }}>
            <span role='button'>
              {searchText ? "No results" : "Enter search query"}
            </span>
          </Card>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default ScreenSearch;
