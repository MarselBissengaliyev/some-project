import React, { useEffect } from "react";

const Bots = ({ setBot, bot }) => {
  const token = process.env.REACT_APP_TELEGRAM_TOKEN;
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
      fetch(`${process.env.REACT_APP_API_URL}/${bot.username}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setBot((bot) => {
            return {
              ...bot,
              allUsersCount: data.allUsersCount,
              activeUsersCount: data.activeUsersCount,
            };
          });
        });
    }
  }, [bot.username, setBot]);
  return (
    <div>
      <h1>Вкладка Боты</h1>
      <ul>
        <li>
          Логин бота: <b>{bot.username}</b>
        </li>
        <li>
          Название бота: <b>{bot.first_name}</b>
        </li>
        <li>
          Количество Активных юзеров: <b>{bot.activeUsersCount}</b>
        </li>
        <li>
          Количество юзеров всего, которое когда либо нажимали кнопку старт:{" "}
          <b>{bot.allUsersCount}</b>
        </li>
      </ul>
    </div>
  );
};

export default Bots;
