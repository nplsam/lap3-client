import React, { createContext, useContext, useState } from "react";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [noteText, setNoteText] = useState({});
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedNoteTitle, setSelectedNoteTitle] = useState("");
  const [selectedNoteSubject, setSelectedNoteSubject] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const setNoteTextById = (noteId, newText) => {
    setNoteText((prevText) => ({
      ...prevText,
      [noteId]: newText,
    }));
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        currentNoteId,
        setCurrentNoteId,
        noteText,
        setNoteTextById,
        text,
        setText,
        title,
        setTitle,
        subject,
        setSubject,
        selectedNoteTitle,
        setSelectedNoteTitle,
        selectedNoteSubject,
        setSelectedNoteSubject,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);