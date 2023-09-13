import { useState } from "react";
import ReactMde from "react-mde";
import ReactDOM from "react-dom";
import Showdown from "showdown";
import '../../assets/css/notes.css'

const Editor = ({ text, setText, title, setTitle, subject, setSubject, handleSave }) => {
  const [selectedTab, setSelectedTab] = useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  const handleEditorChange = (newText) => {
    setText(newText);
  };

  return (
    <section className="pane editor">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      <button className="save-btn" onClick={handleSave}>Save</button>
      <ReactMde
        value={text}
        onChange={handleEditorChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={80}
        heightUnits="vh"
      />
    </section>
  );
}

export default Editor;