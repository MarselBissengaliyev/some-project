import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { getTelegramData } from "./network/telegramData";
import Bots from "./pages/Bots";
import Deposists from "./pages/Deposists";
import Pixels from "./pages/Pixels";

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

  return (
    <div className="App">
      <div className="wrapper">
        <Sidebar />
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
