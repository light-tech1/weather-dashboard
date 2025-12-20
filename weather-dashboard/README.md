# 🌦️ WeatherNow — Weather Dashboard

WeatherNow is a responsive weather dashboard built with **React** and **Tailwind CSS**.  
It allows users to search for real-time weather conditions in cities around the world using the **OpenWeatherMap API**.

The project demonstrates API integration, state management, responsive UI design, and deployment-ready frontend architecture.

---
## ✨ Features

- 🔍 Search weather by city name
- 🌡️ Displays temperature, humidity, wind speed, and weather condition
- 🌤️ Dynamic weather icons from OpenWeatherMap
- 🔄 Auto-refresh weather data every 5 minutes
- 🔁 Manual refresh button
- 🧠 Recent searches saved in localStorage
- 🌍 Geolocation support (optional, on first load)
- 🌗 Light / Dark mode toggle
- ⚠️ Friendly error handling
- 📱 Fully responsive (desktop & mobile)

---

## 🛠️ Tech Stack

- **React JS** (Vite)
- **Tailwind CSS**
- **OpenWeatherMap API**
- **JavaScript (ES6+)**

---

## 📁 Project Structure

src/
├── components/
│ ├── SearchBar.jsx
│ ├── WeatherCard.jsx
│ ├── Loader.jsx
│ └── ErrorMessage.jsx
├── lib/
│ └── api.js
├── App.jsx
├── main.jsx
└── index.css
