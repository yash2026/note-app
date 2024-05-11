import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";

function App() {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is the first note",
      date: "15/04/2024",
    },
    {
      id: nanoid(),
      text: "This is the javascript note",
      date: "15/04/2024",
    },
    {
      id: nanoid(),
      text: "This is the c++ note",
      date: "15/04/2024",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    try {
      const savedNotes = JSON.parse(localStorage.getItem("note-app"));

      if (savedNotes) {
        setNotes(savedNotes);
      }
    } catch (error) {
      console.error("Error loading notes from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("note-app", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className={`${dark && "dark-mode"}`}>
      <div className="container">
        <Header handleToggle={setDark} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) => note.text.includes(searchText))}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
}

export default App;
