import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [["bold", "italic"], [{ list: "ordered" }]],
};

const TextEditor = ({ value, setValue, photo, setPhoto }) => {
  return (
    <div className="editor">
      <div className="mb-3">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={(e) => {
            setValue(e);
          }}
          className="editor-input"
          modules={modules}
        />
      </div>
      <div>
        <label>Картинка</label>
        <input onChange={(e) => setPhoto(e.target.value)} type="text" placeholder="Ссылка на картинку" value={photo}/>
      </div>
    </div>
  );
};

export default TextEditor;
