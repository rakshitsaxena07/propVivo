import React from "react";

export default function VoiceControl() {
  const startCall = () => {
    console.log("Start call (use WebRTC here)");
  };

  const toggleModulation = () => {
    console.log("Toggle accent modulation");
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">Voice Controls</h2>
      <button onClick={startCall} className="btn-primary mb-2">
        Start Call
      </button>
      <button onClick={toggleModulation} className="btn-secondary">
        Toggle Accent Modulation
      </button>
    </div>
  );
}
