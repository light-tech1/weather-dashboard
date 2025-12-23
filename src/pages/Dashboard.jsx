import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";

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
        throw new Error("City not found. Please try another city.");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchWeather(city);
  }, []);

  // Auto refresh every 5 minutes
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
    <div className="min-h-screen bg-sky-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Weather Dashboard
        </h1>

        <SearchBar onSearch={handleSearch} loading={loading} />


        {loading && <Loader text="Fetching weather data..." />}


        {error && <ErrorMessage message={error} onClose={() => setError("")} />}

        {!weather && !loading && !error && (
          <p className="text-center text-gray-400">
            Search for a city to view current weather information
          </p>
        )}

        {weather && !loading && <WeatherCard weather={weather} />}

        <p className="text-center text-xs text-gray-400 pt-4">
          Powered by OpenWeatherMap
        </p>
      </div>
    </div>
  );
}
