import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRotateRight } from '@fortawesome/free-solid-svg-icons';

import '../../assets/css/timer.css';
import chimeSound from '../../assets/sounds/chime.mp3';
import { useTimer } from '../../contexts/TimerContext';
import { useAuth } from '../../contexts/AuthContext';
import { ToggleButton } from '../../components'


const Timer = () => {
  const { hours, setHours, minutes, setMinutes, seconds, setSeconds, isActive, setIsActive, showMessage, setShowMessage} = useTimer();

  const { isLoggedIn } = useAuth()

  useEffect(() => {
    let interval;
  
    const countDown = () => {
      if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(interval);
        setIsActive(false);
        const audio = new Audio(chimeSound);
        audio.play();
        setShowMessage(true);
      } else {
        if (seconds === 0) {
          if (minutes === 0) {
            setHours(hours - 1);
            setMinutes(59);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }
    };

    if (!isLoggedIn) {
      setIsActive(false);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      setShowMessage(false);
    };
  
    if (isActive) {
      interval = setInterval(countDown, 1000);
      setShowMessage(false);
    };

    return () => {
      clearInterval(interval);
    };
  }, [hours, minutes, seconds, isActive]);

  const timerHours = hours < 10 ? `0${hours}` : hours;
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const handleHourChange = (e) => {
    setHours(parseInt(e.target.value));
  };

  const handleMinuteChange = (e) => {
    setMinutes(parseInt(e.target.value));
  };

  const handleSecondChange = (e) => {
    setSeconds(parseInt(e.target.value));
  };

  const handleStartClick = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      return;
    }
    setIsActive(true);
  };

  const handlePauseClick = () => {
    setIsActive(false);
    setShowMessage(false);
  };

  const handleResetClick = () => {
    setIsActive(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setShowMessage(false);
  };

  const handlePresetClick = (presetMinutes) => {
    setIsActive(false);
    setHours(0);
    setMinutes(presetMinutes);
    setSeconds(0);
    setShowMessage(false);
  };

  return (
    <>
      <div className="timer-container">

        {showMessage? <p className="message">Timer has ended!</p>: null}

        <div role="timer" className="timer">
          {timerHours}:{timerMinutes}:{timerSeconds}
        </div>

        <div role="buttons" className="buttons-container">
          <div className="play-buttons">
          <button role="startButton" onClick={handleStartClick}>
            <FontAwesomeIcon icon={faPlay} style={{color: "#7b3d53"}} />
          </button>
          <button role="pauseButton"onClick={handlePauseClick}>
            <FontAwesomeIcon icon={faPause} style={{color: "#7b3d53"}} />
          </button>
          <button role="resetButton" onClick={handleResetClick}>
            <FontAwesomeIcon icon={faRotateRight} style={{color: "#7b3d53"}} />  
          </button>
        </div>
          
        {isActive ? null : (
          <div className="buttons">
            <button onClick={() => handlePresetClick(5)}>5 mins</button>
            <button onClick={() => handlePresetClick(10)}>10 mins</button>
            <button onClick={() => handlePresetClick(25)}>25 mins</button>
          </div>
        )}
      </div>

        {isActive ? null :(
          <div className="dropdowns">
            <select role="dropdownMenu" value={hours} onChange={handleHourChange}>
              {Array.from({ length: 24 }).map((_, index) => (
                <option key={index} value={index}>
                  {index} hrs
                </option>
              ))}
            </select>
            <select role="dropdownMenu" value={minutes} onChange={handleMinuteChange}>
              {Array.from({ length: 60 }).map((_, index) => (
                <option key={index} value={index}>
                  {index} mins
                </option>
              ))}
            </select>
            <select role="dropdownMenu" value={seconds} onChange={handleSecondChange}>
              {Array.from({ length: 60 }).map((_, index) => (
                <option key={index} value={index}>
                  {index} s
                </option>
              ))}
            </select>
          </div>
        )}
        <ToggleButton />
      </div>
    </>
  );
};

export default Timer;
