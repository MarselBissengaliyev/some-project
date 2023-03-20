import React, { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { getIp, getParams } from "./functions";
import { createFacebookData } from "./network/facebookData";
import { getTelegramData } from "./network/telegramData";
import Bots from "./pages/Bots";
import Deposists from "./pages/Deposists";
import Pixels from "./pages/Pixels";
import Sidebar from "./components/Sidebar";

function App() {
  const [bot, setBot] = useState({
    first_name: "Name",
    username: "Username",
    activeUsersCount: 0,
    allUsersCount: 0,
    activeUsersId: [],
    desositedUsers: [],
    activeUsersWithClickId: [],
  });

  const [ip, setIp] = React.useState();
  useEffect(() => {
    getIp().then((d) => setIp(d.ip));
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
        <Sidebar/>
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
