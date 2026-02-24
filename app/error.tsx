'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-command-bg flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold font-mono text-status-red mb-2">SYSTEM ERROR</h1>
        <p className="text-xs text-command-text-muted mb-6 max-w-md">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-black bg-status-amber rounded-sm hover:bg-status-amber/90 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
