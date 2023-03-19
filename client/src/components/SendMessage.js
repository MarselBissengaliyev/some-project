import React from "react";
import TextEditor from "./TextEditor";

const SendMessage = ({ activeUsersId, value, setValue, photo, setPhoto }) => {
  return (
    <div>
      <>
        <div>
          <label>Редактор сообщения </label>
          <TextEditor
            value={value}
            setValue={setValue}
            photo={photo}
            setPhoto={setPhoto}
          />
        </div>
      </>
    </div>
  );
};

export default SendMessage;
