import React from "react";

function kmhFromMs(ms) {
  return Math.round((ms * 3600) / 1000);
}

export default function WeatherCard({ data }) {
  // 🛡️ Guard clause (VERY important)
  if (!data || !data.main || !data.weather) {
    return null;
  }

  const temp = Math.round(data.main.temp);
  const feels = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
  const windKmh = kmhFromMs(data.wind?.speed || 0);
  const icon = data.weather[0].icon;
  const description = data.weather[0].description;

  return (
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
      <h2 className="text-xl sm:text-2xl font-semibold">
        {data.name}, {data.sys?.country}
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-4">
        <div className="text-5xl sm:text-6xl font-bold">
          {temp}°C
        </div>

        <div className="flex items-center gap-4">
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            className="w-20 h-20 sm:w-24 sm:h-24"
          />
          <p className="capitalize text-lg">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 text-center">
        <div>
          <p className="text-sm text-gray-500">Temperature</p>
          <p className="font-semibold">{feels}°C</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Humidity</p>
          <p className="font-semibold">{humidity}%</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-sm text-gray-500">Wind</p>
          <p className="font-semibold">{windKmh} km/h</p>
        </div>
      </div>
    </div>
  );
}
