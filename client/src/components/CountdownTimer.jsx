import { useAppContext } from "@/context/AppContext";
import React, { useState, useEffect } from "react";

const CountdownTimer = ({ timerState, setTimerState, isTimerEnable }) => {
  const { socket, roomId, clientPlayer, matchStatus } = useAppContext();
  const [mount, setMount] = useState(true);

  const { min, sec } = timerState;

  useEffect(() => {
    if (mount) {
      setMount(false);
      return;
    }

    if (isTimerEnable && matchStatus==='ON') {
      let countdown;
      if (sec > 0 || min > 0) {
        countdown = setInterval(() => {
          if (sec > 0) {
            setTimerState({ ...timerState, sec: sec - 1 });
          } else if (min > 0) {
            setTimerState({ min: min - 1, sec: 59 });
          }
        }, 1000);
      }

      if (sec == 0 && min == 0) {
        socket.emit("time-out",roomId, clientPlayer);
      }
      // Clean up the interval when the component unmounts or the timer stops
      return () => clearInterval(countdown);
    }
  }, [timerState, isTimerEnable]);

  // useEffect(()=>{
  //   if(mount1){
  //     setMount1(false);
  //     return
  //   }

  //   if(isTimerEnable==false && countdown){

  //     clearInterval(countdown)
  //   }else {
  //     setToggle(!toggle)
  //   }
  // },[isTimerEnable])

  return (
    <div>
      <h1>
        {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
      </h1>
    </div>
  );
};

export default CountdownTimer;
