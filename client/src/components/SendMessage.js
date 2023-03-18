import React, { useState } from "react";
import TurndownService from "turndown";
import TextEditor from "./TextEditor";
import { sendMessage, sendPhoto } from "../network/api.telegram";

const SendMessage = ({ token, activeUsersId }) => {
  const [value, setValue] = useState("");
  const turndownService = new TurndownService();
  const [photo, setPhoto] = useState("");
  const [isLoading, setLoading] = useState(false);

  console.log(activeUsersId);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    activeUsersId.map(async (activeUserId) => {
      const chat_id = activeUserId.telegram_id;
      if (!photo && value) {
        await sendMessage(token, {
          chat_id,
          text: turndownService.turndown(value),
        });
      }
      if (photo) {
        await sendPhoto(token, {
          chat_id,
          photo,
          caption: turndownService.turndown(value),
        });
      }
    });
    setLoading(false);
  };
  return (
    <div className="card">
      {!isLoading && (
        <>
          <div className="card-body">
            <label>Массовая рассылка юзерам</label>
            <TextEditor
              value={value}
              setValue={setValue}
              photo={photo}
              setPhoto={setPhoto}
            />
          </div>
          <div className="card-footer">
            <button
              onClick={handleSubmit}
              className="btn btn-primary mt-3"
              type="submit"
            >
              Отправить
            </button>
            {photo && (
              <>
                <hr />
                <img src={photo} alt="" />
              </>
            )}
          </div>
        </>
      )}
      {isLoading && (
        <div class="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default SendMessage;
