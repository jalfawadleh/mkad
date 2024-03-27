import { useState } from "react";
import { Outlet } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

import { Card, Form } from "react-bootstrap";

import { FaSearch } from "react-icons/fa";
// import { MdTune } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { RiArrowUpDownFill } from "react-icons/ri";
import { ListLinks } from "../components/common/Wrapers";

const ScreenSearch = () => {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(true);

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
    // filter,
    organisations,
    members,
    activities,
    messages,
    updates,
  } = query;

  const getResults = async () => {
    try {
      await axios.post("/search", query).then((res) => {
        setResults(res.data).then(setShowResults(true));
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

  const topLayer = (
    <div className='d-flex m-0 p-0'>
      <span
        className='p-1 m-1 badge rounded-pill border'
        role='button'
        onClick={() => setShowResults(!showResults)}
      >
        <RiArrowUpDownFill
          size={24}
          className='p-0 m-0'
          color={!showResults ? "white" : "gray"}
        />
      </span>
      <Form.Control
        autoFocus={true}
        className='bg-black p-1 m-1'
        placeholder='Search'
        size='sm'
        onChange={(e) =>
          setQuery((prev) => ({ ...prev, text: e.target.value }))
        }
      />
      {/* <span
        className='p-1 m-1 badge rounded-pill border'
        role='button'
        onClick={() => setQuery((prev) => ({ ...prev, filter: !filter }))}
      >
        <MdTune
          size={24}
          className='p-0 m-0'
          color={filter ? "white" : "gray"}
        />
      </span> */}
      <span
        role='button'
        disabled={!text}
        className='p-1 m-1 badge rounded-pill border'
      >
        <FaSearch
          size={24}
          className='p-0 m-0'
          color={text ? "white" : "gray"}
        />
      </span>
    </div>
  );

  const filtersLayer = (
    <div className='d-flex justify-content-between w-100 '>
      <span
        className='p-1 m-1 badge rounded-pill border'
        role='button'
        onClick={() =>
          setQuery((prev) => ({ ...prev, activities: !activities }))
        }
      >
        <FaFlag
          size={24}
          className='p-0 m-0'
          color={activities ? "white" : "gray"}
        />
      </span>
      <span
        className='p-1 m-1 badge rounded-pill border'
        role='button'
        onClick={() =>
          setQuery((prev) => ({ ...prev, organisations: !organisations }))
        }
      >
        <FaHouseUser
          size={24}
          className='p-0 m-0'
          color={organisations ? "white" : "gray"}
        />
      </span>

      <span
        className='p-1 m-1 badge rounded-pill border'
        role='button'
        onClick={() => setQuery((prev) => ({ ...prev, members: !members }))}
      >
        <IoPerson
          size={24}
          className='p-0 m-0'
          color={members ? "white" : "gray"}
        />
      </span>
      <span
        className='p-1 m-1 badge rounded-pill border'
        role='button'
        onClick={() => setQuery((prev) => ({ ...prev, messages: !messages }))}
      >
        <FaEnvelope
          size={24}
          className='p-0 m-0'
          color={messages ? "white" : "gray"}
        />
      </span>
      <span
        className='p-1 m-1 badge rounded-pill border'
        role='button'
        onClick={() => setQuery((prev) => ({ ...prev, updates: !updates }))}
      >
        <FaBell
          size={24}
          className='p-0 m-0'
          color={updates ? "white" : "gray"}
        />
      </span>
    </div>
  );

  return (
    <>
      <div className='mb-2 border-0 bg-black' style={{ borderRadius: 20 }}>
        <Form onSubmit={onSubmit}>
          {topLayer}
          {showResults && filtersLayer}
        </Form>
      </div>
      {showResults &&
        (results.length ? (
          <ListLinks items={results} />
        ) : (
          !text && (
            <Card
              className='mb-2 border-0 bg-black'
              style={{ borderRadius: 20 }}
            >
              <div className={"d-flex justify-content-between w-100"}>
                <span
                  role='button'
                  className='p-1 m-1 bg-black rounded-pill border border-light-subtle'
                >
                  <FaExclamationCircle size={24} className='p-0 m-0' />
                </span>

                <span
                  role='button'
                  className='p-1 w-100 text-center p-auto m-auto'
                >
                  Enter search query
                </span>
              </div>
            </Card>
          )
        ))}

      <Outlet />
    </>
  );
};

export default ScreenSearch;
