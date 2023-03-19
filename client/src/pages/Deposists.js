import React, { useRef, useState } from "react";

const Deposists = ({ activeUsers }) => {
  const [value, setValue] = useState("");
  const [filterBy, setFilterBy] = useState("telegram_id");
  const table = useRef();
  const filteredByTelegramId = activeUsers
    ? activeUsers.filter((user) => {
        const telegramIdToString = user[filterBy] + "";
        return telegramIdToString.toLowerCase().includes(value.toLowerCase());
      })
    : [];

  function downloadTxtFile() {
    let csvContent = "";

    activeUsers &&
      activeUsers.forEach((item) => {
        if (item.click_id) {
          csvContent += `${item.click_id}:${item.amount}\n`;
        } else {
          csvContent += `${item.amount}\n`;
        }
      });

    const a = document.createElement("a");
    const file = new Blob([csvContent], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "table_data.txt";
    a.click();
  }

  return (
    <>
      <hr />
      <h2 className="text-center">Вкладка Депозиты</h2>
      <div className="container">
        <div className="mb-3 grid gap-lg-2">
          <button className="btn btn-success mb-3" onClick={downloadTxtFile}>
            Скачать txt файл
          </button>
          <select
            onChange={(e) => setFilterBy(e.target.value)}
            className="form-select form-select-lg mb-3"
            name=""
            id=""
          >
            <option value="telegram_id">telegram_id</option>
            <option value="first_name_telegram">first_name_telegram</option>
            <option value="login_telegram">login_telegram</option>
            <option value="is_activ">is_activ</option>
            <option value="telegram_bot_login">telegram_bot_login</option>
            <option value="is_deposit">is_deposit</option>
            <option value="time_lead">time_lead</option>
            <option value="amount">amount</option>
            <option value="umnico_lead_id">umnico_lead_id</option>
            <option value="telegram_bot_login">telegram_bot_login</option>
            <option value="click_id">click_id</option>
          </select>
        </div>
        {filterBy && (
          <input
            className="mb-3 form-control"
            placeholder="Поиск..."
            type="text"
            onChange={(e) => setValue(e.target.value)}
          />
        )}
        <table ref={table} class="table table-success table-striped-columns">
          <thead>
            <tr>
              <th>telegram_id</th>
              <th>first_name_telegram</th>
              <th>login_telegram</th>
              <th>is_activ</th>
              <th>telegram_bot_login</th>
              <th>is_deposit</th>
              <th>time_lead</th>
              <th>amount</th>
              <th>umnico_lead_id</th>
              <th>telegram_bot_login</th>
              <th>click_id</th>
            </tr>
          </thead>
          <tbody>
            {filteredByTelegramId &&
              filteredByTelegramId.map((user) => {
                return (
                  <tr>
                    <th>{user.telegram_id}</th>
                    <td>{user.first_name_telegram}</td>
                    <td>{user.login_telegram}</td>
                    <th>{user.is_activ ? "true" : "false"}</th>
                    <td>{user.telegram_bot_login}</td>
                    <td>{user.is_deposit ? "true" : "false"}</td>
                    <th>{user.time_lead}</th>
                    <td>{user.amount}</td>
                    <td>{user.umnico_lead_id ? user.umnico_lead_id : "-"}</td>
                    <td>{user.telegram_bot_login}</td>
                    <td>{user.click_id ? user.click_id : "-"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Deposists;
