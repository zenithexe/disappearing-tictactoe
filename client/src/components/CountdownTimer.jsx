import React, { useState, useEffect } from 'react';

const CountdownTimer = ({timerState, setTimerState, isTimerEnable}) => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [countdown, setCountdown] = useState();
  const [mount1,setMount1] =useState(true);
  const [mount2,setMount2] = useState(true);
  const [toggle,setToggle] = useState(true);

  const {min, sec} = timerState;

  useEffect(() => {

    if(mount2){
      setMount2(false);
      return
    }

    if(isTimerEnable){
      let countdown
      if (sec > 0 || min > 0) {
        countdown = setInterval(() => {
          if (sec > 0) {
            setTimerState({...timerState, sec:sec - 1});
          } else if (minutes > 0) {
            setTimerState({min:min-1, sec:59});
          }
        }, 1000);
        setCountdown(countdown)
      }
      
      // Clean up the interval when the component unmounts or the timer stops
      return () => clearInterval(countdown)
    }


  }, [timerState,isTimerEnable]);


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
        {min < 10 ? `0${min}` : min}:
        {sec < 10 ? `0${sec}` : sec}
      </h1>
    </div>
  );
};

export default CountdownTimer;
