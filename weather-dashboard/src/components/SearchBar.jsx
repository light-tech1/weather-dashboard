import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
    setCity(""); // reset
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-center gap-3"
    >
      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-96 px-4 py-3 rounded-xl shadow-sm border border-gray-300"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Search
      </button>
    </form>
  );
}
