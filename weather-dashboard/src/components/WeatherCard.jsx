function kmhFromMs(ms) {
  return Math.round((ms * 3600) / 1000);
}

function Icon({ icon, description }) {
  const url = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <div className="flex items-center gap-4">
      <img src={url} alt={description} className="w-24 h-24" />
      <p className="text-lg capitalize">{description}</p>
    </div>
  );
}

export default function WeatherCard({ weather }) {
  const temp = Math.round(weather.main.temp);
  const feels = Math.round(weather.main.feels_like);
  const humidity = weather.main.humidity;
  const windKmh = kmhFromMs(weather.wind?.speed || 0);

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
      <div className="flex flex-col sm:flex-row justify-between gap-6">
        {/* Left */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
            {weather.name}, {weather.sys?.country}
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">
            {new Date(weather.dt * 1000).toLocaleString()}
          </p>

          <div className="flex items-center gap-6 mt-4">
            <div className="text-6xl font-bold text-gray-800 dark:text-white">
              {temp}°C
            </div>

            <div className="hidden sm:block">
              <Icon
                icon={weather.weather[0].icon}
                description={weather.weather[0].description}
              />
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-3 sm:items-end">
          <Info label="Feels like" value={`${feels}°C`} />
          <Info label="Humidity" value={`${humidity}%`} />
          <Info label="Wind" value={`${windKmh} km/h`} />
        </div>
      </div>

      {/* Mobile icon */}
      <div className="sm:hidden flex items-center mt-6">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <p className="ml-3 capitalize">
          {weather.weather[0].description}
        </p>
      </div>

      {/* Extra details */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        <Stat label="Pressure" value={`${weather.main.pressure} hPa`} />
        <Stat label="Visibility" value={`${(weather.visibility || 0) / 1000} km`} />
        <Stat label="Cloudiness" value={`${weather.clouds?.all ?? 0}%`} />
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <>
      <span className="text-sm text-slate-500 dark:text-slate-300">{label}</span>
      <span className="text-xl font-semibold text-gray-800 dark:text-white">
        {value}
      </span>
    </>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg text-center">
      <div className="text-sm text-slate-500 dark:text-slate-300">{label}</div>
      <div className="font-semibold text-gray-800 dark:text-white">{value}</div>
    </div>
  );
}
