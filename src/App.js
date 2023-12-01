// App.js
import React, { useState } from "react";
import Header from "./Components/Headers";
import ContactDetails from "./Components/ContactDetails";
import "./App.css";
import LoginPage from "./Components/LoginPage";
import { DataProvider } from "./DataProvider";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");

  const handleLogin = (username) => {
    setLoggedIn(true);
    setLoggedInUsername(username);
  };

  const handleLogout = (username) => {
    setLoggedIn(false);
    setLoggedInUsername(username);
  };

  return (
    <DataProvider>
      <div className="app-container">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div className="content-container">
          {isLoggedIn ? (
            <ContactDetails loggedInUsername={loggedInUsername} />
          ) : (
            <LoginPage onLogin={handleLogin} username={loggedInUsername} />
          )}
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
