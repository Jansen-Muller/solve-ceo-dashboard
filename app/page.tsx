'use client';

import {
  CommandHeader,
  MetricCard,
  SectionHeader,
  SeverityBadge,
  ProgressBar,
  formatZAR,
  getStatus,
} from '@/components/ui';
import {
  cashPosition,
  overheadRecovery,
  grossMargin,
  netProfit,
  debtors,
  factoryEfficiency,
  riskRadarItems,
  executiveBrief,
  MONTHLY_OVERHEAD,
} from '@/lib/mock-data';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-command-bg">
      <CommandHeader />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
        {/* Title Bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-bold tracking-wide text-command-text">
              SOLVE CEO Dashboard
            </h1>
            <p className="text-xs text-command-text-muted mt-0.5">
              Factory Command View &middot; January 2025 MTD
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-command-text-muted">
              Last sync: 14:32 SAST
            </span>
            <span className="w-2 h-2 rounded-full bg-status-green status-dot-green" />
          </div>
        </div>

        {/* 6 Command Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          <MetricCard
            title="Cash Position"
            value={formatZAR(cashPosition.netPosition, true)}
            subtitle={`${cashPosition.monthsOfOverhead} months overhead cover`}
            status={getStatus(cashPosition.monthsOfOverhead, 3, 1)}
            change={{ value: formatZAR(Math.abs(cashPosition.weeklyChange), true), direction: 'down' }}
            details={[
              { label: 'Cash at Bank', value: formatZAR(cashPosition.cashAtBank, true) },
              { label: 'Overdraft', value: formatZAR(cashPosition.overdraft, true) },
              { label: 'Monthly Overhead', value: formatZAR(MONTHLY_OVERHEAD, true) },
            ]}
          />
          <MetricCard
            title="Overhead Recovery"
            value={`${overheadRecovery.percentAbsorbed}%`}
            subtitle={`${formatZAR(overheadRecovery.remainingToAbsorb, true)} remaining to absorb`}
            status={getStatus(overheadRecovery.percentAbsorbed, 100, 80)}
            details={[
              { label: 'GP MTD', value: formatZAR(overheadRecovery.grossProfitMTD, true) },
              { label: 'Overhead Target', value: formatZAR(overheadRecovery.overheadTarget, true) },
            ]}
          />
          <MetricCard
            title="Gross Margin"
            value={`${grossMargin.actual}%`}
            subtitle={`Target: ${grossMargin.target}% (${grossMargin.variance > 0 ? '+' : ''}${grossMargin.variance}%)`}
            status={getStatus(grossMargin.actual, grossMargin.target, grossMargin.target - 5)}
            change={{ value: `${Math.abs(grossMargin.variance)}%`, direction: grossMargin.variance >= 0 ? 'up' : 'down' }}
            details={[
              { label: 'Revenue MTD', value: formatZAR(grossMargin.revenueMTD, true) },
              { label: 'COGS MTD', value: formatZAR(grossMargin.costOfSalesMTD, true) },
            ]}
          />
          <MetricCard
            title="Net Profit"
            value={`${netProfit.actual}%`}
            subtitle={`Target: ${netProfit.target}% (${netProfit.variance > 0 ? '+' : ''}${netProfit.variance}%)`}
            status={getStatus(netProfit.actual, netProfit.target, netProfit.target - 5)}
            change={{ value: `${Math.abs(netProfit.variance)}%`, direction: netProfit.variance >= 0 ? 'up' : 'down' }}
            details={[
              { label: 'Net Profit MTD', value: formatZAR(netProfit.netProfitMTD, true) },
            ]}
          />
          <MetricCard
            title="Debtors"
            value={formatZAR(debtors.totalAR, true)}
            subtitle={`AR Days: ${debtors.arDays} (prev: ${debtors.previousArDays})`}
            status={getStatus(debtors.arDays, 45, 60, true)}
            change={{ value: `${debtors.arDays - debtors.previousArDays}d`, direction: debtors.arDays > debtors.previousArDays ? 'down' : 'up' }}
            details={[
              { label: '90+ Days', value: formatZAR(debtors.ninetyPlusDays, true) },
              { label: 'AR:Cash Ratio', value: `${debtors.arCashRatio.toFixed(1)}x` },
            ]}
          />
          <MetricCard
            title="Factory Efficiency"
            value={`${factoryEfficiency.averageEfficiency}%`}
            subtitle={`Target: ${factoryEfficiency.target}% | ${factoryEfficiency.machineCount} machines`}
            status={getStatus(factoryEfficiency.averageEfficiency, factoryEfficiency.target, factoryEfficiency.target - 10)}
            details={[
              { label: 'Best', value: `${factoryEfficiency.bestMachine.name} (${factoryEfficiency.bestMachine.efficiency}%)` },
              { label: 'Worst', value: `${factoryEfficiency.worstMachine.name} (${factoryEfficiency.worstMachine.efficiency}%)` },
            ]}
          />
        </div>

        {/* Risk Radar + AI Brief */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Radar */}
          <div>
            <SectionHeader title="CEO Risk Radar" subtitle="Operational Threat Monitor" />
            <div className="space-y-2">
              {riskRadarItems.map((item, i) => (
                <div
                  key={i}
                  className="metric-card flex items-start gap-3"
                >
                  <SeverityBadge severity={item.severity} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold text-command-text">{item.issue}</span>
                      <span className="text-[10px] text-command-text-muted">({item.area})</span>
                    </div>
                    <p className="text-[11px] text-command-text-muted">{item.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Executive Brief */}
          <div>
            <SectionHeader title="AI Executive Brief" subtitle="Automated Analysis" />
            <div className="space-y-3">
              <div className="metric-card border-l-4 border-l-status-red">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-status-red mb-1.5">
                  Financial Risk
                </div>
                <p className="text-xs text-command-text leading-relaxed">
                  {executiveBrief.financialRisk}
                </p>
              </div>
              <div className="metric-card border-l-4 border-l-status-amber">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-status-amber mb-1.5">
                  Operational Issue
                </div>
                <p className="text-xs text-command-text leading-relaxed">
                  {executiveBrief.operationalIssue}
                </p>
              </div>
              <div className="metric-card border-l-4 border-l-status-green">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-status-green mb-1.5">
                  Positive Signal
                </div>
                <p className="text-xs text-command-text leading-relaxed">
                  {executiveBrief.positiveSignal}
                </p>
              </div>
              <div className="metric-card">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-command-text-muted mb-2">
                  Recommendations
                </div>
                <ol className="space-y-2">
                  {executiveBrief.recommendations.map((rec, i) => (
                    <li key={i} className="flex gap-2 text-xs text-command-text leading-relaxed">
                      <span className="font-mono font-bold text-status-amber shrink-0">{i + 1}.</span>
                      {rec}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Overhead Recovery Progress */}
        <div className="mt-8 metric-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-command-text-muted">
              Overhead Recovery Progress
            </span>
            <span className="text-xs font-mono text-command-text">
              {overheadRecovery.percentAbsorbed}%
            </span>
          </div>
          <ProgressBar
            value={overheadRecovery.grossProfitMTD}
            max={overheadRecovery.overheadTarget}
            status={getStatus(overheadRecovery.percentAbsorbed, 100, 80)}
          />
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-command-text-muted">
              GP: {formatZAR(overheadRecovery.grossProfitMTD, true)}
            </span>
            <span className="text-[10px] text-command-text-muted">
              Target: {formatZAR(overheadRecovery.overheadTarget, true)}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
