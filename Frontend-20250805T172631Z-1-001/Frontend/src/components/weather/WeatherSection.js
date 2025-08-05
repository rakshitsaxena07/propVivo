import React, { useEffect, useState } from "react";

export default function WeatherSection() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch("http://localhost:5287/WeatherForecast");
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <p className="p-4">⏳ Loading weather data...</p>;
  if (error) return <p className="text-red-600 p-4">❌ {error}</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">📡 5-Day Weather Forecast</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-3">Date</th>
            <th className="py-2 px-3">Temp (°C)</th>
            <th className="py-2 px-3">Temp (°F)</th>
            <th className="py-2 px-3">Summary</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((entry, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-3">{entry.date}</td>
              <td className="py-2 px-3">{entry.temperatureC}</td>
              <td className="py-2 px-3">{entry.temperatureF}</td>
              <td className="py-2 px-3">{entry.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
