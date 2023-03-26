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
    desositedUsers: null,
    activeUsersWithClickId: null,
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
    setTimeout(() => {
      getGeneralData().then((data) => {
        setToken(data.bot_token);
        setAvatar(data.bot_avatar);
        setLoading(false);
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (token) {
      setLoading(true);
      setTimeout(() => {
        getMe(token).then((data) => {
          const result = data.result;
          setBot((bot) => ({
            ...bot,
            first_name: result.first_name,
            username: result.username,
          }));
          setLoading(false);
        });
      }, 1000)
    }
  }, [setBot, token]);

  useEffect(() => {
    setLoading(true);

    async function setupGetTelegramData() {
      let error = "";

      if (bot.username) {
        await getTelegramData(bot.username)
          .then((data) => {
            setBot((bot) => ({
              ...bot,
              allUsersCount: data.allUsersCount,
              activeUsersCount: data.activeUsersCount,
              desositedUsers: data.desositedUsers,
              activeUsersWithClickId: data.activeUsersWithClickId,
            }));
          })
          .then((data) => {
            setError("");
            error = "";
          })
          .catch((err) => {
            error = err.message;
            setError(err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }

      if (error) {
        return {
          error,
        };
      }
      return {
        success: true,
      };
    }

    setTimeout(() => {
      setupGetTelegramData((data) => {
        setLoading(false);
        if (data.error) {
          return setError(data.error);
        }
        setError("");
      });
    }, 1000)
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
