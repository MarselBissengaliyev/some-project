import React from "react";
import { updateGeneralDataMessage } from "../network/generalData";

const UpdateMessage = ({ message, setMessage }) => {
  /*
   ** Submit start message function
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateGeneralDataMessage(message);
  };
  return (
    <div className="card">
      <div className="card-body">
        <label>Сообщение которое отправляем при нажатии кнопки старт</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="card-footer">
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          Обновить
        </button>
      </div>
    </div>
  );
};

export default UpdateMessage;
