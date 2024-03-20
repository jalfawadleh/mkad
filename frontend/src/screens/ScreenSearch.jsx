import { useState } from "react";
import { Outlet } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

import { Button, Card, Form, Stack } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { FaSearch } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa";
import ListLinks from "../components/common/ListLinks";

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

  const itemLink = (item) => {
    return (
      <Card
        className='p-0 mb-1 button bg-black'
        style={{ borderRadius: 25 }}
        key={item._id}
      >
        <Stack direction='horizontal' gap={1}>
          {item.type == "activity" ? (
            <span role='button' className='p-1 m-0 ms-auto'>
              <FaFlag size={24} />
            </span>
          ) : (
            <span role='button' className='p-1 m-0 ms-auto'>
              <img
                height='30px'
                width='30px'
                src={"https://api.multiavatar.com/" + item.name + ".png"}
                alt='Profile Photo'
              />
            </span>
          )}

          <LinkContainer to={item.type + "/" + item._id}>
            <span role='button' className='p-1 w-100 text-center fw-bold'>
              {item.name}
            </span>
          </LinkContainer>

          <span role='button' className='p-2 m-0 ms-auto'>
            <FaLocationCrosshairs size={24} />
          </span>
        </Stack>
      </Card>
    );
  };

  return (
    <>
      <div
        className='m-2'
        style={{ maxWidth: "320px", maxHeight: window.innerHeight }}
      >
        <Card className='mb-2 border-0 bg-black' style={{ borderRadius: 25 }}>
          <Form onSubmit={onSubmit}>
            <Stack direction='horizontal' gap={0} className='p-0 m-0'>
              <Form.Control
                autoFocus={true}
                className='me-auto rounded-pill bg-black border-0 shadow-none ps-3'
                placeholder='Search'
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                disabled={!searchText}
                type='submit'
                className='rounded-circle pe-2 bg-black border-0'
              >
                <FaSearch size={24} />
              </Button>
            </Stack>
          </Form>
        </Card>
        {results.length ? (
          <ListLinks items={results} />
        ) : (
          <Card className='ps-2 m-0 bg-black' style={{ borderRadius: 15 }}>
            <span role='button' className='p-1 m-0 bg-black rounded-circle'>
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
