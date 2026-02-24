'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
import { CommandHeader, StatusDot } from '@/components/ui';

interface User {
  email?: string;
  id: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser({ email: user.email, id: user.id });
      setLoading(false);
    };
    checkUser();
  }, [router, supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-command-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-command-border border-t-status-amber rounded-full animate-spin mx-auto mb-3" />
          <span className="text-xs font-mono text-command-text-muted uppercase tracking-widest">
            Authenticating...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-command-bg">
      <CommandHeader />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-bold tracking-wide text-command-text">
              SECURE DASHBOARD
            </h1>
            <p className="text-xs text-command-text-muted mt-0.5">
              Authenticated access — Protected zone
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-command-text-muted border border-command-border rounded-sm hover:text-status-red hover:border-status-red/30 transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="command-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <StatusDot status="green" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-status-green">
              Session Active
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-command-text-muted">Email</span>
              <span className="font-mono text-command-text">{user?.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-command-text-muted">User ID</span>
              <span className="font-mono text-command-text text-xs">{user?.id}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
