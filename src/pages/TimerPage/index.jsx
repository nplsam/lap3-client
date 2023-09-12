import React from 'react';
import { Timer } from '../../components';
import './style.css'

const TimerPage = () => {
  return (
    <>
      <div className="timerpage">
        <h2>Pomodoro Timer</h2>
        <Timer />
      </div>
    </>
    
  );
};

export default TimerPage;
