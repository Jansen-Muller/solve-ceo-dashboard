'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Error</h1>
        <p className="text-gray-600">{error.message}</p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
