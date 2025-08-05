import React, { useEffect, useState } from "react";
import { onMessageReceived } from "../../services/signalr"; // ✅ Use shared connection

export default function CallNotification() {
  const [incomingCall, setIncomingCall] = useState(null);

  useEffect(() => {
    // Register listener for incoming call
    onMessageReceived((user, message) => {
      if (user === "System" && message.startsWith("Call from")) {
        setIncomingCall({ phoneNumber: message.replace("Call from ", "") });
      }
    });
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">Incoming Call</h2>
      {incomingCall ? (
        <div>
          <p>📞 Call from: <strong>{incomingCall.phoneNumber}</strong></p>
        </div>
      ) : (
        <p>No incoming call</p>
      )}
    </div>
  );
}
