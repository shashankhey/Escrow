// Header.js
import React from "react";
import "../App.css";

function Header({ onLogout ,username,isLoggedIn}) {
  return (
    <div className="header">
      <h1>escrow</h1>
      <div className="loggedin">
      <h1>{username}</h1>
      {isLoggedIn && <button onClick={onLogout} className="logout-button">Logout</button>}
      </div>
    </div>
  );
}

export default Header;
