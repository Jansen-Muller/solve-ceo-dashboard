'use client';

import {
  CommandHeader,
  SectionHeader,
  StatusDot,
  formatZAR,
  ProgressBar,
  getStatus,
} from '@/components/ui';
import { workingCapital, MONTHLY_OVERHEAD } from '@/lib/mock-data';

export default function WorkingCapitalPage() {
  const liquidityStatus = workingCapital.liquidityPressure > 4 ? 'red' : workingCapital.liquidityPressure > 3 ? 'amber' : 'green';
  const netWorkingCapital = workingCapital.ar + workingCapital.inventory - workingCapital.ap;

  return (
    <div className="min-h-screen bg-command-bg">
      <CommandHeader />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-bold tracking-wide text-command-text">
              WORKING CAPITAL COMMAND
            </h1>
            <p className="text-xs text-command-text-muted mt-0.5">
              Cash cycle, liquidity pressure, balance sheet snapshot
            </p>
          </div>
        </div>

        {/* Liquidity Pressure Indicator */}
        <div className={`command-panel border-l-4 mb-6 ${
          liquidityStatus === 'red' ? 'border-l-status-red' :
          liquidityStatus === 'amber' ? 'border-l-status-amber' : 'border-l-status-green'
        }`}>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <StatusDot status={liquidityStatus} />
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-command-text-muted">
                    Liquidity Pressure Indicator
                  </span>
                </div>
                <p className="text-xs text-command-text-muted mt-1">
                  (AR + Inventory &minus; AP) / Monthly Overhead
                </p>
              </div>
              <div className="text-right">
                <span className={`text-3xl font-bold font-mono ${
                  liquidityStatus === 'red' ? 'text-status-red' :
                  liquidityStatus === 'amber' ? 'text-status-amber' : 'text-status-green'
                }`}>
                  {workingCapital.liquidityPressure.toFixed(1)}x
                </span>
                <p className="text-xs text-command-text-muted mt-0.5">
                  {liquidityStatus === 'red' ? 'CRITICAL — Above 4x threshold' :
                   liquidityStatus === 'amber' ? 'WARNING — Approaching threshold' : 'NORMAL'}
                </p>
              </div>
            </div>
            <div className="mt-3">
              <ProgressBar
                value={Math.min(workingCapital.liquidityPressure, 8)}
                max={8}
                status={liquidityStatus}
              />
              <div className="flex justify-between mt-1">
                <span className="text-[9px] font-mono text-command-text-muted">0x</span>
                <span className="text-[9px] font-mono text-status-red">4x threshold</span>
                <span className="text-[9px] font-mono text-command-text-muted">8x</span>
              </div>
            </div>
          </div>
        </div>

        {/* Working Capital Snapshot */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="metric-card">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-command-text-muted block mb-1">
              Cash
            </span>
            <span className="text-xl font-bold font-mono text-command-text">
              {formatZAR(workingCapital.cash, true)}
            </span>
            <span className="text-xs text-command-text-muted block mt-1">Net position</span>
          </div>
          <div className="metric-card">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-command-text-muted block mb-1">
              Accounts Receivable
            </span>
            <span className="text-xl font-bold font-mono text-status-red">
              {formatZAR(workingCapital.ar, true)}
            </span>
            <span className="text-xs text-command-text-muted block mt-1">
              {workingCapital.arDays} days
            </span>
          </div>
          <div className="metric-card">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-command-text-muted block mb-1">
              Accounts Payable
            </span>
            <span className="text-xl font-bold font-mono text-status-green">
              {formatZAR(workingCapital.ap, true)}
            </span>
            <span className="text-xs text-command-text-muted block mt-1">
              {workingCapital.apDays} days
            </span>
          </div>
          <div className="metric-card">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-command-text-muted block mb-1">
              Inventory
            </span>
            <span className="text-xl font-bold font-mono text-status-amber">
              {formatZAR(workingCapital.inventory, true)}
            </span>
            <span className="text-xs text-command-text-muted block mt-1">
              {workingCapital.inventoryDays} days
            </span>
          </div>
        </div>

        {/* Cash Cycle Days */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
          <div className="command-panel">
            <div className="p-4 border-b border-command-border">
              <SectionHeader
                title="Cash Conversion Cycle"
                subtitle="Days tied up in working capital"
              />
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-command-text-muted">AR Days</span>
                    <span className="text-sm font-mono font-bold text-command-text">{workingCapital.arDays}</span>
                  </div>
                  <ProgressBar value={workingCapital.arDays} max={90} status={getStatus(workingCapital.arDays, 45, 60, true)} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-command-text-muted">Inventory Days</span>
                    <span className="text-sm font-mono font-bold text-command-text">{workingCapital.inventoryDays}</span>
                  </div>
                  <ProgressBar value={workingCapital.inventoryDays} max={90} status={getStatus(workingCapital.inventoryDays, 30, 45, true)} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-command-text-muted">AP Days</span>
                    <span className="text-sm font-mono font-bold text-status-green">{workingCapital.apDays}</span>
                  </div>
                  <ProgressBar value={workingCapital.apDays} max={90} status="green" />
                </div>
                <div className="pt-3 border-t border-command-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-command-text">Cash Conversion Cycle</span>
                    <span className="text-lg font-mono font-bold text-status-amber">
                      {workingCapital.arDays + workingCapital.inventoryDays - workingCapital.apDays} days
                    </span>
                  </div>
                  <p className="text-[10px] text-command-text-muted mt-1">
                    AR Days + Inventory Days &minus; AP Days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Balance Summary */}
          <div className="command-panel">
            <div className="p-4 border-b border-command-border">
              <SectionHeader
                title="Working Capital Structure"
                subtitle="Net working capital and composition"
              />
            </div>
            <div className="p-4">
              <div className="text-center mb-6">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-command-text-muted block mb-1">
                  Net Working Capital
                </span>
                <span className="text-3xl font-bold font-mono text-command-text">
                  {formatZAR(netWorkingCapital, true)}
                </span>
                <p className="text-xs text-command-text-muted mt-1">
                  {(netWorkingCapital / MONTHLY_OVERHEAD).toFixed(1)}x monthly overhead
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-command-bg rounded-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-8 bg-status-red/60 rounded-sm" />
                    <div>
                      <span className="text-xs font-medium text-command-text block">Accounts Receivable</span>
                      <span className="text-[10px] text-command-text-muted">{workingCapital.arDays} days outstanding</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-sm text-command-text">{formatZAR(workingCapital.ar, true)}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-command-bg rounded-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-8 bg-status-amber/60 rounded-sm" />
                    <div>
                      <span className="text-xs font-medium text-command-text block">Inventory</span>
                      <span className="text-[10px] text-command-text-muted">{workingCapital.inventoryDays} days on hand</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-sm text-command-text">{formatZAR(workingCapital.inventory, true)}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-command-bg rounded-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-8 bg-status-green/60 rounded-sm" />
                    <div>
                      <span className="text-xs font-medium text-command-text block">Accounts Payable</span>
                      <span className="text-[10px] text-command-text-muted">{workingCapital.apDays} days to pay</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-sm text-command-text">({formatZAR(workingCapital.ap, true)})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
