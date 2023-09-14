import React, { useState, useContext, createContext } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    return (
      <TimerContext.Provider value={{ hours, setHours, minutes, setMinutes, seconds, setSeconds, isActive, setIsActive, showMessage, setShowMessage}}>
          {children}
      </TimerContext.Provider>
    );
};

export const useTimer = () => useContext(TimerContext);

/////////////////////////////////////////////////////////////////
const PlannerContext = createContext();

export const PlannerProvider = ({ children }) => {
  const [inputDate, setInputDate] = useState('');
  const [inputTag, setInputTag] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [tasks, setTasks] = useState([]);

    return (
      <PlannerContext.Provider value={{ inputDate, setInputDate, inputTag, setInputTag, inputContent, setInputContent, tasks, setTasks }}>
          {children}
      </PlannerContext.Provider>
    );
};

export const usePlanner = () => useContext(PlannerContext);