import React, { useEffect } from "react";
import CallNotification from "../calls/CallNotification";
import CustomerInfo from "../calls/CustomerInfo";
import VoiceControl from "../calls/VoiceControl";
import { startConnection, onMessageReceived } from "../../services/signalr"; // ✅ correct path and name


export default function Dashboard() {
  useEffect(() => {
    // Start SignalR connection
    startConnection();

    // Setup listener for messages from backend
    onMessageReceived((user, message) => {
      alert(`📞 Message from ${user}: ${message}`);
      console.log("📨 Received:", user, message);
    });

    // Optional: clean up on unmount
    return () => {
      // connection.stop(); // only if you want to stop it manually
    };
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      <CallNotification />
      <CustomerInfo />
      <VoiceControl />
    </div>
  );
}
