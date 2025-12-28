import React from "react";

function kmhFromMs(ms) {
  return Math.round((ms * 3600) / 1000);
}

export default function WeatherCard({ data }) {
  if (!data || !data.main || !data.weather?.length) return null;

  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
  const windKmh = kmhFromMs(data.wind?.speed || 0);
  const icon = data.weather[0].icon;
  const description = data.weather[0].description;

  return (
    <div className="mt-6 p-6 sm:p-8 lg:p-10 bg-white dark:bg-slate-800 rounded-2xl shadow-lg w-full">
      
      {/* City */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sky-700 dark:text-sky-300 text-center lg:text-left">
        {data.name}, {data.sys?.country}
      </h2>

      {/* Temperature + Icon */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mt-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-sky-600 dark:text-sky-300">
            {temp}°C
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <img
              src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
              alt={description}
              className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32"
            />
            <p className="capitalize text-lg sm:text-xl lg:text-2xl text-slate-700 dark:text-slate-200 mt-2 sm:mt-0 text-center sm:text-left">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Stats: Temperature (Feels like), Humidity, Wind */}
      <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4 w-full">
        {/* Temperature */}
        <div className="flex-1 bg-slate-50 dark:bg-slate-700 p-4 rounded-xl text-center sm:text-left">
          <p className="text-sm text-slate-500 dark:text-slate-300">Temperature</p>
          <p className="text-xl sm:text-2xl font-semibold">{feelsLike}°C</p>
        </div>

        {/* Humidity */}
        <div className="flex-1 bg-slate-50 dark:bg-slate-700 p-4 rounded-xl text-center sm:text-left">
          <p className="text-sm text-slate-500 dark:text-slate-300">Humidity</p>
          <p className="text-xl sm:text-2xl font-semibold">{humidity}%</p>
        </div>

        {/* Wind */}
        <div className="flex-1 bg-slate-50 dark:bg-slate-700 p-4 rounded-xl text-center sm:text-left">
          <p className="text-sm text-slate-500 dark:text-slate-300">Wind</p>
          <p className="text-xl sm:text-2xl font-semibold">{windKmh} km/h</p>
        </div>
      </div>
    </div>
  );
}
