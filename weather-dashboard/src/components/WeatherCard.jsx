import React from "react";

function kmhFromMs(ms) {
  return Math.round((ms * 3600) / 1000);
}

function Icon({ icon, description }) {
  // OpenWeatherMap icon URL
  const url = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  return (
    <div className="flex items-center gap-4">
      <img src={url} alt={description} width={120} height={120} />
      <div>
        <p className="text-lg capitalize">{description}</p>
      </div>
    </div>
  );
}

export default function WeatherCard({ data }) {
  const temp = Math.round(data.main.temp);
  const feels = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
  const windMs = data.wind?.speed || 0;
  const windKmh = kmhFromMs(windMs);

  return (
    <div className="bg-white dark:bg-slate-800 mt-6 p-6 rounded-2xl shadow">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-3xl font-semibold">
            {data.name}, {data.sys?.country}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">{new Date(data.dt * 1000).toLocaleString()}</p>

          <div className="flex items-center gap-6 mt-4">
            <div className="text-6xl font-bold">{temp}°C</div>

            <div className="hidden sm:block">
              <Icon icon={data.weather[0].icon} description={data.weather[0].description} />
            </div>
          </div>
        </div>

        <div className="min-w-[160px] flex flex-col items-end gap-3">
          <div className="text-sm text-slate-500 dark:text-slate-300">Feels like</div>
          <div className="text-xl font-semibold">{feels}°C</div>

          <div className="text-sm text-slate-500 dark:text-slate-300 mt-2">Humidity</div>
          <div className="text-xl font-semibold">{humidity}%</div>

          <div className="text-sm text-slate-500 dark:text-slate-300 mt-2">Wind</div>
          <div className="text-xl font-semibold">{windKmh} km/h</div>
        </div>
      </div>

      {/* Mobile icon / description at bottom */}
      <div className="sm:hidden mt-6 flex items-center">
        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].description} />
        <p className="ml-3 capitalize">{data.weather[0].description}</p>
      </div>

      {/* Optional extra details */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg text-center">
          <div className="text-sm text-slate-500 dark:text-slate-300">Pressure</div>
          <div className="font-semibold">{data.main.pressure} hPa</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg text-center">
          <div className="text-sm text-slate-500 dark:text-slate-300">Visibility</div>
          <div className="font-semibold">{(data.visibility || 0) / 1000} km</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg text-center">
          <div className="text-sm text-slate-500 dark:text-slate-300">Cloudiness</div>
          <div className="font-semibold">{data.clouds?.all ?? 0}%</div>
        </div>
      </div>
    </div>
  );
}
