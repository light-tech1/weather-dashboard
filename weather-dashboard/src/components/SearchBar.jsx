import { useState } from "react";

export default function SearchBar({
  onSearch,
  initialValue = "",
  recent = [],
  onRecentClick,
  loading = false,
}) {
  const [value, setValue] = useState(initialValue);

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value.trim());
    setValue("");
  };

  return (
    <div className="mb-6">
      <form
        onSubmit={submit}
        className="flex flex-col sm:flex-row gap-3 items-stretch"
      >
        <input
          className="flex-1 w-full max-w-[500px] px-4 py-3 rounded-xl shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:bg-gray-100"
          placeholder="Search city (e.g., Accra, London, Tokyo)..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="City name"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white shadow hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {recent.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {recent.map((city) => (
            <button
              key={city}
              onClick={() => onRecentClick?.(city)}
              className="text-sm px-3 py-1 bg-white dark:bg-slate-800 border border-gray-200 rounded-full shadow-sm hover:bg-slate-50"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
