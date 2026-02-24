'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Check your email for the login link.' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-command-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-8 h-8 bg-status-amber rounded-sm flex items-center justify-center">
            <span className="text-black font-black text-sm">S</span>
          </div>
          <span className="font-bold text-lg tracking-wide text-command-text">SOLVE</span>
        </div>

        <div className="command-panel p-6">
          <h1 className="text-sm font-bold uppercase tracking-widest text-command-text mb-1">
            Command Center Access
          </h1>
          <p className="text-xs text-command-text-muted mb-6">
            Enter your email to receive a secure login link.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-[10px] font-semibold uppercase tracking-widest text-command-text-muted mb-1.5"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ceo@solve.co.za"
                required
                className="w-full px-3 py-2.5 bg-command-bg border border-command-border rounded-sm text-sm font-mono text-command-text placeholder:text-command-text-muted/40 focus:outline-none focus:border-command-accent transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-status-amber text-black text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-status-amber/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Sending...' : 'Request Access'}
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 p-3 rounded-sm text-xs ${
                message.type === 'success'
                  ? 'bg-status-green/10 text-status-green border border-status-green/20'
                  : 'bg-status-red/10 text-status-red border border-status-red/20'
              }`}
            >
              {message.text}
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <Link href="/" className="text-xs text-command-text-muted hover:text-command-text transition-colors">
            &larr; Back to Command Center
          </Link>
        </div>
      </div>
    </div>
  );
}
