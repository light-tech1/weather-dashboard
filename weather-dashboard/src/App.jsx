import React, { useState, useEffect, useCallback } from "react";
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
      const next = [normalized, ...prev.filter((c) => c.toLowerCase() !== normalized.toLowerCase())].slice(0, 6);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  };

  const clearError = () => setError("");

  const handleSearch = async (city) => {
    if (!city || !city.trim()) {
      setError("Please enter a city name.");
      return;
    }
    setQuery(city.trim());
    await loadWeather(city.trim());
  };

  const loadWeather = useCallback(
    async (cityOrCoords) => {
      setError("");
      setLoading(true);
      setWeather(null);
      try {
        let result;
        if (typeof cityOrCoords === "string") {
          result = await fetchWeatherByCity(cityOrCoords);
        } else if (typeof cityOrCoords === "object" && cityOrCoords.lat && cityOrCoords.lon) {
          result = await fetchWeatherByCoords(cityOrCoords.lat, cityOrCoords.lon);
        } else {
          throw new Error("Invalid parameter to loadWeather");
        }

        if (result?.cod && Number(result.cod) !== 200) {
          // API returned an error object
          const msg = result.message || "Unable to fetch weather";
          setError(msg);
          setLoading(false);
          return;
        }

        setWeather(result);
        if (result?.name) saveRecent(result.name);
      } catch (err) {
        setError(err.message || "Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Auto-refresh when weather is loaded
  useEffect(() => {
    if (!weather) return;
    const id = setInterval(() => {
      if (query) loadWeather(query);
      else if (weather?.coord) loadWeather({ lat: weather.coord.lat, lon: weather.coord.lon });
    }, AUTO_REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [weather, query, loadWeather]);

  // Optional: detect user location on first load if no recent searches
  useEffect(() => {
    if (weather || recent.length) return;
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        loadWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => {
        // user denied or failed — do nothing
      }
    );
  }, [weather, recent.length, loadWeather]);

  const handleRecentClick = (city) => {
    setQuery(city);
    loadWeather(city);
  };

  const handleRefresh = () => {
    if (query) loadWeather(query);
    else if (weather?.coord) loadWeather({ lat: weather.coord.lat, lon: weather.coord.lon });
  };

  return (
    <div className="min-h-screen bg-sky-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">WeatherNow</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => document.documentElement.classList.toggle("dark")}
              className="px-3 py-1 bg-white/80 dark:bg-slate-700 rounded-md shadow"
              aria-label="Toggle theme"
            >
              Toggle theme
            </button>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-3 py-1 bg-blue-600 text-white rounded-md shadow disabled:opacity-60"
            >
              Refresh
            </button>
          </div>
        </header>

        <SearchBar onSearch={handleSearch} initialValue={query} recent={recent} onRecentClick={handleRecentClick} />

        {loading && <Loader />}

        {error && <ErrorMessage message={error} onClose={clearError} />}

        {weather && <WeatherCard data={weather} />}

        <footer className="mt-8 text-sm text-center text-slate-600 dark:text-slate-400">
          Powered by OpenWeatherMap — Remember to keep your API key private.
        </footer>
      </div>
    </div>
  );
}
