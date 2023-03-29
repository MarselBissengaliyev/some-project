import React, { useContext, useEffect, useRef, useState } from "react";
import MyContext from "../context/context";
import { downloadTxtFile, formatDate } from "../functions";
import { getDepositors } from "../network/telegramData";

const Deposists = () => {
  const {
    bot: { loading, username },
    setLoading,
    setError,
  } = useContext(MyContext);
  const [value, setValue] = useState("");
  const [filterBy, setFilterBy] = useState("time_lead");
  const table = useRef();
  const [filteredDeposits, setFilteredDeposits] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function fetchGetDeposits() {
      try {
        const deposits = await getDepositors(username);
        setFilteredDeposits(
          deposits.filter((user) => {
            let filterToString = user[filterBy] + "";
            if (
              filterBy === "time_lead" ||
              filterBy === "time_click" ||
              filterBy === "time_sale"
            ) {
              filterToString = formatDate(user[filterBy]);
            }
            return filterToString.toLowerCase().includes(value.toLowerCase());
          })
        );
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }
    if (username) {
      fetchGetDeposits();
    }

    setLoading(false);
  }, [filterBy, setError, setLoading, value, username]);

  return (
    <>
      <div className="container">
        {!!!loading && (
          <>
            <div className="mb-3 grid gap-lg-2">
              <button
                className="btn btn-success mb-3"
                onClick={() => downloadTxtFile(filteredDeposits)}
              >
                Скачать txt файл
              </button>
              <select
                onChange={(e) => setFilterBy(e.target.value)}
                className="form-select form-select-lg mb-3"
              >
                <option value="time_lead">time_lead</option>
                <option value="amount">amount</option>
                <option value="click_id">click_id</option>
                <option value="umnico_lead_id">umnico_lead_id</option>
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
                  <th>umnico_lead_id</th>
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
                        <td>{user.umnico_lead_id ? user.umnico_lead_id : "-"}</td>
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
