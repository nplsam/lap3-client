import React, { useState, useEffect } from 'react'
import SearchNotes from '../SearchNotes'

const Sidebar = (props) => {

  const [filteredNotes, setFilteredNotes] = useState([])

  useEffect(() => {
    const filtered = props.notes.filter((note) => {
      if (props.searchQuery) {
        return note.title.toLowerCase().includes(props.searchQuery.toLowerCase());
      }
      return true;
    });
    setFilteredNotes(filtered);
  }, [props.notes, props.searchQuery]);

const noteElements = filteredNotes.map((note, index) => (
  <div key={note.id}>
    <div
      className={`title ${
        note.id === props.currentNote.id ? "selected-note" : ""
      }`}
      onClick={() => {
        props.setCurrentNoteId(note.id);
        props.setSelectedNoteTitle(note.title)
      }}
    >
      <h4 className="text-snippet">{note.title || "Untitled Note"}</h4>
      {note.subject && (
        <p className="subject-snippet">{note.subject}</p>
      )}
      {note.id === props.currentNote.id && props.selectedNoteSubject && (
        <p className="subject-snippet">{props.selectedNoteSubject}</p>
      )}
      <button className="delete-btn" onClick={() => props.deleteNote(note.id)}>
        <i className="gg-trash trash-icon"></i>
      </button>
    </div>
  </div>
));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>{props.selectedNoteTitle || " My Notes"}</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      <SearchNotes
        searchQuery={props.searchQuery}
        setSearchQuery={props.setSearchQuery}
        clearSearch={() => {
          props.clearSearch();
          setFilteredNotes([]);
        }}
      />
      {noteElements}
    </section>
  );
}

export default Sidebar