import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Error from "./components/Error";
import Loading from "./components/Loading";
import Sidebar from "./components/Sidebar";
import MyContext from "./context/context";
import { getMe } from "./network/api.telegram";
import { getGeneralData } from "./network/generalData";
import { getTelegramData } from "./network/telegramData";
import Bots from "./pages/Bots";
import Deposists from "./pages/Deposists";
import Pixels from "./pages/Pixels";

/*
 ** Main APP Component
 */
function App() {
  const [bot, setBot] = useState({
    first_name: "",
    username: "",
    activeUsersCount: "",
    allUsersCount: "",
  });
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [showMass, setShowMass] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const [tokenUpdated, setTokenUpdated] = useState(false);
  const [tokenValue, setTokenValue] = useState(token);
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    async function fetchGetGenetalData() {
      try {
        const data = await getGeneralData();

        setToken(data.bot_token);
        setAvatar(data.bot_avatar);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }
    fetchGetGenetalData();
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchGetMe() {
      try {
        const { result } = await getMe(token);

        setBot((bot) => ({
          ...bot,
          first_name: result.first_name,
          username: result.username,
        }));
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }

    if (token) {
      fetchGetMe();
    }

    setLoading(false);
  }, [token]);

  useEffect(() => {
    setLoading(true);
    async function fetchGetTelegramData() {
      const data = await getTelegramData(bot.username);

      setBot((bot) => ({
        ...bot,
        allUsersCount: data.allUsersCount,
        activeUsersCount: data.activeUsersCount,
      }));
    }

    if (bot.username) {
      fetchGetTelegramData();
    }

    setLoading(false);
  }, [bot.username]);

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
        setError,
      }}
    >
      <div className="App">
        {error && <Error error={error} />}
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
