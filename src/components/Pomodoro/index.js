import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import {
  faHome,
  faPlay,
  faStop,
  faPause,
  faBars,
  faCog,
  faClose,
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
  const [minutes, setMinutes] = useState(() => {
    return window.localStorage.getItem('pomodoroCycle') || 25;
  });
  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isBreak, setIsBreak] = useState(null);
  const [isLongBreak, setIsLongBreak] = useState(false);

  const [showDivOpacity, setShowDivOpacty] = useState(false);
  const [showDivOpacityStatistics, setShowDivOpactyStatistics] =
    useState(false);

  const [percentage, setPercentage] = useState(0);
  const audioRef = useRef(null);
  const divSettings = useRef(null);
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
    window.localStorage.setItem('largeBreakMinutes', 15);
    window.localStorage.setItem('largeBreakSeconds', 15 * 60);

    window.localStorage.setItem('pomodoros', 0);
    window.localStorage.setItem('totalShortBreaks', 0);
    window.localStorage.setItem('totalLongBreaks', 0);

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
        /*console.warn(
          `leftseconds ${leftSeconds} totalseconds ${totalSeconds} minutos ${minutes} y segungods ${seconds}`
        );*/
        setPercentage(100 - Math.floor(percentageIncrement * 100));
        //console.warn(`${percentage} %`);

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
    /*console.log(
      `minutos ${minutes} segundos ${seconds} ya termino ${cycleFinished}`
    );*/
    if (minutes === 0 && seconds === 0 && cycleFinished) {
      audioRef.current.play();
      setStart(false);
      setIsPaused(false);

      if (isBreak) {
        setSeconds(0);
        clearInterval(interval);
        setMinutes(() => {
          return window.localStorage.getItem('shortBreak') || 5;
        });
        resetCountDown();
      } else {
        setSeconds(0);
        clearInterval(interval);
        setMinutes(() => {
          return window.localStorage.getItem('pomodoroCycle') || 25;
        });
        resetCountDown();
      }
    }
  }, [cycleFinished]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowDivOpacty(false);
    const { pomodoroCycle, shortBreak, longBreak } = event.target;
    console.error(longBreak.value);
    window.localStorage.setItem('shortBreak', shortBreak.value);
    window.localStorage.setItem('largeBreakMinutes', longBreak.value);
    window.localStorage.setItem('pomodoroCycle', pomodoroCycle.value);
    /*setMinutes(() => {
      return window.localStorage.getItem('pomodoroCycle') || 2;
    });*/
    clearInterval(interval);
    resetCountDown();
    if (isBreak) {
      setMinutes(() => {
        return window.localStorage.getItem('breakMinutes') || 5;
      });
    } else {
      setMinutes(() => {
        return window.localStorage.getItem('pomodoroCycle') || 25;
      });
    }
  };
  return (
    <>
      <div
        className={
          showDivOpacity || showDivOpacityStatistics
            ? 'container-opacity'
            : 'container-opacity-none'
        }
        ref={divSettings}
        style={{}}
      ></div>
      <div
        className={showDivOpacity ? 'form-settings-show' : 'form-settings-hide'}
      >
        <div className="row">
          <form
            action=""
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <a
              href="#"
              style={{ float: 'right' }}
              onClick={() => {
                setShowDivOpacty(false);
              }}
            >
              <FontAwesomeIcon icon={faClose} />
            </a>
            <div className="col-md-4">
              <label htmlFor="">Pomodoro</label>
              <input type="number" min="1" name="pomodoroCycle" id="" />
            </div>
            <div className="col-md-4">
              <label htmlFor="">Short break</label>
              <input type="number" min="1" name="shortBreak" id="" />
            </div>
            <div className="col-md-4">
              <label htmlFor="">Long break</label>
              <input type="number" min="1" name="longBreak" id="" />
            </div>
            <button
              style={{
                backgroundColor: 'gold',
                color: '#000',
                border: '0',
                marginTop: '0.5rem',
              }}
              onClick={() => {}}
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
      <div
        className={
          showDivOpacityStatistics
            ? 'col-md-4 statistics-show'
            : 'statistics-hide'
        }
      >
        {' '}
        <a
          href="#"
          style={{ float: 'right' }}
          onClick={() => {
            setShowDivOpactyStatistics(false);
          }}
        >
          <FontAwesomeIcon icon={faClose} />
        </a>
        <div className="row" style={{ border: '3px solid black' }}>
          <h2 className="text-center"> Estadisiticas</h2>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="">Pomodoros</label>
                <label htmlFor="">Descansos cortos</label>
                <label htmlFor="">Descandos largos</label>
              </div>
              <div className="col-md-6">
                <label className="col-12" htmlFor="">
                  {window.localStorage.getItem('pomodoros')}
                </label>
                <label className="col-12" htmlFor="">
                  {window.localStorage.getItem('totalShortBreaks')}
                </label>
                <label className="col-12" htmlFor="">
                  {window.localStorage.getItem('totalLongBreaks')}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <details>
        <summary>
          {' '}
          <FontAwesomeIcon icon={faBars} />
        </summary>
        <nav style={{ height: '100px' }} className="menu">
          <a
            href="#"
            onClick={() => {
              setStart(false);
              setIsPaused(false);
              setIsBreak(false);
              setIsLongBreak(false);
              setSeconds(0);
              setMinutes(() => {
                return window.localStorage.getItem('pomodoroCycle') || 25;
              });
              resetCountDown();
            }}
          >
            Pomodoro
          </a>
          <a
            href="#"
            onClick={() => {
              setStart(false);
              setIsPaused(false);
              setIsBreak(true);
              setIsLongBreak(false);
              setSeconds(0);
              setMinutes(() => {
                return window.localStorage.getItem('shortBreak') || 5;
              });
              resetCountDown();
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
            Short Break
          </a>
          <a
            href="#"
            onClick={() => {
              setStart(false);
              setIsPaused(false);
              setIsBreak(false);
              setIsLongBreak(true);
              setSeconds(0);
              setMinutes(() => {
                return window.localStorage.getItem('largeBreakMinutes') || 15;
              });
              resetCountDown();
              window.localStorage.setItem(
                'totalSeconds',
                parseInt(window.localStorage.getItem('largeBreakSecods'))
              );
              setCycleFinished(false);
            }}
          >
            Long break
          </a>
          <a
            href="#"
            onClick={() => {
              setShowDivOpacty(true);
            }}
          >
            Settings
          </a>
          <a
            href="#"
            onClick={() => {
              setShowDivOpactyStatistics(true);
            }}
          >
            Estadisticas
          </a>
        </nav>
      </details>

      <div className="container">
        <div
          className="cycle-container row mt-2"
          style={{ border: 'px solid blue' }}
        >
          <h1 className="text-center text-white">
            {!isBreak && !isLongBreak ? 'Work time' : ''}
            {isBreak && start ? 'Break time ' : ''}
            {isLongBreak && !isBreak ? 'Long break ' : ''}
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

                if (isBreak) {
                  let getShortBreaks =
                    window.localStorage.getItem('totalShortBreaks') ?? 0;
                  getShortBreaks++;

                  window.localStorage.setItem(
                    'totalShortBreaks',
                    getShortBreaks
                  );
                } else if (isLongBreak) {
                  let getLongBreaks =
                    window.localStorage.getItem('totalLongBreaks') ?? 0;
                  getLongBreaks++;

                  window.localStorage.setItem('totalLongBreaks', getLongBreaks);
                } else {
                  let getPomodoros =
                    window.localStorage.getItem('pomodoros') ?? 0;
                  getPomodoros++;

                  window.localStorage.setItem('pomodoros', getPomodoros);
                }

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
                console.log(`es break ${isBreak} es long breaj ${isLongBreak}`);
                if (isBreak) {
                  setIsPaused(false);
                  setSeconds(0);
                  setStart(false);
                  clearInterval(interval);
                  setMinutes(() => {
                    return window.localStorage.getItem('shortBreak') || 5;
                  });
                  resetCountDown();
                } else if (isLongBreak) {
                  setIsPaused(false);
                  setIsBreak(false);
                  setSeconds(0);
                  setStart(false);
                  clearInterval(interval);
                  setMinutes(() => {
                    return (
                      window.localStorage.getItem('largeBreakMinutes') || 15
                    );
                  });
                  resetCountDown();
                } else {
                  console.log('CON RESET');
                  setSeconds(0);
                  setStart(false);
                  setIsPaused(false);
                  clearInterval(interval);

                  setMinutes(() => {
                    return window.localStorage.getItem('pomodoroCycle') || 25;
                  });
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
