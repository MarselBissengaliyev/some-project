import React, { useEffect, useState } from "react";
import Bots from "./components/Bots";
import { getIp, getParams } from "./functions";
import { createFacebookData } from "./network/facebookData";

function App() {
  const [bot, setBot] = useState({
    first_name: "",
    username: "",
    activeUsersCount: 0,
    allUsersCount: 0,
    activeUsersId: [],
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

  const isMacroses = !!(click_id || fb_click || pixel);
  return (
    <div className="App">
      {!isMacroses ? (
        <h1 className="text-center">
          У вас нет нужных макросов, кнопка не сработает
        </h1>
      ) : (
        <button onClick={() => handleClick()}>Test</button>
      )}
      <Bots setBot={setBot} bot={bot} />
    </div>
  );
}

export default App;
