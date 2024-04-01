import axios from "axios";
import { useState } from "react";

const UpdatesScreen = () => {
  const [results, setResults] = useState([]);

  const getResults = async () => {
    await axios.get("/members/count").then((res) => setResults(res));
  };
  let x = 0;
  const updateCount = () => {
    x++;
    getResults();
    if (x < 10) setTimeout(updateCount(), 20000); // Change image every 2 seconds
  };

  updateCount();

  return (
    <>
      <div>Updates</div>
      <div className='h3 m-auto'>{results.data}</div>
    </>
  );
};

export default UpdatesScreen;
