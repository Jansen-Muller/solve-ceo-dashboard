# SOLVE CEO Dashboard V2 – Factory Command Center TODO

## Design System
- [x] Dark industrial color palette (charcoal header, off-white panels)
- [x] Strong typography (bold numeric values, no decorative fonts)
- [x] Status dot system (Green / Amber / Red)
- [x] Minimal rounded corners, clean grid layout
- [x] No gradients, no soft playful colors

## Factory Command View (Homepage)
- [x] Cash Position metric (bank, overdraft, net, weekly change, RED if < 1 month overhead)
- [x] Overhead Recovery metric (GP vs R2.23m overhead, % absorbed, Green/Amber/Red)
- [x] Gross Margin % metric (target 30%, variance, threshold colors)
- [x] Net Profit % metric (target 10%, variance, threshold colors)
- [x] Debtors (AR) metric (total, 90+ days, AR/Cash ratio, RED if AR > 8x Cash)
- [x] Factory Efficiency metric (target 65%, machine avg, threshold colors)

## CEO Risk Radar Panel
- [x] Operational Threat Monitor section
- [x] Auto-flag: Scrap > 12%, Machine < 40%, Overhead lag, AR days rising, Sales below budget, Toxic mix > 35%
- [x] Each issue: Issue, Area, Severity, Recommended action

## Production Page
- [x] Machine ranking (best to worst)
- [x] Scrap kg and R value conversion
- [x] Output per employee
- [x] Worst 3 machines highlighted
- [x] Trend vs last month

## Sales & Margin Page
- [x] Contribution vs Overhead chart (Revenue, GP, R2.23m overhead line)
- [x] Product Mix Exposure (concentration warning if > 50%)
- [x] Toxic Volume Tracker (6-step Builders ladders: revenue, margin %, % of total)

## Working Capital Panel
- [x] Cash, AR, AP, Inventory snapshot
- [x] AR Days, AP Days, Inventory Days
- [x] Liquidity Pressure Indicator ((AR + Inventory - AP) > 4x Monthly Overhead = Red)

## AI Executive Brief
- [x] Biggest financial risk
- [x] Biggest operational issue
- [x] Strongest positive signal
- [x] 3 sharp recommendations
- [x] Max 150-200 words, boardroom concise

## Future Expansion Stubs
- [ ] 10-Year Turnover Tracker (stub)
- [ ] Budget vs Strategic Plan (stub)
- [ ] Weekly Board Email Export PDF (stub)
- [ ] LME Aluminium Risk Tracker (stub)
- [ ] Mobile Executive Mode (stub)

## Infrastructure
- [x] Clean Next.js build for Vercel
- [x] Supabase integration maintained
- [x] Protected dashboard route
- [x] Login page
- [x] Fix build errors (Next.js version, React version, Tailwind config)
- [x] Push to main branch
