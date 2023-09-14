import React, { useState, useContext, createContext } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [isOn, setIsOn] = useState(false);

    return (
      <TimerContext.Provider value={{ hours, setHours, minutes, setMinutes, seconds, setSeconds, isActive, setIsActive, showMessage, setShowMessage, isOn, setIsOn}}>
          {children}
      </TimerContext.Provider>
    );
};

export const useTimer = () => useContext(TimerContext);