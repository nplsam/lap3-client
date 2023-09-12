import React, { createContext, useContext, useState, useEffect } from "react";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedNoteTitle, setSelectedNoteTitle] = useState("");

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        currentNoteId,
        setCurrentNoteId,
        text,
        setText,
        title,
        setTitle,
        subject,
        setSubject,
        selectedNoteTitle,
        setSelectedNoteTitle,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);