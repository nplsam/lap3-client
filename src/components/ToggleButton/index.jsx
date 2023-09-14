import React from 'react';
import './style.css';
import { useTimer } from '../../contexts/TimerContext';


function ToggleButton() {
  const {isOn, setIsOn } = useTimer()
  const toggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="toggle-container">
      <label className={`toggle-button ${isOn ? 'work' : 'rest'}`}>
        <input type="checkbox" checked={isOn} onChange={toggle} />
        <div className="slider"></div>
        <span className="label-text">{isOn ? 'Work' : 'Rest'}</span>
      </label>
    </div>
  );
}

export default ToggleButton;
