import React, { useContext, useEffect, useRef, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MyContext from "../context/context";
import { downloadTxtFile, useQuery } from "../functions";
import { getTelegramData } from "../network/telegramData";

const Deposists = () => {
  const {
    bot: { activeUsersWithClickId, username, loading },
    setLoading,
    setBot,
  } = useContext(MyContext);
  const [value, setValue] = useState("");
  const [filterBy, setFilterBy] = useState("telegram_id");
  const table = useRef();
  const [message, setMessage] = useState("");
  const [filteredDeposits, setFilteredDeposits] = useState([]);

  const formatDate = (date) => {
    const newDate = new Date(date);
    let day = newDate.getUTCDay();
    if (day.toString().length === 1) {
      day = `0${day}`;
    }

    let month = newDate.getUTCMonth();
    if (month.toString().length === 1) {
      month = `0${month}`;
    }

    const year = newDate.getUTCFullYear();
    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    if (activeUsersWithClickId === null) {
      setLoading(true);
    }

    if (activeUsersWithClickId && activeUsersWithClickId.length > 0) {
      setLoading(false);
      setMessage("");
      setFilteredDeposits(
        activeUsersWithClickId.filter((user) => {
          let filterToString = user[filterBy] + "";
          if (
            filterBy === "time_lead" ||
            filterBy === "time_click" ||
            filterBy === "time_sale"
          ) {
            filterToString = formatDate(user[filterBy]) + "";
          }
          return filterToString.toLowerCase().includes(value.toLowerCase());
        })
      );
    }
  }, [activeUsersWithClickId, filterBy, setLoading, value]);

  return (
    <>
      <div className="container">
        {message && <h2>{message}</h2>}
        {!!!loading && (
          <>
            <div className="mb-3 grid gap-lg-2">
              <button
                className="btn btn-success mb-3"
                onClick={() => downloadTxtFile(activeUsersWithClickId)}
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
                {!loading &&
                  filteredDeposits.length > 0 &&
                  filteredDeposits.map((user) => {
                    return (
                      <tr key={user.click_id}>
                        <th>
                          {user.time_lead ? formatDate(user.time_lead) : "-"}
                        </th>
                        <td>{user.amount ? user.amount : "-"}</td>
                        <td>{user.click_id ? user.click_id : "-"}</td>
                        <td>
                          {user.time_sale ? formatDate(user.time_sale) : "-"}
                        </td>
                        <td>
                          {user.time_click ? formatDate(user.time_click) : "-"}
                        </td>
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
