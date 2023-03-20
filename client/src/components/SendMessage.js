import React from "react";
import TextEditor from "./TextEditor";

const SendMessage = ({ value, setValue, setPhoto, defaultImg='' }) => {
  return (
    <div>
      <label>Редактор сообщения </label>
      <TextEditor value={value} setValue={setValue} setPhoto={setPhoto} defaultImg={defaultImg} />
    </div>
  );
};

export default SendMessage;
