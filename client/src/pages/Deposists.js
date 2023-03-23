import React, { useContext, useEffect, useRef, useState } from "react";
import { Pagination } from "react-bootstrap";
import MyContext from "../context/context";
import { downloadTxtFile } from "../functions";
import { getTelegramData } from "../network/telegramData";

const Deposists = () => {
  const {
    bot: { activeUsersWithClickId, depositedUsersCount, username, loading },
    setLoading,
    setBot,
  } = useContext(MyContext);

  const [value, setValue] = useState("");
  const [filterBy, setFilterBy] = useState("telegram_id");
  const table = useRef();
  const [message, setMessage] = useState("");
  const [filteredDeposits, setFilteredDeposits] = useState([]);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

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
    setLoading(true);

    if (username) {
      getTelegramData(username, { page: page }).then((data) => {
        setBot((bot) => ({
          ...bot,
          allUsersCount: data.allUsersCount,
          activeUsersCount: data.activeUsersCount,
          desositedUsers: data.desositedUsers,
          activeUsersWithClickId: data.activeUsersWithClickId,
          depositedUsersCount: data.depositedUsersCount,
        }));
        setPageCount(data.depositedUsersCount);
        setLoading(false);
      });
    }
  }, [setBot, username, setLoading, page]);

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
          console.log(user[filterBy])
          if (filterBy === 'time_lead' || filterBy === 'time_click' || filterBy === 'time_sale') {
            filterToString = formatDate(user[filterBy]) + "";
          }
          return filterToString.toLowerCase().includes(value.toLowerCase());
        })
      );
      // console.log(activeUsersWithClickId)
    }
  }, [activeUsersWithClickId, filterBy, setLoading, value]);

  function handlePrev() {
    setPage((p) => {
      if (p === 1) {
        return p;
      }
      return p - 1;
    });
  }

  function handleNext() {
    setPage((p) => {
      if (p === pageCount) {
        return p;
      }
      return p + 1;
    });
  }

  return (
    <>
      <div className="container">
        {message && <h2>{message}</h2>}
        {!!(!loading) && (
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
            <Pagination>
              <Pagination.First
                disabled={page === 1}
                onClick={() => setPage(1)}
              />
              <Pagination.Prev onClick={handlePrev} />
              <Pagination.Item active>{page}</Pagination.Item>
              <Pagination.Next onClick={handleNext} />
              <Pagination.Last
                disabled={page === pageCount}
                onClick={() => setPage(+depositedUsersCount)}
              />
            </Pagination>
          </>
        )}
      </div>
    </>
  );
};

export default Deposists;
