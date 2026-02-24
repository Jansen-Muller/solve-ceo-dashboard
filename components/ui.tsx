'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Status Dot Component
export function StatusDot({ status }: { status: 'green' | 'amber' | 'red' }) {
  const colors = {
    green: 'bg-status-green status-dot-green',
    amber: 'bg-status-amber status-dot-amber',
    red: 'bg-status-red status-dot-red',
  };
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${colors[status]}`} />;
}

// Get status based on value and thresholds
export function getStatus(
  value: number,
  greenMin: number,
  amberMin: number,
  invert = false
): 'green' | 'amber' | 'red' {
  if (invert) {
    if (value <= amberMin) return 'green';
    if (value <= greenMin) return 'amber';
    return 'red';
  }
  if (value >= greenMin) return 'green';
  if (value >= amberMin) return 'amber';
  return 'red';
}

// Format currency in ZAR
export function formatZAR(value: number, compact = false): string {
  if (compact) {
    if (Math.abs(value) >= 1000000) return `R${(value / 1000000).toFixed(2)}m`;
    if (Math.abs(value) >= 1000) return `R${(value / 1000).toFixed(0)}k`;
  }
  return `R${value.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  status: 'green' | 'amber' | 'red';
  details: { label: string; value: string }[];
  change?: { value: string; direction: 'up' | 'down' | 'flat' };
}

export function MetricCard({ title, value, subtitle, status, details, change }: MetricCardProps) {
  const statusBg = {
    green: 'border-l-status-green',
    amber: 'border-l-status-amber',
    red: 'border-l-status-red',
  };

  return (
    <div className={`metric-card border-l-4 ${statusBg[status]}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-command-text-muted">
          {title}
        </span>
        <StatusDot status={status} />
      </div>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-bold font-mono text-command-text">{value}</span>
        {change && (
          <span
            className={`text-xs font-mono ${
              change.direction === 'up' ? 'text-status-green' : change.direction === 'down' ? 'text-status-red' : 'text-command-text-muted'
            }`}
          >
            {change.direction === 'up' ? '▲' : change.direction === 'down' ? '▼' : '—'} {change.value}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-command-text-muted mb-3">{subtitle}</p>}
      <div className="space-y-1.5 mt-3 pt-3 border-t border-command-border">
        {details.map((d, i) => (
          <div key={i} className="flex justify-between text-xs">
            <span className="text-command-text-muted">{d.label}</span>
            <span className="font-mono font-medium text-command-text">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Navigation
const navItems = [
  { href: '/', label: 'Command' },
  { href: '/production', label: 'Production' },
  { href: '/sales', label: 'Sales & Margin' },
  { href: '/working-capital', label: 'Working Capital' },
];

export function CommandHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-command-header border-b border-command-border sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-status-amber rounded-sm flex items-center justify-center">
                <span className="text-black font-black text-xs">S</span>
              </div>
              <span className="font-bold text-sm tracking-wide text-command-text">
                SOLVE
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                    pathname === item.href
                      ? 'bg-command-border text-command-text'
                      : 'text-command-text-muted hover:text-command-text hover:bg-command-border/50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-command-text-muted uppercase tracking-wider">
              Factory Command Center
            </span>
            <div className="w-px h-4 bg-command-border" />
            <Link
              href="/login"
              className="text-xs font-medium text-command-text-muted hover:text-command-text transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// Section Header
export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-sm font-bold uppercase tracking-widest text-command-text">{title}</h2>
      {subtitle && <p className="text-xs text-command-text-muted mt-0.5">{subtitle}</p>}
    </div>
  );
}

// Severity Badge
export function SeverityBadge({ severity }: { severity: 'Low' | 'Medium' | 'High' }) {
  const styles = {
    Low: 'bg-status-green/10 text-status-green border-status-green/20',
    Medium: 'bg-status-amber/10 text-status-amber border-status-amber/20',
    High: 'bg-status-red/10 text-status-red border-status-red/20',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border rounded-sm ${styles[severity]}`}>
      {severity}
    </span>
  );
}

// Progress Bar
export function ProgressBar({
  value,
  max,
  status,
}: {
  value: number;
  max: number;
  status: 'green' | 'amber' | 'red';
}) {
  const pct = Math.min((value / max) * 100, 100);
  const colors = {
    green: 'bg-status-green',
    amber: 'bg-status-amber',
    red: 'bg-status-red',
  };
  return (
    <div className="w-full h-1.5 bg-command-border rounded-sm overflow-hidden">
      <div className={`h-full ${colors[status]} transition-all duration-500`} style={{ width: `${pct}%` }} />
    </div>
  );
}
