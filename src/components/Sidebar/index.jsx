import React, { useState, useEffect } from 'react'
import { SearchNotes, SubjectFilter } from '../../components'

const Sidebar = (props) => {

  const [filteredNotes, setFilteredNotes] = useState([])

  useEffect(() => {
    const filtered = props.notes.filter((note) => {
      if (props.searchQuery && typeof props.searchQuery.toLowerCase === 'function' && note.title) {
        return note.title.toLowerCase().includes(props.searchQuery.toLowerCase());
      }
      return true;
    });
    setFilteredNotes(filtered);
  }, [props.notes, props.searchQuery]);

  const handleSubjectFilter = (subject) => {
    const lowerCaseSubject = subject.toLowerCase();
    const filtered = props.notes.filter((note) => {
      return note.subject && note.subject.toLowerCase().includes(lowerCaseSubject);
    });

    setFilteredNotes(filtered);
  };

  const noteElements = filteredNotes.map((note, index) => (
    <div key={index}>
      <div
        className={`title ${
          note._id === props.currentNote._id ? "selected-note" : ""
        }`}
        onClick={() => {
          props.setCurrentNoteId(note._id);
          props.setSelectedNoteTitle(note.title);
        }}
      >
        <h4 className="text-snippet">{note.title || "Untitled Note"}</h4>
        {note.subject && (
          <p className="subject-snippet">{note.subject}</p>
        )}
        {note._id === props.currentNote._id &&
          props.selectedNote && props.selectedNoteSubject && (
          <p className="subject-snippet">{props.selectedNoteSubject}</p>
        )}
        <button className="delete-btn" onClick={() => props.deleteNote(note._id)}>
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>{props.selectedNoteTitle || "My Notes"}</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      <SearchNotes
        searchQuery={props.searchQuery}
        setSearchQuery={props.setSearchQuery}
        clearSearch={() => {
          setFilteredNotes([]);
        }}
      />
      <SubjectFilter notes={props.notes} onFilter={handleSubjectFilter} />
      {noteElements}
    </section>
  );
}

export default Sidebar