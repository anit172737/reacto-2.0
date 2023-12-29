import React, { useMemo, useState } from "react";

const Newest = () => {
  const [count, setCount] = useState(0);
  const calc = useMemo(() => {
    return count * 2;
  }, [count]);
  return (
    <div>
      <h1>count : {count}</h1>
      <h1>calc : {calc}</h1>
      <button onClick={() => setCount(count + 1)}>increment</button>
    </div>
  );
};

export default Newest;
