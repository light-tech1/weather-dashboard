import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import WeatherCard from "./components/WeatherCard.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";

const API_KEY = import.meta.env.VITE_WEATHER_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    try {
      setError("");
      setWeather(null);

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!res.ok) {
        setError("City not found");
        return;
      }

      const data = await res.json();
      setWeather(data);

    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <SearchBar onSearch={fetchWeather} />

      {error && <ErrorMessage message={error} />}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
}

export default App;
