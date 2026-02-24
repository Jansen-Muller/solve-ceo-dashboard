import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-command-bg flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-5xl font-black font-mono text-command-text-muted mb-2">404</h1>
        <p className="text-xs text-command-text-muted uppercase tracking-widest mb-6">
          Route not found
        </p>
        <Link
          href="/"
          className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-black bg-status-amber rounded-sm hover:bg-status-amber/90 transition-colors inline-block"
        >
          Return to Command Center
        </Link>
      </div>
    </div>
  );
}
