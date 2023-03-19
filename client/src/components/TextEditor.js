import React, { useState } from "react";
import { Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [["bold", "italic"], [{ list: "ordered" }]],
};

const TextEditor = ({ value, setValue, photo, setPhoto }) => {
  const handleUpload = (e) => {
    const photo = e.target.files[0];
    console.log(photo);

    
  }
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
        <Form.Control onChange={handleUpload} type="file" accept="image/*"/>
      </div>
    </div>
  );
};

export default TextEditor;
