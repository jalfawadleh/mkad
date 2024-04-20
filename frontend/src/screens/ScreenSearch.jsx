import { useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { Bar } from "../components/common/Wrappers";
import {
  ActivityCircle,
  FoldCircle,
  LocationCircle,
  MembersCircle,
  OrganisationCircle,
  FilterCircle,
  SearchCircle,
  SpinnerCircle,
  ExclamationCircle,
  LocationCircleLink,
  AvatarLink,
  ActivityCircleLink,
  OrganisationCircleLink,
} from "../components/common/Icons";
import { IconLinkCenterText } from "../components/common/LinkItems";

const ScreenSearch = () => {
  const [results, setResults] = useState([]);
  const [places, setPlaces] = useState([]);

  const [isGettingResults, setIsGettingResults] = useState(false);
  const [isGettingPlaces, setIsGettingPlaces] = useState(false);

  const [folded, setFolded] = useState(false);

  const [query, setQuery] = useState({
    text: "",
    filter: true,
    locations: false,
    organisations: true,
    members: true,
    activities: true,
    updates: true,
    messages: true,
  });
  const { text, filter, locations, organisations, members, activities } = query;

  const getResults = async () => {
    if (text.length > 2) {
      setIsGettingResults(true);
      await axios
        .post("/search", query)
        .then((res) => setResults(res.data))
        .then(() => setFolded(false))
        .then(() => setIsGettingResults(false))
        .catch((error) => {
          if (error?.response?.data?.message)
            toast.error(error?.response.data.message);
          if (error?.response?.status > 499) {
            toast.error("Something went wrong!");
            console.log("system down");
          }
        });
    } else setResults([]);
  };

  const getPlaces = async () => {
    setIsGettingPlaces(true);
    await axios
      .get(
        `https://nominatim.openstreetmap.org/search?q=${query.text}&format=json&addressdetails=1&limit=5`
      )
      .then(({ data }) =>
        setPlaces(
          data.map((place) => ({
            _id: place.place_id,
            name: place.name + ", " + place.address.country,
            type: "location",
            location: { lat: place.lat, lng: place.lon },
          }))
        )
      )
      .then(() => setFolded(false))
      .then(() => setIsGettingPlaces(false))
      .catch((error) => {
        if (error?.response?.data?.message)
          toast.error(error?.response.data.message);
        if (error?.response?.status > 499) {
          toast.error("Something went wrong!");
          console.log("system down");
        }
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setResults([]);
    getResults();

    setPlaces([]);
    if (locations) getPlaces();
  };

  // useEffect(() => {
  //   setPlaces([]);
  //   getResults();
  //   setFolded(false);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [organisations, members, activities, messages, updates]);

  // useEffect(() => {
  //   setPlaces([]);
  //   getPlaces();
  //   setFolded(false);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [locations]);

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

  const ListLinks = ({ items }) => {
    return (
      items.length &&
      items.map((item) => (
        <Bar key={item._id}>
          {
            {
              location: <LocationCircleLink location={item.location} />,
              member: <AvatarLink name={item.name} id={item._id} />,
              activity: <ActivityCircleLink id={item._id} />,
              organisation: <OrganisationCircleLink id={item._id} />,
            }[item.type]
          }

          <IconLinkCenterText item={item} />
          <LocationCircleLink location={item.location} />
        </Bar>
      ))
    );
  };

  const topLayer = (
    <form onSubmit={onSubmit}>
      <Bar>
        <span onClick={() => setFolded(!folded)}>
          <FoldCircle color={folded ? "white" : "gray"} />
        </span>
        <input
          size='sm'
          autoFocus={true}
          className='form-control form-control-sm bg-black p-1 m-1'
          placeholder='Search'
          value={text}
          onChange={(e) =>
            setQuery((prev) => ({ ...prev, text: e.target.value }))
          }
          style={{ fontSize: 16 }}
        />
        <span role='button' onClick={() => toggleFilter()}>
          <FilterCircle color={filter ? "white" : "gray"} />
        </span>

        <button
          type='submit'
          disabled={text.length < 3}
          className='m-0 p-0 border-0 bg-black rounded-circle'
        >
          {isGettingPlaces || isGettingResults ? (
            <SpinnerCircle />
          ) : (
            <SearchCircle color={text.length > 3 ? "white" : "gray"} />
          )}
        </button>
      </Bar>
    </form>
  );

  const filtersBar = (
    <Bar>
      <span role='button' onClick={() => toggleItem({ locations })}>
        <LocationCircle color={locations ? "white" : "gray"} />
      </span>
      <span role='button' onClick={() => toggleItem({ activities })}>
        <ActivityCircle color={activities ? "white" : "gray"} />
      </span>
      <span role='button' onClick={() => toggleItem({ organisations })}>
        <OrganisationCircle color={organisations ? "white" : "gray"} />
      </span>
      <span role='button' onClick={() => toggleItem({ members })}>
        <MembersCircle color={members ? "white" : "gray"} />
      </span>
    </Bar>
  );

  return (
    <>
      {topLayer}
      {!folded && filter && filtersBar}
      <div
        className='overflow-auto'
        style={{ maxHeight: window.innerHeight - 150 }}
      >
        {!folded && places.length ? <ListLinks items={places} /> : ""}
        {!folded && results.length ? <ListLinks items={results} /> : ""}
        {!folded && !places.length && !results.length && (
          <Bar>
            <ExclamationCircle />
            <span className='m-auto'>Enter search query, min 3 letters</span>
          </Bar>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default ScreenSearch;
