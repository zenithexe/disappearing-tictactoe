import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialMinutes = 1, initialSeconds = 0 }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let countdown;

    if (seconds > 0 || minutes > 0) {
      countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
    }

    // Clean up the interval when the component unmounts or the timer stops
    return () => clearInterval(countdown);
  }, [seconds, minutes]);

  return (
    <div>
      <h1>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </h1>
    </div>
  );
};

export default CountdownTimer;
