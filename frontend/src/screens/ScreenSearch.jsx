import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";

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
    if (text.length > 2)
      try {
        await axios.post("/search", query).then((res) => {
          setResults(res.data).then(setFolded(false));
        });
      } catch (error) {
        error?.response?.data?.message &&
          toast.error(error?.response.data.message);
        error?.response?.status > 499 && toast.error("Something went wrong");
      }
    else setResults([]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getResults();
  };

  useEffect(() => {
    getResults();
    setFolded(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const toggleItem = (item) => {
    setQuery((prev) => ({
      ...prev,
      [Object.keys(item)]: !item[Object.keys(item)],
    }));
  };

  const toggleFilter = () => {
    setFolded(false);
    setQuery((prev) => ({ ...prev, filter: !filter }));
  };

  const topLayer = (
    <form onSubmit={onSubmit}>
      <ChocolateBar>
        <span className='p-0 m-0' onClick={() => setFolded(!folded)}>
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
          className='p-1 m-1 badge rounded-pill border border-primary'
          role='button'
          onClick={() => toggleFilter()}
        >
          <IconFilter color={filter ? "white" : "gray"} />
        </span>
        <button
          type='submit'
          disabled={!text}
          className='p-1 m-1 badge rounded-pill border bg-black border-primary'
        >
          <IconSearch color={text ? "white" : "gray"} />
        </button>
      </ChocolateBar>
    </form>
  );

  const filtersBar = (
    <ChocolateBar>
      <span
        role='button'
        className={iconWrapperClass}
        onClick={() => toggleItem({ activities })}
      >
        <IconActivity color={activities ? "white" : "gray"} />
      </span>
      <span
        className={iconWrapperClass}
        role='button'
        onClick={() => toggleItem({ organisations })}
      >
        <IconOrganisation color={organisations ? "white" : "gray"} />
      </span>

      <span
        className='p-1 m-1 rounded-pill border border-primary'
        role='button'
        onClick={() => toggleItem({ members })}
      >
        <IconMember color={members ? "white" : "gray"} />
      </span>
      <span
        className={iconWrapperClass}
        role='button'
        onClick={() => toggleItem({ messages })}
      >
        <IconMessage color={messages ? "white" : "gray"} />
      </span>
      <span
        className={iconWrapperClass}
        role='button'
        onClick={() => toggleItem({ updates })}
      >
        <IconUpdate color={updates ? "white" : "gray"} />
      </span>
    </ChocolateBar>
  );

  return (
    <>
      {topLayer}
      {!folded && filter && filtersBar}
      {!folded &&
        (results.length ? (
          <ListLinks items={results} />
        ) : (
          <ChocolateBar>
            <span role='button' className={iconWrapperClass}>
              <IconExclamation color='#dddddd' />
            </span>
            <span className='ps-0 m-auto'>
              {text.length > 2
                ? "Nothing Found"
                : "Enter search query, min 3 letters"}
            </span>
          </ChocolateBar>
        ))}
      <Outlet />
    </>
  );
};

export default ScreenSearch;
