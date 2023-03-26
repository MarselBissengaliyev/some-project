import React, { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadImage } from "../network/img";
import { deleteStartMessage } from "../network/startMessage";
import MyContext from "../context/context";

const modules = {
  toolbar: [["bold", "italic"]],
};

const TextEditor = ({ value, setValue, setPhoto, defaultImg = "" }) => {
  const [img, setImg] = useState(defaultImg);
  const formData = new FormData();
  const [error, setError] = useState("");
  const { setLoading } = useContext(MyContext);

  /*
   ** Delete a photo from text editor
   */
  const deletePhoto = async () => {
    setLoading(true);
    async function fetchDeleteStartMessage() {
      try {
        setImg("");
        setPhoto("");
        await deleteStartMessage();
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }

    fetchDeleteStartMessage();

    setLoading(false);
  };

  /*
   ** Handle Delete a PixelItem function Component
   */
  const sendFile = async (e) => {
    setLoading(true);
    formData.append("photo", e.target.files[0]);
    async function fetchUploadImage() {
      try {
        const data = await uploadImage(formData);

        setImg(data);
        if (data) {
          setPhoto(`/${data}`);
        }
        setError("");
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }

    if (formData.get("photo")) {
      fetchUploadImage();
    }

    setLoading(false);
  };
  return (
    <div className="editor">
      <div className="mb-3">
        <ReactQuill
          theme="snow"
          defaultValue={value}
          onChange={(e) => {
            setValue(e);
          }}
          className="editor-input"
          modules={modules}
        />
      </div>
      <form method="post" encType="multipart/form-data">
        <>
          <label>Картинка</label>
          <Form.Control
            name="photo"
            onChange={sendFile}
            type="file"
            accept="image/*"
          />
        </>
        {!defaultImg && img && (
          <div className="mt-3">
            <img src={`${process.env.REACT_APP_API_URL}/${img}`} alt="" />
          </div>
        )}
        {defaultImg && img && (
          <div className="mt-3">
            <img src={`${process.env.REACT_APP_API_URL}/${img}`} alt="" />
            <div className="mt-3">
              <Button onClick={deletePhoto} variant="danger">
                Удалить
              </Button>
            </div>
          </div>
        )}
        {error && (
          <Alert className="mt-3" variant="danger">
            {error}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default TextEditor;
