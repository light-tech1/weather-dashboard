export default function WeatherCard({ data }) {
  return (
    <div className="bg-white mt-6 p-6 rounded-2xl shadow">
      <h2 className="text-3xl font-semibold">
        {data.name}, {data.sys.country}
      </h2>

      <div className="text-6xl font-bold mt-4">
        {Math.round(data.main.temp)}°C
      </div>

      <p className="text-lg text-gray-500 capitalize">
        {data.weather[0].description}
      </p>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-700">Humidity</p>
          <p className="text-xl font-semibold">{data.main.humidity}%</p>
        </div>

        <div className="text-center bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-700">Wind</p>
          <p className="text-xl font-semibold">{data.wind.speed} m/s</p>
        </div>

        <div className="text-center bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-700">Feels Like</p>
          <p className="text-xl font-semibold">
            {Math.round(data.main.feels_like)}°C
          </p>
        </div>
      </div>
    </div>
  );
}
