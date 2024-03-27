import { useState } from "react";
import { Outlet } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

import { Card, Form } from "react-bootstrap";

import {
  ListLinks,
  ChocolateBar,
  IconActivity,
  IconOrganisation,
  iconWrapperClass,
  IconMember,
  IconMessage,
  IconUpdate,
  IconFold,
  IconFilter,
  IconSearch,
  IconExclamation,
  Icon,
} from "../components/common/LinkItems";

const ScreenSearch = () => {
  const [results, setResults] = useState([]);
  const [folded, setFolded] = useState(false);

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
        setResults(res.data).then(setFolded(false));
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
    <Form onSubmit={onSubmit}>
      <ChocolateBar>
        <span
          className='p-1 m-1 badge rounded-pill border'
          role='button'
          onClick={() => setFolded(!folded)}
        >
          <IconFold color={folded ? "white" : "gray"} />
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
        <span
          className='p-1 m-1 badge rounded-pill border'
          role='button'
          onClick={() => setQuery((prev) => ({ ...prev, filter: !filter }))}
        >
          <IconFilter color={filter ? "white" : "gray"} />
        </span>
        <button
          type='submit'
          disabled={!text}
          className='p-1 m-1 badge rounded-pill border'
        >
          <IconSearch color={text ? "white" : "gray"} />
        </button>
      </ChocolateBar>
    </Form>
  );

  const filtersLayer = (
    <ChocolateBar>
      <span
        role='button'
        className={iconWrapperClass}
        onClick={() =>
          setQuery((prev) => ({ ...prev, activities: !activities }))
        }
      >
        <IconActivity color={activities ? "white" : "gray"} />
      </span>
      <span
        className={iconWrapperClass}
        role='button'
        onClick={() =>
          setQuery((prev) => ({ ...prev, organisations: !organisations }))
        }
      >
        <IconOrganisation color={organisations ? "white" : "gray"} />
      </span>

      <span
        className='p-1 m-1 rounded-pill border border-primary-settle'
        role='button'
        onClick={() => setQuery((prev) => ({ ...prev, members: !members }))}
      >
        <IconMember color={members ? "white" : "gray"} />
      </span>
      <span
        className={iconWrapperClass}
        role='button'
        onClick={() => setQuery((prev) => ({ ...prev, messages: !messages }))}
      >
        <IconMessage color={messages ? "white" : "gray"} />
      </span>
      <span
        className={iconWrapperClass}
        role='button'
        onClick={() => setQuery((prev) => ({ ...prev, updates: !updates }))}
      >
        <IconUpdate color={updates ? "white" : "gray"} />
      </span>
    </ChocolateBar>
  );

  return (
    <>
      {topLayer}
      {!folded && filter && filtersLayer}
      {!folded &&
        (results.length ? (
          <ListLinks items={results} />
        ) : (
          !text && (
            <ChocolateBar>
              <Icon>
                <IconExclamation color='white' />
              </Icon>
              <span role='button' className='text-center p-auto m-auto'>
                Enter search query
              </span>
            </ChocolateBar>
          )
        ))}

      <Outlet />
    </>
  );
};

export default ScreenSearch;
