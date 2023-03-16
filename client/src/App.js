import React, { useEffect, useState } from "react";
import Bots from "./components/Bots";

function App() {
  const [bot, setBot] = useState({
    first_name: '',
    username: '',
    activeUsersCount: 0,
    allUsersCount: 0
  });


  const [ip, setIp] = React.useState();
  const params = window.location.search
    .replace("?", "")
    .split("&")
    .reduce(function (p, e) {
      var a = e.split("=");
      p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
      return p;
    }, {});

  const click_id = params.clickid;
  const pixel = params.fbp;
  const fb_click = params.fbclid;

  const user_agent = window.navigator.userAgent;
  const domain = window.location.hostname;
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((d) => d.json())
      .then((d) => {
        setIp(d.ip);
      })
      .then(() => {});
  }, []);

  useEffect(() => {
    if (!click_id || !pixel || !user_agent || !fb_click || !domain) {
      return;
    }
    if (ip) {
      // https://back.roiup.team/api/facebook-data
      fetch("http://localhost:4444/api/facebook-data", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          click_id,
          ip,
          user_agent,
          pixel,
          fb_click,
          domain,
          time_click: new Date(),
        }),
      });
    }
  }, [ip, click_id, user_agent, pixel, fb_click, domain]);
  const handleClick = async () => {
    window.location.href = `https://t.me/umnico_test2_bot?start=${click_id}`;
  };

  const isMacroses = !!(click_id || fb_click || pixel);
  return (
    <div className="App">
      {!isMacroses ? (
        <h1>У вас нет нужных макросов, кнопка не сработает</h1>
      ) : (
        <button onClick={() => handleClick()}>Test</button>
      )}
      <Bots setBot={setBot} bot={bot}/>
    </div>
  );
}

export default App;
