// ReceiverModal.js
import React from "react";
import { useDataContext } from "./DataContext";

function ReceiverModal() {
  const { receivedData } = useDataContext();

  return (
    <div>
      <h2>Receiver Modal</h2>
      {receivedData && (
        <div>
          <h3>Received Data</h3>
          <p>From: {receivedData.username}</p>
          <p>Message: {receivedData.message}</p>
        </div>
      )}
    </div>
  );
}

export default ReceiverModal;
