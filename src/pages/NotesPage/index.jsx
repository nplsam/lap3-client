import { useEffect } from "react";
import Split from "react-split";
import { Sidebar, Editor } from "../../components";
import { useNotes } from "../../contexts/NotesContext"
import { Timer } from '../../components';
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
    notes.find((note) => note._id === currentNoteId) || notes[0];

  const sortedNotes = 
    notes.sort((a, b) => b.updatedAt - a.updatedAt);

  const { noteText, setNoteTextById } = useNotes();

  // Handling change to separate text content for each note
  const currentNoteText = noteText[currentNoteId] || "";

  const handleTextChange = (newText) => {
    setNoteTextById(currentNoteId, newText);
  };

  // Function to get username
  const getUsername = async () => {
    try {
      const response = await fetch('https://project3-server-4bv6.onrender.com/auth/find', {
        method: 'GET',
        headers: {
          'Authorization': localStorage.token
        },
      });

      if(response.status != 200) {
        throw new Error('Failed to logout')
      }

      const data = await response.json()

      return data.response.username[0].username
      
    } catch (error) {
      console.error('Failde to get username: ', error)
    }
  }

  useEffect(() => {
    async function fetchNotes() {
      const username = await getUsername();
      try {
        const response = await fetch(`https://project3-server-4bv6.onrender.com/notes/user/${username}`, {
          method: 'GET',
          headers: {
            'Authorization': localStorage.token
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }

        const data = await response.json();
        setNotes(data.response);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    }
    fetchNotes();
  }, []);

  useEffect(() => {
    if (!currentNoteId && notes.length < 0) {
      setCurrentNoteId(notes[0]?._id);
    }
  }, [notes]);

  useEffect(() => {
    if (currentNote) {
      setText(currentNote.body);
    }
  }, [currentNote]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (text !== currentNote.content) {
        updateNoteInAPI(text);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [text, currentNote, updateNoteInAPI]);

async function createNewNote() {

  try {
    const response = await fetch('https://project3-server-4bv6.onrender.com/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
      },
      body: JSON.stringify({title: title, subject: subject, topic_tags: '', content: ''}),
    });

    if (!response.ok) {
      throw new Error('Failed to create a new note');
    }

    const data = await response.json();
    setCurrentNoteId(data._id);
    setNotes((prevNotes) => [...prevNotes, data.response]);
    setText('')
  } catch (error) {
    console.error('Error creating a new note:', error);
  }
}

async function updateNoteInAPI(text) {
    const updatedNote = {
      content: text,
    };
    
    try {
      const response = await fetch(`https://project3-server-4bv6.onrender.com/notes/${currentNoteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.token
        },
        body: JSON.stringify(updatedNote),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update the note');
      }
  
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === currentNoteId ? { ...note, content: text } : note
        )
      );
    } catch (error) {
      console.error('Error updating the note:', error);
    }
  }

  async function deleteNote(noteId) {
    try {
      const response = await fetch(`https://project3-server-4bv6.onrender.com/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': localStorage.token
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the note');
      }
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error('Error deleting the note:', error);
    }
  }

  async function handleSave() {
    try {
      const updatedTitle = title.trim() === '' ? currentNote.title : title;
      const updatedSubject = subject.trim() === '' ? currentNote.subject : subject;
  
      const response = await fetch(`https://project3-server-4bv6.onrender.com/notes/${currentNoteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.token
        },
        body: JSON.stringify({
          title: updatedTitle,
          subject: updatedSubject,
          content: text,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update the note');
      }
  
      setSelectedNoteTitle(updatedTitle);
      setSelectedNoteSubject(updatedSubject);
  
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === currentNoteId ? { ...note, title: updatedTitle, subject: updatedSubject } : note
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
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={sortedNotes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
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
            text={currentNoteText}
            setText={handleTextChange}
            handleSave={() => handleSave(selectedNoteTitle)}
          />  
        </Split>
        <div  className="timer-on-other-page">
                <Timer />
        </div>
    </main>
  );
};

export default NotesPage;
