import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { getTelegramData } from "./network/telegramData";
import Bots from "./pages/Bots";
import Deposists from "./pages/Deposists";
import Pixels from "./pages/Pixels";
import MyContext from "./context/context";
import Loading from "./components/Loading";
import { getGeneralData } from "./network/generalData";
import { getMe } from "./network/api.telegram";

function App() {
  const [bot, setBot] = useState({
    first_name: "",
    username: "",
    activeUsersCount: "",
    allUsersCount: "",
    desositedUsers: null,
    activeUsersWithClickId: null,
  });
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [showMass, setShowMass] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const [tokenUpdated, setTokenUpdated] = useState(false);
  const [tokenValue, setTokenValue] = useState(token);
  const [avatar, setAvatar] = useState(false);

  useEffect(() => {
    getGeneralData().then((data) => {
      setToken(data.bot_token);
      setAvatar(data.bot_avatar);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    
      getTelegramData(bot.username, { page: 1 })
        .then((data) => {
          setBot((bot) => ({
            ...bot,
            allUsersCount: data.allUsersCount,
            activeUsersCount: data.activeUsersCount,
            desositedUsers: data.desositedUsers,
            activeUsersWithClickId: data.activeUsersWithClickId,
          }));
        })
        .finally(() => {
          setLoading(false);
        });
    
  }, [bot.username, setBot, setLoading]);

  useEffect(() => {
    if (token) {
      getMe(token).then((data) => {
        const result = data.result;
        setBot((bot) => ({
          ...bot,
          first_name: result.first_name,
          username: result.username,
        }));
      });
    }
  }, [setBot, token]);

  return (
    <MyContext.Provider
      value={{
        bot,
        setBot,
        loading,
        setLoading,
        token,
        setToken,
        showMass,
        setShowMass,
        showStart,
        tokenUpdated,
        setShowStart,
        setTokenUpdated,
        tokenValue,
        setTokenValue,
        avatar,
        setAvatar,
      }}
    >
      <div className="App">
        <div className="wrapper">
          {loading && <Loading />}
          <Sidebar />
          <main>
            <Routes>
              <Route path="/" element={<Bots />} />
              <Route path="/pixels" element={<Pixels />} />
              <Route path="/deposits" element={<Deposists />} />
            </Routes>
          </main>
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;
