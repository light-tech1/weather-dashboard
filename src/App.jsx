import { useState, useEffect, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";
import { fetchWeatherByCity, fetchWeatherByCoords } from "./lib/api";

const AUTO_REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
const RECENT_KEY = "weather_dashboard_recent_searches";

export default function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recent, setRecent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    } catch {
      return [];
    }
  });

  const saveRecent = (city) => {
    setRecent((prev) => {
      const normalized = city.trim();
      if (!normalized) return prev;

      const next = [
        normalized,
        ...prev.filter((c) => c.toLowerCase() !== normalized.toLowerCase()),
      ].slice(0, 6);

      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  };

  const clearError = () => setError("");

  const loadWeather = useCallback(async (input) => {
    setLoading(true);
    setError("");

    try {
      let result;

      if (typeof input === "string") {
        result = await fetchWeatherByCity(input);
      } else if (input?.lat && input?.lon) {
        result = await fetchWeatherByCoords(input.lat, input.lon);
      } else {
        throw new Error("Invalid location");
      }

      if (Number(result?.cod) !== 200) {
        throw new Error(result.message || "City not found");
      }

      setWeather(result);
      if (result?.name) saveRecent(result.name);
    } catch (err) {
      setWeather(null);
      setError(err.message || "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (city) => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }
    setQuery(city.trim());
    loadWeather(city.trim());
  };

  const handleRecentClick = (city) => {
    setQuery(city);
    loadWeather(city);
  };

  const handleRefresh = () => {
    if (query) loadWeather(query);
    else if (weather?.coord)
      loadWeather({ lat: weather.coord.lat, lon: weather.coord.lon });
  };

  useEffect(() => {
    if (!weather) return;

    const id = setInterval(() => {
      handleRefresh();
    }, AUTO_REFRESH_INTERVAL_MS);

    return () => clearInterval(id);
  }, [weather, query, loadWeather]);

  useEffect(() => {
    if (weather || recent.length || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        loadWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => {}
    );
  }, [weather, recent.length, loadWeather]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100 dark:from-slate-900 dark:to-slate-800 px-4 py-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-sky-700 dark:text-sky-300 text-center sm:text-left drop-shadow-md">
            WeatherNow
          </h1>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => document.documentElement.classList.toggle("dark")}
              className="px-4 py-2 rounded-lg bg-white dark:bg-slate-700 text-sky-700 dark:text-sky-200 shadow hover:scale-105 transition-transform duration-200 w-full sm:w-auto"
            >
              Theme
            </button>

            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 disabled:opacity-60 transition-colors duration-200 w-full sm:w-auto"
            >
              Refresh
            </button>
          </div>
        </header>

        {/* Search */}
        <div className="mb-6">
          <SearchBar
            onSearch={handleSearch}
            initialValue={query}
            recent={recent}
            onRecentClick={handleRecentClick}
            className="w-full sm:w-3/4 lg:w-1/2 mx-auto"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-6">
          {loading && <Loader />}

          {error && (
            <ErrorMessage
              message={error}
              onClose={clearError}
              className="w-full sm:w-3/4 lg:w-1/2"
            />
          )}

          {weather && !loading && (
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
              <WeatherCard
                data={weather}
                className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-10 text-sm text-center text-slate-600 dark:text-slate-400">
          Powered by OpenWeatherMap
        </footer>
      </div>
    </div>
  );
}
