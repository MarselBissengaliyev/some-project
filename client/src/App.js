import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
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
      }).then(() => {

      });
  }, []);

  useEffect(() => {
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
      })
    }
  }, [ip])
  const handleClick = async () => {
    window.location.href = `https://t.me/umnico_test2_bot?start=${click_id}`;
  };

  if (!click_id || !fb_click || !pixel) {
    return <h1>У вас нет нужных макросов, кнопка не сработает</h1>;
  }
  return (
    <div className="App">
      <button onClick={() => handleClick()}>Test</button>
    </div>
  );
}

export default App;
