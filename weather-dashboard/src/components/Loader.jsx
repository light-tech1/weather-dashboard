import React from "react";

export default function Loader({ text = "Loading..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-6 flex items-center justify-center gap-3 text-gray-600 dark:text-gray-300"
    >
      <div
        className="w-8 h-8 rounded-full animate-spin 
                   border-4 border-blue-500 border-t-transparent"
      />
      <span className="text-sm">{text}</span>
    </div>
  );
}
