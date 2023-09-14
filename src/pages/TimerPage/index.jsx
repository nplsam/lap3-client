import React from 'react';
import { Timer } from '../../components';
import '../../assets/css/style.css'

const TimerPage = () => {
  return (
    <>
      <div className="timerpage">
        <div className='timerpage-container'>
          <h2>Pomodoro Timer</h2>
          <Timer />
        </div>
      </div>
    </>
    
  );
};

export default TimerPage;
