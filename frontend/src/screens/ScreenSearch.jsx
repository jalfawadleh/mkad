import { useState } from "react";
import { Outlet } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

import { Button, Card, Form } from "react-bootstrap";

import { FaSearch } from "react-icons/fa";
import { MdTune } from "react-icons/md";
import { GiGreekTemple } from "react-icons/gi";
import { FaFlag } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import ListLinks from "../components/common/ListLinks";

const ScreenSearch = () => {
  const [results, setResults] = useState([]);

  const [query, setQuery] = useState({
    text: "",
    filter: false,
    organisations: true,
    members: true,
    activities: true,
    updates: true,
    messages: true,
  });
  const {
    text,
    filter,
    organisations,
    members,
    activities,
    messages,
    updates,
  } = query;

  const getResults = async () => {
    try {
      await axios.post("/search", query).then((res) => {
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
      <div
        className='m-2'
        style={{ maxWidth: "320px", maxHeight: window.innerHeight }}
      >
        <Card className='mb-2 border-0 bg-black' style={{ borderRadius: 25 }}>
          <Form onSubmit={onSubmit}>
            <div className='d-flex p-0 m-0'>
              <span
                className='p-1 badge rounded-pill border'
                role='button'
                onClick={() =>
                  setQuery((prevState) => ({
                    ...prevState,
                    filter: !filter,
                  }))
                }
              >
                <MdTune
                  size={28}
                  className='p-0 m-1'
                  color={filter ? "orange" : "white"}
                />
              </span>
              <Form.Control
                autoFocus={true}
                className='bg-black p-1 m-1'
                placeholder='Search'
                onChange={(e) =>
                  setQuery((prev) => ({ ...prev, text: e.target.value }))
                }
              />
              <Button
                disabled={!text}
                type='submit'
                className='p-2 m-0 bg-black rounded-pill'
              >
                <FaSearch size={28} />
              </Button>
            </div>

            <div
              className={
                filter ? "d-flex justify-content-around w-100 pt-2" : "d-none"
              }
            >
              <span
                className='p-1 badge rounded-pill border'
                role='button'
                onClick={() =>
                  setQuery((prev) => ({ ...prev, activities: !activities }))
                }
              >
                <FaFlag
                  size={24}
                  className='p-0 m-1'
                  color={activities ? "Orange" : "white"}
                />
              </span>
              <span
                className='p-1 badge rounded-pill border'
                role='button'
                onClick={() =>
                  setQuery((prev) => ({
                    ...prev,
                    organisations: !organisations,
                  }))
                }
              >
                <GiGreekTemple
                  size={24}
                  className='p-0 m-1'
                  color={organisations ? "Orange" : "white"}
                />
              </span>

              <span
                className='p-1 badge rounded-pill border'
                role='button'
                onClick={() =>
                  setQuery((prev) => ({ ...prev, members: !members }))
                }
              >
                <IoPerson
                  size={24}
                  className='p-0 m-1'
                  color={members ? "Orange" : "white"}
                />
              </span>
              {/* <span
                className='p-1 badge rounded-pill border'
                role='button'
                onClick={() =>
                  setQuery((prev) => ({ ...prev, messages: !messages }))
                }
              >
                <FaEnvelope
                  size={24}
                  className='p-0 m-1'
                  color={messages ? "Orange" : "white"}
                />
              </span>
              <span
                className='p-1 badge rounded-pill border'
                role='button'
                onClick={() =>
                  setQuery((prev) => ({ ...prev, updates: !updates }))
                }
              >
                <FaBell
                  size={24}
                  className='p-0 m-1'
                  color={updates ? "Orange" : "white"}
                />
              </span> */}
            </div>
          </Form>
        </Card>
        {results.length ? (
          <ListLinks items={results} />
        ) : (
          <Card className='ps-2 m-0 bg-black' style={{ borderRadius: 15 }}>
            <span role='button' className='p-1 m-0 bg-black rounded-circle'>
              {text ? "No results" : "Enter search query"}
            </span>
          </Card>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default ScreenSearch;
