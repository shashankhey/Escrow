// App.js
import React, { useState, useEffect } from "react";
import Header from "./Components/Headers";
import ContactDetails from "./Components/ContactDetails";
import "./App.css";
import LoginPage from "./Components/LoginPage";
import { DataProvider } from "./DataProvider";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedLoggedIn = localStorage.getItem("isLoggedIn");

    if (storedLoggedIn === "true" && storedUser) {
      setLoggedIn(true);
      setLoggedInUsername(storedUser);
    }
  }, []);

  const handleLogin = (username) => {
    setLoggedIn(true);
    setLoggedInUsername(username);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", username);
  };

  const handleLogout = (username) => {
    setLoggedIn(false);
    setLoggedInUsername(username);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
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
