import React from "react";

export default function ErrorMessage({ message, onClose }) {
  return (
    <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center justify-between">
      <div>{message}</div>
      {onClose && (
        <button onClick={onClose} className="ml-4 px-2 py-1 bg-red-600 text-white rounded">
          Close
        </button>
      )}
    </div>
  );
}
