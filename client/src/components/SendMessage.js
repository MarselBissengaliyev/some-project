import React from "react";
import TextEditor from "./TextEditor";

const SendMessage = ({ value, setValue, setPhoto}) => {
  return (
    <div>
      <label>Редактор сообщения </label>
      <TextEditor value={value} setValue={setValue} setPhoto={setPhoto} />
    </div>
  );
};

export default SendMessage;
