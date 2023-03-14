import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  React.useEffect(() => {
    fetch("/api/facebook-data", {
      method: "POST",
      body: {
        click_id: "333",
        ip: "212.13.189.143",
        user_agent: "test ua2",
        pixel: "fb.1.1558571054389.1098115397",
        fb_click: "fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890",
        domain: "landing.com",
        time_click: new Date(),
      },
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
