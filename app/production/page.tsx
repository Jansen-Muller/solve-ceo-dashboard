'use client';

import {
  CommandHeader,
  SectionHeader,
  StatusDot,
  getStatus,
  formatZAR,
  ProgressBar,
} from '@/components/ui';
import { machineData, productionSummary } from '@/lib/mock-data';

export default function ProductionPage() {
  const sortedMachines = [...machineData].sort((a, b) => b.efficiency - a.efficiency);
  const worst3 = sortedMachines.slice(-3);
  const worst3Names = worst3.map((m) => m.name);

  return (
    <div className="min-h-screen bg-command-bg">
      <CommandHeader />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-bold tracking-wide text-command-text">
              PRODUCTION COMMAND
            </h1>
            <p className="text-xs text-command-text-muted mt-0.5">
              Machine performance, scrap analysis, workforce output
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="metric-card">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-command-text-muted block mb-1">
              Total Scrap
            </span>
            <span className="text-xl font-bold font-mono text-status-red">
              {productionSummary.totalScrapKg.toLocaleString()} kg
            </span>
            <span className="text-xs text-command-text-muted block mt-1">
              {formatZAR(productionSummary.totalScrapValue)} value lost
            </span>
          </div>
          <div className="metric-card">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-command-text-muted block mb-1">
              Scrap Rate
            </span>
            <span className="text-xl font-bold font-mono text-status-red">14.2%</span>
            <span className="text-xs text-command-text-muted block mt-1">Threshold: 12%</span>
          </div>
          <div className="metric-card">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-command-text-muted block mb-1">
              Total Output
            </span>
            <span className="text-xl font-bold font-mono text-command-text">
              {productionSummary.totalOutput.toLocaleString()}
            </span>
            <span className="text-xs text-command-text-muted block mt-1">units this month</span>
          </div>
          <div className="metric-card">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-command-text-muted block mb-1">
              Output / Employee
            </span>
            <span className="text-xl font-bold font-mono text-command-text">
              {productionSummary.outputPerEmployee.toFixed(0)}
            </span>
            <span className="text-xs text-command-text-muted block mt-1">
              {productionSummary.totalEmployees} employees
            </span>
          </div>
        </div>

        {/* Machine Ranking Table */}
        <div className="command-panel mb-6">
          <div className="p-4 border-b border-command-border">
            <SectionHeader
              title="Machine Ranking"
              subtitle="Sorted by efficiency — best to worst"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full command-table">
              <thead>
                <tr>
                  <th className="w-8">#</th>
                  <th>Machine</th>
                  <th>Efficiency</th>
                  <th>Progress</th>
                  <th>Scrap (kg)</th>
                  <th>Scrap (R)</th>
                  <th>Output</th>
                  <th>Employees</th>
                  <th>Output/Emp</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {sortedMachines.map((machine, i) => {
                  const isWorst3 = worst3Names.includes(machine.name);
                  const effStatus = getStatus(machine.efficiency, 65, 55);
                  const scrapValue = machine.scrapKg * 42.5;
                  const outputPerEmp = (machine.outputUnits / machine.employees).toFixed(0);

                  return (
                    <tr
                      key={machine.name}
                      className={`hover:bg-command-border/20 transition-colors ${
                        isWorst3 ? 'bg-status-red/5' : ''
                      }`}
                    >
                      <td className="font-mono text-command-text-muted text-xs">{i + 1}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold text-sm">{machine.name}</span>
                          {isWorst3 && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-status-red bg-status-red/10 px-1.5 py-0.5 rounded-sm">
                              ALERT
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <StatusDot status={effStatus} />
                          <span className="font-mono font-bold">{machine.efficiency}%</span>
                        </div>
                      </td>
                      <td className="w-24">
                        <ProgressBar value={machine.efficiency} max={100} status={effStatus} />
                      </td>
                      <td className="font-mono text-sm">{machine.scrapKg}</td>
                      <td className="font-mono text-sm text-status-red">
                        {formatZAR(scrapValue)}
                      </td>
                      <td className="font-mono text-sm">{machine.outputUnits.toLocaleString()}</td>
                      <td className="font-mono text-sm text-center">{machine.employees}</td>
                      <td className="font-mono text-sm">{outputPerEmp}</td>
                      <td>
                        <span
                          className={`font-mono text-xs font-medium ${
                            machine.trend > 0
                              ? 'text-status-green'
                              : machine.trend < 0
                              ? 'text-status-red'
                              : 'text-command-text-muted'
                          }`}
                        >
                          {machine.trend > 0 ? '▲' : machine.trend < 0 ? '▼' : '—'}{' '}
                          {Math.abs(machine.trend).toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Worst 3 Machines Highlight */}
        <div className="command-panel border-l-4 border-l-status-red">
          <div className="p-4 border-b border-command-border">
            <SectionHeader
              title="Critical Machines — Immediate Attention Required"
              subtitle="Bottom 3 performers dragging factory average"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:divide-x divide-command-border">
            {worst3.map((machine) => (
              <div key={machine.name} className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <StatusDot status="red" />
                  <span className="font-mono font-bold text-lg">{machine.name}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-command-text-muted">Efficiency</span>
                    <span className="font-mono font-bold text-status-red">{machine.efficiency}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-command-text-muted">Scrap</span>
                    <span className="font-mono">{machine.scrapKg} kg ({formatZAR(machine.scrapKg * 42.5)})</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-command-text-muted">Trend</span>
                    <span className="font-mono text-status-red">▼ {Math.abs(machine.trend)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
