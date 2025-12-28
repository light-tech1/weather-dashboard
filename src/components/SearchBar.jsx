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
    <div className="mb-6 w-full">
      <form
        onSubmit={submit}
        className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full max-w-2xl mx-auto"
      >
        <input
          className="w-full sm:flex-1 px-4 py-3 rounded-xl shadow-sm border border-gray-300 dark:border-slate-600
                     focus:outline-none focus:ring-2 focus:ring-sky-300 dark:bg-slate-700 dark:text-white"
          placeholder="Search city..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button
          type="submit"
          className={`w-full sm:w-auto px-6 py-3 rounded-xl
                     bg-blue-600 text-white shadow hover:bg-blue-700
                     transition-colors duration-200 disabled:opacity-60`}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
{recent.length > 0 && (
  <div className="flex flex-wrap justify-center gap-3 max-w-3xl lg:max-w-4xl mx-auto">
    {recent.map((city) => (
      <button
        key={city}
        onClick={() => onRecentClick?.(city)}
        className="text-sm px-4 py-2
          bg-white dark:bg-slate-800
          border border-gray-200 dark:border-slate-700
          rounded-full shadow-sm
          hover:bg-slate-100 dark:hover:bg-slate-700
          transition"
      >
        {city}
      </button>
    ))}
  </div>
)}

    </div>
  );
}
