import React, { useEffect, useState } from "react";
import SendMessage from "./SendMessage";
import UpdateMessage from "./UpdateMessage";
import UpdateToken from "./UpdateToken";
import Pixels from "./Pixels";
import { getGeneralData } from "../network/generalData";
import { getMe } from "../network/api.telegram";
import { getTelegramData } from "../network/telegramData";

const Bots = ({ setBot, bot }) => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getGeneralData().then((data) => {
      setToken(data.bot_token);
      setMessage(data.bot_start_message);
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

  useEffect(() => {
    if (bot.username) {
      getTelegramData(bot.username).then((data) => {
        setBot((bot) => ({
          ...bot,
          allUsersCount: data.allUsersCount,
          activeUsersCount: data.activeUsersCount,
          activeUsersId: data.activeUsersId,
        }));
      });
    }
  }, [bot.username, setBot]);

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
      <hr />
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
                <button onClick={showActuallBotName} className="btn btn-primary">
                  Показать актуальное имя бота
                </button>
                <h5 className="mt-3">{bot.first_name}</h5>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Загрузить аватар бота</h5>
                <p className="card-text">Название бота</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h2 className="text-center">Вкладка Пиксели</h2>
      <div className="container">
        <div className="row mb-3">
          <div className="col">
            <Pixels />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bots;
