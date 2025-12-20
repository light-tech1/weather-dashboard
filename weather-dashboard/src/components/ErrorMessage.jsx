import React from "react";

export default function ErrorMessage({ message, onClose }) {
  return (
    <div
      role="alert"
      className="mt-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/30 
                 border border-red-200 dark:border-red-800 
                 text-red-700 dark:text-red-300 
                 flex items-center justify-between gap-4"
    >
      <p className="text-sm">{message}</p>

      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close error message"
          className="px-3 py-1 text-sm rounded-md bg-red-600 text-white 
                     hover:bg-red-700 transition"
        >
          ✕
        </button>
      )}
    </div>
  );
}
