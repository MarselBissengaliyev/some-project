import React, { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import TurndownService from 'turndown';

const SendMessage = ({ token, activeUsersId }) => {
  const [value, setValue] = useState("");
  const turndownService = new TurndownService()
  const [photo, setPhoto] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(value);
    activeUsersId.map(async (activeUserId) => {
      const chat_id = activeUserId.telegram_id;
      if (!photo && value) {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        body: JSON.stringify({
          chat_id: chat_id,
          text: turndownService.turndown(value),
          parse_mode: "Markdown",
          disable_web_page_preview: false,
          disable_notification: true,
          reply_to_message_id: null
        }),
        headers: {
          "Content-Type": "application/json",
        }
      })
      }
      if (photo) {
        await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
          method: 'POST',
          body: JSON.stringify({
            chat_id: chat_id,
            photo: photo,
            caption: turndownService.turndown(value),
            disable_notification: false,
            reply_to_message_id: null
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          console.log('Photo sent successfully.');
        }).catch(function (error) {
          console.error('Error sending photo:', error);
        });
      }
    });
  }
  return (
    <div className="card">
      <div className="card-body">
        <label>Массовая рассылка юзерам</label>
        <TextEditor value={value} setValue={setValue} photo={photo} setPhoto={setPhoto}/>
      </div>
      <div className="card-footer">
        <button onClick={handleSubmit} className="btn btn-primary mt-3" type="submit">
          Отправить
        </button>
        <hr />
        {photo && <img src={photo} alt=""/>}
      </div>
    </div>
  );
};

export default SendMessage;
