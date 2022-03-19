import React, { useState, useEffect } from 'react';
import './style.css';
import {
  faHome,
  faPlay,
  faStop,
  faPause,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [percentage, setPercentage] = useState(0);

  //const percentageIncrement = (1 * 60) / 100;

  const [cycleFinished, setCycleFinished] = useState(false);
  let [interval, setinterval] = useState(() => {});
  const [displayMessage, setDisplayMessage] = useState(false);
  const resetCountDown = () => {
    clearInterval(interval);
    setPercentage(0);
  };
  useEffect(() => {
    console.log('useEffect run');
    window.localStorage.setItem('totalSeconds', minutes * 60);
    document.body.style.background = '#003049';
  }, []);
  useEffect(() => {
    if (start) {
      interval = setInterval(() => {
        clearInterval(interval);
        if (seconds === 0) {
          if (minutes !== 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            setCycleFinished(true);
          }
        } else {
          if (start && seconds !== 0) {
            setSeconds(seconds - 1);
          }
        }
        const totalSeconds = window.localStorage.getItem('totalSeconds');
        const leftSeconds = minutes * 60 + (seconds - 1);

        console.log(`minutos ${minutes} segundos: ${seconds}`);

        console.log(`segundos restantes ${leftSeconds}`);
        console.log(`segundos totales ${totalSeconds}`);

        //const percentage = Math.floor(leftTime / totalSeconds) * 100;
        //setPercentage(Math.floor(totalSeconds / leftSeconds));
        const percentageIncrement = leftSeconds / totalSeconds;
        console.warn(percentageIncrement);
        console.warn(Math.floor(percentageIncrement * 100));

        setPercentage(100 - Math.floor(percentageIncrement * 100));
        console.log(percentage);

        if (percentage < 0) {
          console.log('PERCENTAGE CERO');
          setPercentage(0);
        }
        /*
        setPercentage((prevState) => {
          return prevState + 1;
        });*/
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [start, seconds]);
  return (
    <>
      <div className="container">
        <div
          className="cycle-container row mt-2"
          style={{ border: '0px solid blue' }}
        >
          <h1 className="text-center text-white">Pomodoro App</h1>

          {/*style={{ width: 200, height: 200, border: '3px solid red' }} */}
          <div
            style={{ border: '0px solid red' }}
            className="col-md-4 offset-md-4 mt-2"
          >
            {/*text={`${minutes}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`}
             
             turquoise*/}
            <CircularProgressbar
              value={percentage}
              text={`${minutes}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`}
              styles={buildStyles({
                textColor: '#fff',
                pathColor: '#DC2E42',
                trailColor: '#ccf2ee',
              })}
            />
          </div>
          <div className="col-md-4 offset-md-4 d-flex  justify-content-between btns-container">
            <button
              disabled={start}
              onClick={() => {
                setStart(true);

                if (isPaused) {
                  setSeconds((prevState) => {
                    return prevState - 1;
                  });
                } else {
                  setSeconds(0);
                }

                console.error(start);
              }}
            >
              <FontAwesomeIcon icon={faPlay} />
            </button>
            <button
              onClick={() => {
                console.log('CON RESET');
                setSeconds(0);
                setStart(false);
                setIsPaused(false);
                clearInterval(interval);
                setMinutes(2);
                resetCountDown();
              }}
            >
              <FontAwesomeIcon color="" icon={faStop} />
            </button>
            {
              <button
                disabled={!start}
                onClick={() => {
                  clearInterval(interval);

                  setIsPaused(true);
                  setStart(false);
                }}
              >
                <FontAwesomeIcon color="" icon={faPause} />
              </button>
            }
          </div>
        </div>

        {/*start && (
          <button
            onClick={() => {
              clearInterval(interval);

              setIsPaused(true);
              setStart(false);
            }}
          >
            Pause
          </button>
        )*/}
      </div>
    </>
  );
};
export default Pomodoro;
