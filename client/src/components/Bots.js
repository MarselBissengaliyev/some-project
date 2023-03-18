import React, { useEffect, useState } from "react";
import SendMessage from "./SendMessage";
import UpdateMessage from "./UpdateMessage";
import UpdateToken from "./UpdateToken";
import { getGeneralData } from "../network/generalData";
import { getMe } from "../network/api.telegram";
import UploadAvatar from "./UploadAvatar";

const Bots = ({ setBot, bot }) => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    getGeneralData().then((data) => {
      setToken(data.bot_token);
      setMessage(data.bot_start_message);
      setAvatar(data.bot_avatar);
    });
  }, []);

  useEffect(() => {
    if (token) {
      getMe(token).then((data) => {
        const result = data.result;
        setBot({
          first_name: result.first_name,
          username: result.username,
        });
      });
    }
  }, [setBot, token]);

  const showActuallBotName = () => {
    if (token) {
      getMe(token).then((data) => {
        const result = data.result;
        setBot({
          first_name: result.first_name,
          username: result.username,
        });
      });
    }
  };
  return (
    <div>
      <h2 className="text-center">Вкладка Боты</h2>
      <div className="container">
        <div className="row mb-3">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{bot.username}</h5>
                <p className="card-text">Логин бота</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{bot.first_name}</h5>
                <p className="card-text">Название бота</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{bot.activeUsersCount}</h5>
                <p className="card-text">Количество Активных юзеров</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{bot.allUsersCount}</h5>
                <p className="card-text">
                  Количество юзеров всего, которое когда либо нажимали кнопку
                  старт
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <UpdateMessage message={message} setMessage={setMessage} />
          </div>
          <div className="col">
            <UpdateToken token={token} setToken={setToken} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <SendMessage token={token} activeUsersId={bot.activeUsersId} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <button
                  onClick={showActuallBotName}
                  className="btn btn-primary"
                >
                  Показать актуальное имя бота
                </button>
                <h5 className="mt-3">{bot.first_name}</h5>
              </div>
            </div>
          </div>
          <div className="col">
            <UploadAvatar setAvatar={setAvatar} avatar={avatar} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bots;
