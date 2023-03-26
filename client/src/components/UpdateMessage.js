import React, { useContext } from "react";
import MyContext from "../context/context";
import { updateGeneralDataMessage } from "../network/generalData";

const UpdateMessage = ({ message, setMessage }) => {
  const {
    setError,
    setLoading
  } = useContext(MyContext);
  /*
   ** Submit start message function
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    async function fetchUpdateGeneralDataMessage() {
      try {
        await updateGeneralDataMessage(message);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }

    if (message) {
      fetchUpdateGeneralDataMessage();
    }

    setLoading(false);
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
