import React, { useEffect, useRef, useState } from "react";

const Deposists = ({ activeUsers }) => {
  const [value, setValue] = useState("");
  const [filterBy, setFilterBy] = useState("telegram_id");
  const table = useRef();
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const filteredByTelegramId =
    activeUsers && activeUsers.length
      ? activeUsers.filter((user) => {
          const telegramIdToString = user[filterBy] + "";
          return telegramIdToString.toLowerCase().includes(value.toLowerCase());
        })
      : [];

  useEffect(() => {
    if (activeUsers === null) {
      setLoading(true);
    }

    if (activeUsers && (activeUsers.length === 0)) {
      setLoading(false);
      setMessage("Deposists is clear");
    }
  }, [activeUsers]);

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
        {message && <h1>{message}</h1>}
        {isLoading && <h1>Загрузка данных...</h1>}
        {!!(activeUsers && activeUsers.length) && (
          <>
            <div className="mb-3 grid gap-lg-2">
              <button
                className="btn btn-success mb-3"
                onClick={downloadTxtFile}
              >
                Скачать txt файл
              </button>
              <select
                onChange={(e) => setFilterBy(e.target.value)}
                className="form-select form-select-lg mb-3"
                name=""
                id=""
              >
                <option value="time_lead">time_lead</option>
                <option value="amount">amount</option>
                <option value="click_id">click_id</option>
                <option value="time_sale">time_sale</option>
                <option value="time_click">time_click</option>
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
            <table
              ref={table}
              className="table table-success table-striped-columns"
            >
              <thead>
                <tr>
                  <th>time_lead</th>
                  <th>amount</th>
                  <th>click_id</th>
                  <th>time_sale</th>
                  <th>time_click</th>
                </tr>
              </thead>
              <tbody>
                {filteredByTelegramId &&
                  filteredByTelegramId.map((user) => {
                    return (
                      <tr key={user.click_id}>
                        <th>{user.time_lead ? user.time_lead : "-"}</th>
                        <td>{user.amount ? user.amount : "-"}</td>
                        <td>{user.click_id ? user.click_id : "-"}</td>
                        <td>{user.time_sale ? user.time_sale : "-"}</td>
                        <td>{user.time_click ? user.time_click : "-"}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default Deposists;
