'use client';

import {
  CommandHeader,
  SectionHeader,
  StatusDot,
  formatZAR,
  ProgressBar,
  getStatus,
} from '@/components/ui';
import {
  salesData,
  productFamilies,
  monthlyTrend,
  MONTHLY_OVERHEAD,
} from '@/lib/mock-data';

export default function SalesPage() {
  const toxicProducts = productFamilies.filter((p) => p.isToxic);
  const concentrationWarning = productFamilies.some((p) => p.percentOfTotal > 50);
  const maxRevenue = Math.max(...monthlyTrend.map((m) => m.revenue));

  return (
    <div className="min-h-screen bg-command-bg">
      <CommandHeader />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-bold tracking-wide text-command-text">
              SALES & MARGIN COMMAND
            </h1>
            <p className="text-xs text-command-text-muted mt-0.5">
              Revenue performance, margin analysis, product mix exposure
            </p>
          </div>
        </div>

        {/* Top Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="metric-card">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-command-text-muted block mb-1">
              Revenue MTD
            </span>
            <span className="text-xl font-bold font-mono text-command-text">
              {formatZAR(salesData.revenueMTD, true)}
            </span>
            <span className="text-xs text-command-text-muted block mt-1">
              Target: {formatZAR(salesData.revenueTarget, true)}
            </span>
          </div>
          <div className="metric-card">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-command-text-muted block mb-1">
              Gross Profit MTD
            </span>
            <span className="text-xl font-bold font-mono text-status-amber">
              {formatZAR(salesData.grossProfit, true)}
            </span>
            <span className="text-xs text-command-text-muted block mt-1">
              vs Overhead: {formatZAR(MONTHLY_OVERHEAD, true)}
            </span>
          </div>
          <div className="metric-card">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-command-text-muted block mb-1">
              Budget Pace
            </span>
            <span className="text-xl font-bold font-mono text-status-amber">
              {salesData.revenueBudgetPace}%
            </span>
            <span className="text-xs text-command-text-muted block mt-1">8% below target</span>
          </div>
          <div className="metric-card">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-command-text-muted block mb-1">
              Toxic Volume
            </span>
            <span className="text-xl font-bold font-mono text-status-red">38%</span>
            <span className="text-xs text-command-text-muted block mt-1">Threshold: 35%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
          {/* A) Contribution vs Overhead Chart */}
          <div className="command-panel">
            <div className="p-4 border-b border-command-border">
              <SectionHeader
                title="Contribution vs Overhead"
                subtitle="Monthly revenue, gross profit, and R2.23m overhead anchor"
              />
            </div>
            <div className="p-4">
              {/* Simple bar chart */}
              <div className="space-y-3">
                {monthlyTrend.map((month) => {
                  const revenueWidth = (month.revenue / maxRevenue) * 100;
                  const gpWidth = (month.gp / maxRevenue) * 100;
                  const overheadWidth = (MONTHLY_OVERHEAD / maxRevenue) * 100;

                  return (
                    <div key={month.month} className="flex items-center gap-3">
                      <span className="text-xs font-mono text-command-text-muted w-8 shrink-0">
                        {month.month}
                      </span>
                      <div className="flex-1 space-y-1">
                        <div className="relative h-4 bg-command-border/30 rounded-sm overflow-hidden">
                          <div
                            className="absolute h-full bg-command-accent/30 rounded-sm"
                            style={{ width: `${revenueWidth}%` }}
                          />
                          <div
                            className="absolute h-full bg-status-green/40 rounded-sm"
                            style={{ width: `${gpWidth}%` }}
                          />
                          {/* Overhead line */}
                          <div
                            className="absolute top-0 h-full w-px bg-status-red"
                            style={{ left: `${overheadWidth}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right shrink-0 w-32">
                        <span className="text-xs font-mono text-command-text">
                          {formatZAR(month.revenue, true)}
                        </span>
                        <span className="text-xs font-mono text-command-text-muted ml-2">
                          GP: {formatZAR(month.gp, true)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-command-border">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-2 bg-command-accent/30 rounded-sm" />
                  <span className="text-[10px] text-command-text-muted">Revenue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-2 bg-status-green/40 rounded-sm" />
                  <span className="text-[10px] text-command-text-muted">Gross Profit</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 bg-status-red" />
                  <span className="text-[10px] text-command-text-muted">Overhead (R2.23m)</span>
                </div>
              </div>
            </div>
          </div>

          {/* B) Product Mix Exposure */}
          <div className="command-panel">
            <div className="p-4 border-b border-command-border">
              <SectionHeader
                title="Product Mix Exposure"
                subtitle="Revenue concentration by product family"
              />
              {concentrationWarning && (
                <div className="mt-2 flex items-center gap-2 text-xs text-status-amber">
                  <StatusDot status="amber" />
                  Concentration warning: single category exceeds 50%
                </div>
              )}
            </div>
            <div className="p-4 space-y-3">
              {productFamilies.map((product) => {
                const marginStatus = getStatus(product.margin, 30, 20);
                return (
                  <div key={product.name} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-command-text">{product.name}</span>
                        {product.isToxic && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-status-red bg-status-red/10 px-1.5 py-0.5 rounded-sm">
                            TOXIC
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs font-mono">
                        <span className="text-command-text">{formatZAR(product.revenue, true)}</span>
                        <span className={`${
                          marginStatus === 'green' ? 'text-status-green' :
                          marginStatus === 'amber' ? 'text-status-amber' : 'text-status-red'
                        }`}>
                          {product.margin}%
                        </span>
                        <span className="text-command-text-muted w-10 text-right">
                          {product.percentOfTotal}%
                        </span>
                      </div>
                    </div>
                    <ProgressBar
                      value={product.percentOfTotal}
                      max={100}
                      status={product.isToxic ? 'red' : marginStatus}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* C) Toxic Volume Tracker */}
        <div className="command-panel border-l-4 border-l-status-red">
          <div className="p-4 border-b border-command-border">
            <SectionHeader
              title="Toxic Volume Tracker — 6-Step Builders Ladders"
              subtitle="Low-margin product consuming disproportionate capacity"
            />
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {toxicProducts.map((product) => (
                <div key={product.name} className="space-y-3">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-command-text-muted block mb-1">
                      Revenue
                    </span>
                    <span className="text-lg font-bold font-mono text-command-text">
                      {formatZAR(product.revenue, true)}
                    </span>
                  </div>
                </div>
              ))}
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-command-text-muted block mb-1">
                  Margin %
                </span>
                <span className="text-lg font-bold font-mono text-status-red">
                  {toxicProducts[0]?.margin}%
                </span>
                <span className="text-xs text-command-text-muted block mt-0.5">
                  Below 15% = Critical
                </span>
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-command-text-muted block mb-1">
                  % of Total Revenue
                </span>
                <span className="text-lg font-bold font-mono text-status-amber">
                  {toxicProducts[0]?.percentOfTotal}%
                </span>
                <span className="text-xs text-command-text-muted block mt-0.5">
                  Above 35% = Warning
                </span>
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-command-text-muted block mb-1">
                  Action Required
                </span>
                <p className="text-xs text-command-text-muted leading-relaxed">
                  Cap at 30% of volume. Redirect capacity to Extension and Platform lines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
