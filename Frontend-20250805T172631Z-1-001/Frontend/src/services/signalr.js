import * as signalR from "@microsoft/signalr";

// ✅ Match this with your backend's launchSettings.json HTTP URL
const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5287/callhub") // ✅ Use HTTP for dev (to avoid HTTPS cert issues)
  .withAutomaticReconnect({
    nextRetryDelayInMilliseconds: retryContext => {
      console.warn(`🔁 Reconnecting in ${retryContext.previousRetryCount * 1000 + 3000}ms...`);
      return retryContext.previousRetryCount * 1000 + 3000;
    }
  })
  .configureLogging(signalR.LogLevel.Information)
  .build();

// ✅ Call this from Dashboard or App root
export const startConnection = async () => {
  try {
    await connection.start();
    console.log("✅ SignalR connected to backend");
  } catch (err) {
    console.error("❌ SignalR connection failed. Retrying...", err);
    setTimeout(startConnection, 3000); // Retry after delay
  }
};

// ✅ Register message listener
export const onMessageReceived = (callback) => {
  connection.on("ReceiveMessage", callback); // Must match backend hub method
};

export default connection;
