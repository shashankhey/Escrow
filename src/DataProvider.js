// DataContext.js
import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [sentData, setSentData] = useState(null);
  const [receivedData, setReceivedData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const sendRequest = (data) => {
    // Simulate sending data to the server (replace with actual API call)
    setSentData(data);
  };

  const receiveData = (data) => {
    // Simulate receiving data from the server (replace with actual API call)
    setReceivedData(data);
  };

  const loginUser = (user) => {
    // Simulate user authentication (replace with actual authentication logic)
    setCurrentUser(user);
  };

  const logoutUser = () => {
    // Simulate user logout
    setCurrentUser(null);
  };

  return (
    <DataContext.Provider
      value={{
        sentData,
        receivedData,
        currentUser,
        sendRequest,
        receiveData,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
