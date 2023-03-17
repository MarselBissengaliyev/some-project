import React, { useEffect, useState } from "react";
import SendMessage from "./SendMessage";
import UpdateMessage from "./UpdateMessage";
import UpdateToken from "./UpdateToken";

const Bots = ({ setBot, bot }) => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:4444/api/general-data")
      .then((response) => response.json())
      .then((data) => {
        setToken(data.bot_token);
        setMessage(data.bot_start_message);
      });
  }, []);

  useEffect(() => {
    fetch(`https://api.telegram.org/bot${token}/getMe`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        const result = data.result;
        setBot({
          first_name: result.first_name,
          username: result.username,
        });
      })
      .catch(console.error);
  }, [token, setBot]);

  useEffect(() => {
    if (bot.username) {
      fetch(`${process.env.REACT_APP_API_URL}/telegram-data/${bot.username}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setBot((bot) => {
            console.log(data)
            return {
              ...bot,
              allUsersCount: data.allUsersCount,
              activeUsersCount: data.activeUsersCount,
              activeUsersId: data.activeUsersId
            };
          });
        });
    }
  }, [bot.username, setBot]);
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
            <SendMessage token={token} activeUsersId={bot.activeUsersId}/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <label>Название бота</label>
                <input type="text" value={bot.first_name} />
              </div>
              <div className="card-footer">
                <button className="btn btn-primary" type="submit">
                  Обновить
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <label>Аватарка</label>
                <input type="file" />
              </div>
              <div className="card-footer">
                <img src="" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bots;
