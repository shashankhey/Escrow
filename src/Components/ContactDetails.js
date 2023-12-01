import React, { useState } from "react";
import "../App.css";
import usersData from "../user.json";
import UserDetailsForm from "./UserDetailsForm";

function ContactDetails({ loggedInUsername }) {
  const [selectedUsername, setSelectedUsername] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const otherUsers = usersData
  .filter((user) => user.username !== loggedInUsername)
  .map((user) => ({ id: user.id, username: user.username }));


  console.log("otherUsernames", otherUsers);

  const handleUsernameClick = (user) => {
    setSelectedUsername(user.username);
    setSelectedId(user.id);
  };

  return (
    <>
      <div className="contact-details">
        <h2>Contact Details</h2>
        <input
          className="search-icon"
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <hr />
        {otherUsers.map((user) => (
          <div>
            <div
              key={user.id}
              className="user-entry"
              onClick={() => handleUsernameClick(user)}
            >
              <img
                src="https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg?w=2048"
                alt="User Icon"
                className="user-icon"
              />
              <strong>{user.username}</strong>
              <hr />
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div>
        {selectedUsername && <UserDetailsForm username={selectedUsername} id={selectedId}/>}
      </div>
    </>
  );
}

export default ContactDetails;
