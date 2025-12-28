export default function Loader({ text = "Loading..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="max-w-2xl mx-auto mt-6 lg:mt-8 flex flex-col items-center gap-2"
    >
      <div
        className="w-8 h-8 rounded-full animate-spin 
                   border-4 border-blue-500 border-t-transparent"
      />
      <span className="text-sm text-slate-700 dark:text-slate-200">{text}</span>
    </div>
  );
}
