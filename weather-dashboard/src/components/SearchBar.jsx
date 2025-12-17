import React, { useState } from "react";


export default function SearchBar({ onSearch, initialValue = "", recent = [], onRecentClick }) {
  const [value, setValue] = useState(initialValue);

  const submit = (e) => {
    e?.preventDefault();
    if (!value.trim()) return;
    onSearch(value.trim());
    setValue("");
  };

  return (
    <div className="mb-6">
      <form onSubmit={submit} className="flex gap-3 items-center">
        <input
          className="flex-1 w-full max-w-[500px] px-4 py-3 rounded-xl shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-300"
          placeholder="Search city (e.g., Accra, London, Tokyo)..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="City name"
        />
        <button
          onClick={submit}
          type="submit"
          className="px-6 py-3 rounded-xl bg-blue-600 text-white shadow hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {recent?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {recent.map((c) => (
            <button
              key={c}
              onClick={() => onRecentClick(c)}
              className="text-sm px-3 py-1 bg-white dark:bg-slate-800 border border-gray-200 rounded-full shadow-sm"
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
