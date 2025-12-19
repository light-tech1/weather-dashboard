import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ErrorMessage from "../components/ErrorMessage";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export default function Dashboard() {
  const [city, setCity] = useState("Accra");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    if (!cityName) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchWeather(city);
  }, []);

  // Auto refresh
  useEffect(() => {
    const interval = setInterval(() => {
      fetchWeather(city);
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [city]);

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
    fetchWeather(searchedCity);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Weather Dashboard
        </h1>

        <SearchBar onSearch={handleSearch} />

        {loading && (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Loading weather data...
          </p>
        )}

        {error && <ErrorMessage message={error} />}

        {weather && !loading && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
}
