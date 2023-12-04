import React from "react";
import './Headers.css'; 

function Header({ onLogout ,username,isLoggedIn}) {
  return (
    <div className={`header ${isLoggedIn ? 'loggedin-header' : ''}`}>
    <h1 className="excrow-text"><strong>ESCROW</strong></h1>
    <div className="loggedin">
      {isLoggedIn ? (
        <>
          <h1>{username}</h1>
          <button style={{marginBottom: "15px"}} onClick={onLogout} className="logout-button">
            Logout
          </button>
        </>
      ) : null}
    </div>
  </div>
  );
}

export default Header;
