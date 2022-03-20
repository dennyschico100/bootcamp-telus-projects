import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import {
  faHome,
  faPlay,
  faStop,
  faPause,
  faBars,
  faL,
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
  const [isBreak, setIsBreak] = useState(null);

  const [percentage, setPercentage] = useState(0);
  const audioRef = useRef(null);
  //const percentageIncrement = (1 * 60) / 100;

  const [cycleFinished, setCycleFinished] = useState(false);
  let [interval, setinterval] = useState(() => {});

  const resetCountDown = () => {
    clearInterval(interval);
    setPercentage(0);
  };
  useEffect(() => {
    console.log('useEffect run first render');
    window.localStorage.setItem('totalSeconds', minutes * 60);
    window.localStorage.setItem('breakMinutes', 1 * 60);
    window.localStorage.setItem('largeBreakMinutes', 15 * 60);
    window.localStorage.setItem('pomodoros', 0);
    document.body.style.background = '#003049';
  }, []);
  useEffect(() => {
    if (start) {
      interval = setInterval(() => {
        clearInterval(interval);
        const totalSeconds = window.localStorage.getItem('totalSeconds');
        console.log(totalSeconds);
        console.error(`minutos ${minutes} y segundos ${seconds}`);
        if (seconds === 0) {
          if (minutes !== 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            setCycleFinished(true);
            setStart(false);
          }
        } else {
          if (start && seconds !== 0) {
            setSeconds(seconds - 1);
          }
        }

        const leftSeconds = minutes * 60 + (seconds - 1);

        const percentageIncrement = leftSeconds / totalSeconds;
        console.warn(
          `leftseconds ${leftSeconds} totalseconds ${totalSeconds} minutos ${minutes} y segungods ${seconds}`
        );
        setPercentage(100 - Math.floor(percentageIncrement * 100));
        console.warn(`${percentage} %`);

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

  useEffect(() => {
    console.log(
      `minutos ${minutes} segundos ${seconds} ya termino ${cycleFinished}`
    );
    if (minutes === 0 && seconds === 0 && cycleFinished) {
      audioRef.current.play();
      setStart(false);
    }
  }, [cycleFinished]);
  return (
    <>
      <details>
        <summary>
          {' '}
          <FontAwesomeIcon icon={faBars} />
        </summary>
        <nav style={{ height: '100px' }} className=" menu">
          <a
            href="#"
            onClick={() => {
              setStart(false);
              setIsPaused(false);
              setIsBreak(false);
              setSeconds(0);
              setMinutes(2);
              resetCountDown();
            }}
          >
            Pomodoro
          </a>
          <a
            href="#"
            onClick={() => {
              //setStart(false);
              setIsPaused(false);
              setIsBreak(true);
              setSeconds(0);
              setMinutes(1);
              resetCountDown();
              console.warn(`${percentage} %%`);

              //window.localStorage.setItem('totalSeconds', minutes * 60);

              console.log(
                parseInt(window.localStorage.getItem('breakMinutes'))
              );
              window.localStorage.setItem(
                'totalSeconds',
                parseInt(window.localStorage.getItem('breakMinutes'))
              );
              console.log('minutos ' + minutes);
              console.error(window.localStorage.getItem('totalSeconds'));
              //setStart(true);

              setCycleFinished(false);
            }}
          >
            Break
          </a>
          <a href="#">Long break</a>
        </nav>
      </details>
      <div className="container">
        <div
          className="cycle-container row mt-2"
          style={{ border: '2px solid blue' }}
        >
          <h1 className="text-center text-white">
            {start && !isBreak ? 'Work time' : ''}
            {isBreak && start ? 'Break time ' : ''}
          </h1>
          <audio id="chatAudio" ref={audioRef}>
            <source
              src="https://assets.mixkit.co/sfx/preview/mixkit-vintage-telephone-ringtone-1356.mp3"
              type="audio/mpeg"
            />
          </audio>
          <div className="col-md-4 col-6 offset-md-4 mt-2">
            {/*text={`${minutes}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`}
             
             turquoise*/}
            <CircularProgressbar
              value={percentage}
              text={`${minutes}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`}
              styles={buildStyles({
                textColor: cycleFinished ? '#DC2E42' : '#fff',
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
                setCycleFinished(false);
                setIsPaused(false);

                window.localStorage.setItem(
                  'pomodoros',
                  parseInt(window.localStorage.getItem('pomodoros')) + 1
                );
                if (isPaused) {
                  setSeconds((prevState) => {
                    return prevState - 1;
                  });
                } else {
                  setSeconds(0);
                  window.localStorage.setItem('totalSeconds', minutes * 60);
                }

                console.error(start);
              }}
            >
              <FontAwesomeIcon icon={faPlay} />
            </button>
            <button
              onClick={() => {
                console.log(`es break ${isBreak}`);
                if (isBreak) {
                  setIsPaused(false);
                  setSeconds(0);
                  setStart(false);

                  clearInterval(interval);
                  setMinutes(1);
                  resetCountDown();
                } else {
                  console.log('CON RESET');
                  setSeconds(0);
                  setStart(false);
                  setIsPaused(false);
                  clearInterval(interval);
                  setMinutes(2);
                  resetCountDown();
                }
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
