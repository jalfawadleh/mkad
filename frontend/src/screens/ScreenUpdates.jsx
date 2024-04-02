import axios from "axios";
import { useEffect, useState } from "react";

const UpdatesScreen = () => {
  const [count, setCount] = useState(0);

  const updateCount = async () => {
    await axios.get("/members/count").then(({ data }) => setCount(data));
    setTimeout(() => updateCount(), 1000);
  };

  useEffect(() => {
    updateCount();
  }, []);

  return (
    <div className='bg-black w-100'>
      <div className='bg-black h4 text-center p-1'>Number of members</div>
      <div className='h3 m-auto p-auto text-center'>{count}</div>
    </div>
  );
};

export default UpdatesScreen;
