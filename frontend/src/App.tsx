import React, { useState } from "react";
import axios from "./axios";

type Props = {};

const App = (props: Props) => {
  const data = {
    click_id: "qwdqwidhqwudhquwdgqwudhqu5",
    ip: "IPV6: 2001:0db8:85a3:0000:0000:8a2e:0370:7334",
    user_agent: "Chrome/87.0.4280.141",
    pixel: "83774992775344",
    fb_click: "fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890",
    domain: "site.com",
    time_click: "2023-03-11T15:51:00.745Z",
  };

  React.useEffect(() => {
    axios
      .post("/api/facebook-data/", data)
      .then((response) => {
        console.log(response);
        window.location.href = "https://t.me/umnico_test2_bot";
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <a
        href="https://t.me/umnico_test2_bot"
        target="_blank"
        rel="noopener noreferrer"
      >
        Telegram
      </a>
    </div>
  );
};

export default App;
