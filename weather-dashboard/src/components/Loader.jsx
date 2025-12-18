import React from "react";

export default function Loader() {
  return (
    <div className="mt-6 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full animate-spin border-4 border-blue-400 border-t-transparent"></div>
      <div>Loading...</div>
    </div>
  );
}
