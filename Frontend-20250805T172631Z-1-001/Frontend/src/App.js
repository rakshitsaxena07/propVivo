import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import Layout from "./components/common/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import Users from "./components/users/Users";
import RoleManagement from "./components/roles/RoleManagement";
import MediaManagement from "./components/media/MediaManagement";
import WeatherSection from "./components/weather/WeatherSection";
import Settings from "./components/settings/Settings";

// SignalR setup
import { startConnection, onMessageReceived } from "./services/signalr";

export default function App() {
  useEffect(() => {
    startConnection();
    onMessageReceived((user, message) => {
      console.log(`🔔 Message from ${user}: ${message}`);
      // Optionally show a toast or update state/UI here
    });
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<RoleManagement />} />
          <Route path="/media" element={<MediaManagement />} />
          <Route path="/weather" element={<WeatherSection />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} /> {/* Fallback */}
        </Routes>
      </Layout>
    </Router>
  );
}
