import React, { useEffect, useState } from 'react';

const Timer = ({ timeLeftInMs }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timeLeftInMs));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft(timeLeftInMs));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timeLeftInMs]);

  function calculateTimeLeft(time) {
    const now = Date.now();
    if (!time) return null
    
    const difference = time - now;

    if (difference <= 0){
        return "Expired"
    }

    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    let outputString = "";

    if (hours > 0) outputString += hours + "h" + " ";
    if (minutes % 60 > 0) outputString += (minutes % 60) + "m" + " ";
    outputString += seconds + "s";

    return outputString;
  }

  return <div>{timeLeft}</div>;
};

export default Timer;