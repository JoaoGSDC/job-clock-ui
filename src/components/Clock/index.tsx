import React, { useEffect, useState } from "react";
import "./styles.css";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setTime(new Date());
  }

  return (
    <>
      <div className="clock" data-testid="clock">
        {time.toLocaleTimeString()}
      </div>
    </>
  );
};

export default Clock;
