import React, { useState, useContext, createContext } from "react";

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