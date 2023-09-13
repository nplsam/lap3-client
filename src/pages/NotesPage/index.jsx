import { useState, useEffect } from "react";
import Split from "react-split";
import { Sidebar, Editor } from "../../components";
import { useNotes } from "../../contexts/NotesContext"
import '../../assets/css/notes.css'

const NotesPage = () => {
  const {
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
    selectedNoteSubject,
    setSelectedNoteSubject,
    searchQuery,
    setSearchQuery
    } = useNotes()

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

  const sortedNotes = 
    notes.sort((a, b) => b.updatedAt - a.updatedAt);

  const clearSearch = () => {
    setSearchQuery("")
  }

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch('http://localhost:3000/api/notes');
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    }
    fetchNotes();
  }, []);

  useEffect(() => {
    if (!currentNoteId && notes.length > 0) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes]);

  useEffect(() => {
    if (currentNote) {
      setText(currentNote.body);
    }
  }, [currentNote]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (text !== currentNote.body) {
        updateNoteInAPI(text);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [text, currentNote, updateNoteInAPI]);

async function createNewNote() {
  const newNote = {
    title: title,
    subject: subject,
    body: '',
  };

  try {
    const response = await fetch('http://localhost:3000/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    });

    if (!response.ok) {
      throw new Error('Failed to create a new note');
    }

    const data = await response.json();
    setCurrentNoteId(data.id);
    setNotes((prevNotes) => [...prevNotes, data]);
    setText('')
  } catch (error) {
    console.error('Error creating a new note:', error);
  }
}
async function updateNoteInAPI(text, newTitle, newSubject) {
    const updatedNote = {
      body: text,
      title: newTitle,
      subject: newSubject,
    };
  
    try {
      const response = await fetch(`http://localhost:3000/api/notes/${currentNoteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update the note');
      }
  
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === currentNoteId ? { ...note, body: text, title: newTitle, subject: newSubject  } : note
        )
      );
    } catch (error) {
      console.error('Error updating the note:', error);
    }
  }

  async function deleteNoteFromAPI(noteId) {
    try {
      const response = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the note');
      }
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error('Error deleting the note:', error);
    }
  }

  async function handleSave() {
    try {
      const updatedTitle = title.trim() === '' ? currentNote.title : title;
      const updatedSubject = subject.trim() === '' ? currentNote.subject : subject;
  
      const response = await fetch(`http://localhost:3000/api/notes/${currentNoteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updatedTitle,
          subject: updatedSubject,
          body: text,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update the note');
      }
  
      setSelectedNoteTitle(updatedTitle);
      setSelectedNoteSubject(updatedSubject);
  
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === currentNoteId ? { ...note, title: updatedTitle, subject: updatedSubject } : note
        )
      );
  
      setTitle('');
      setSubject('');
    } catch (error) {
      console.error('Error updating the note:', error);
    }
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={sortedNotes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNoteFromAPI}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery} 
            setSelectedNoteTitle={setSelectedNoteTitle}
            selectedNoteSubject={selectedNoteSubject}
          />
         <Editor
            title={title}       
            setTitle={setTitle}   
            subject={subject}     
            setSubject={setSubject} 
            text={text}
            setText={setText}
            handleSave={() => handleSave(selectedNoteTitle)}
          />  
        </Split>
      ) : (
        <div className="no-notes">
          <h1>Notes</h1>
          <button className="first-note" onClick={createNewNote}>
            New
          </button>
        </div>
      )}
    </main>
  );
};

export default NotesPage;