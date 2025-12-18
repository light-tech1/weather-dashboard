// Simple API helper for OpenWeatherMap
const API_KEY = import.meta.env.VITE_WEATHER_KEY;
const BASE = "https://api.openweathermap.org/data/2.5";

if (!API_KEY) {
  console.warn("VITE_WEATHER_KEY is not set. Please add it to your .env file.");
}

export async function fetchWeatherByCity(city) {
  const url = `${BASE}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  // return API's JSON (including error messages)
  return data;
}

export async function fetchWeatherByCoords(lat, lon) {
  const url = `${BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const res = await fetch(url);
  return res.json();
}
