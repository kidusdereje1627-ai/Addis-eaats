"use client";

export default function MenuError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-4 border border-red-500 bg-red-50 text-red-700 rounded">
      <h2 className="font-bold">⚠️ Failed to load menu segment</h2>
      <p>{error.message || "An unexpected error occurred."}</p>
      <button
        onClick={() => reset()}
        className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  );
}
