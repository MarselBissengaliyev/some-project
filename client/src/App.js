import React, { useEffect, useState } from "react";
import Bots from "./components/Bots";
import { getIp, getParams } from "./functions";
import { createFacebookData } from "./network/facebookData";
import Pixels from "./components/Pixels";
import Deposists from "./components/Deposists";
import { getTelegramData } from "./network/telegramData";
import { Link, NavLink, Route, Routes } from "react-router-dom";

function App() {
  const [bot, setBot] = useState({
    first_name: "",
    username: "",
    activeUsersCount: 0,
    allUsersCount: 0,
    activeUsersId: [],
    desositedUsers: [],
    activeUsersWithClickId: [],
  });

  const [ip, setIp] = React.useState();
  useEffect(() => {
    getIp()
      .then((d) => setIp(d.ip))
      .catch(console.log);
  }, []);

  const params = getParams();
  const click_id = params.clickid;
  const pixel = params.fbp;
  const fb_click = params.fbclid;

  const user_agent = window.navigator.userAgent;
  const domain = window.location.hostname;

  useEffect(() => {
    if (!click_id || !pixel || !user_agent || !fb_click || !domain) {
      return;
    }
    if (ip) {
      createFacebookData({
        click_id,
        ip,
        user_agent,
        pixel,
        fb_click,
        domain,
      });
    }
  }, [ip, click_id, user_agent, pixel, fb_click, domain]);

  const handleClick = () => {
    window.location.href = `https://t.me/${bot.username}?start=${click_id}`;
  };

  useEffect(() => {
    if (bot.username) {
      getTelegramData(bot.username).then((data) => {
        setBot((bot) => ({
          ...bot,
          allUsersCount: data.allUsersCount,
          activeUsersCount: data.activeUsersCount,
          activeUsersId: data.activeUsersId,
          desositedUsers: data.desositedUsers,
          activeUsersWithClickId: data.activeUsersWithClickId,
        }));
      });
    }
  }, [bot.username, setBot]);

  const isMacroses = !!(click_id || fb_click || pixel);
  return (
    <div className="App">
      {isMacroses && (
        <button className="btn btn-primary" onClick={() => handleClick()}>
          Test
        </button>
      )}
      <div className="wrapper">
        <aside>
          <div
            className="d-flex flex-column flex-shrink-0 p-3 sidebar"
            style={{ width: 280 }}
          >
            <Link
              to="/"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
            >
              <span className="fs-4">Navigation</span>
            </Link>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link link-dark" aria-current="page">
                  Боты
                </NavLink>
              </li>
              <li>
                <NavLink to="/pixels" className="nav-link link-dark">
                  Пиксели
                </NavLink>
              </li>
              <li>
                <NavLink to="/deposits" className="nav-link link-dark">
                  Депозиты
                </NavLink>
              </li>
            </ul>
          </div>
        </aside>
        <main>
          <Routes>
            <Route path="/" element={<Bots setBot={setBot} bot={bot} />} />
            <Route path="/pixels" element={<Pixels />} />
            <Route
              path="/deposits"
              element={<Deposists activeUsers={bot.activeUsersWithClickId} />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
