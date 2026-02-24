// SOLVE CEO Dashboard – Mock Data
// All values in ZAR (South African Rand)
// Monthly Overhead: R2,230,000

export const MONTHLY_OVERHEAD = 2230000;

export const cashPosition = {
  cashAtBank: 1850000,
  overdraft: -420000,
  netPosition: 1430000,
  weeklyChange: -185000,
  monthsOfOverhead: 0.64, // netPosition / MONTHLY_OVERHEAD
};

export const overheadRecovery = {
  grossProfitMTD: 1890000,
  overheadTarget: MONTHLY_OVERHEAD,
  percentAbsorbed: 84.8, // (1890000 / 2230000) * 100
  remainingToAbsorb: 340000,
};

export const grossMargin = {
  actual: 27.4,
  target: 30,
  variance: -2.6,
  revenueMTD: 6890000,
  costOfSalesMTD: 5002000,
};

export const netProfit = {
  actual: 7.2,
  target: 10,
  variance: -2.8,
  netProfitMTD: 496000,
};

export const debtors = {
  totalAR: 14200000,
  ninetyPlusDays: 3800000,
  arCashRatio: 9.93, // totalAR / cashPosition.netPosition
  arDays: 62,
  previousArDays: 58,
};

export const factoryEfficiency = {
  averageEfficiency: 58.3,
  target: 65,
  machineCount: 12,
  bestMachine: { name: 'CNC-04', efficiency: 78.2 },
  worstMachine: { name: 'EXT-02', efficiency: 34.1 },
};

// Risk Radar Items
export interface RiskItem {
  issue: string;
  area: string;
  severity: 'Low' | 'Medium' | 'High';
  action: string;
}

export const riskRadarItems: RiskItem[] = [
  {
    issue: 'Scrap rate at 14.2%',
    area: 'Production',
    severity: 'High',
    action: 'Audit EXT-02 and CNC-07 tooling immediately',
  },
  {
    issue: 'EXT-02 running at 34.1%',
    area: 'Production',
    severity: 'High',
    action: 'Schedule maintenance shutdown or replace drive unit',
  },
  {
    issue: 'Overhead absorption at 84.8%',
    area: 'Finance',
    severity: 'Medium',
    action: 'Push high-margin orders to close gap before month-end',
  },
  {
    issue: 'AR days rising (58 → 62)',
    area: 'Finance',
    severity: 'Medium',
    action: 'Collections team to focus on 90+ day accounts',
  },
  {
    issue: 'Sales 8% below budget pace',
    area: 'Sales',
    severity: 'Medium',
    action: 'Review pipeline and accelerate Q1 order confirmations',
  },
  {
    issue: 'Toxic product mix at 38%',
    area: 'Sales',
    severity: 'High',
    action: 'Reduce 6-step builder ladder volume, push premium range',
  },
];

// Machine Data
export interface MachineData {
  name: string;
  efficiency: number;
  scrapKg: number;
  outputUnits: number;
  employees: number;
  trend: number; // vs last month
}

export const machineData: MachineData[] = [
  { name: 'CNC-04', efficiency: 78.2, scrapKg: 42, outputUnits: 1240, employees: 3, trend: 2.1 },
  { name: 'CNC-01', efficiency: 74.5, scrapKg: 58, outputUnits: 1180, employees: 3, trend: -1.3 },
  { name: 'PRE-01', efficiency: 71.8, scrapKg: 35, outputUnits: 980, employees: 2, trend: 3.4 },
  { name: 'CNC-03', efficiency: 68.9, scrapKg: 67, outputUnits: 1050, employees: 3, trend: 0.8 },
  { name: 'WLD-01', efficiency: 65.2, scrapKg: 88, outputUnits: 890, employees: 4, trend: -2.1 },
  { name: 'CNC-02', efficiency: 62.1, scrapKg: 72, outputUnits: 940, employees: 3, trend: 1.5 },
  { name: 'PRE-02', efficiency: 58.4, scrapKg: 95, outputUnits: 720, employees: 2, trend: -3.8 },
  { name: 'WLD-02', efficiency: 55.7, scrapKg: 110, outputUnits: 680, employees: 4, trend: -1.2 },
  { name: 'ASM-01', efficiency: 52.3, scrapKg: 45, outputUnits: 560, employees: 5, trend: 0.3 },
  { name: 'CNC-07', efficiency: 48.6, scrapKg: 142, outputUnits: 620, employees: 3, trend: -4.5 },
  { name: 'EXT-01', efficiency: 41.2, scrapKg: 168, outputUnits: 480, employees: 2, trend: -2.8 },
  { name: 'EXT-02', efficiency: 34.1, scrapKg: 215, outputUnits: 340, employees: 2, trend: -6.2 },
];

export const productionSummary = {
  totalScrapKg: 1137,
  aluAvgCostPerKg: 42.50,
  totalScrapValue: 48322.50,
  totalOutput: 9680,
  totalEmployees: 36,
  outputPerEmployee: 268.9,
};

// Sales & Margin Data
export interface ProductFamily {
  name: string;
  revenue: number;
  margin: number;
  percentOfTotal: number;
  isToxic: boolean;
}

export const salesData = {
  revenueMTD: 6890000,
  grossProfit: 1890000,
  overheadLine: MONTHLY_OVERHEAD,
  revenueTarget: 7500000,
  revenueBudgetPace: 92,
};

export const productFamilies: ProductFamily[] = [
  { name: '6-Step Builders Ladder', revenue: 2618200, margin: 12.8, percentOfTotal: 38.0, isToxic: true },
  { name: 'Extension Ladders', revenue: 1515800, margin: 34.2, percentOfTotal: 22.0, isToxic: false },
  { name: 'Platform Ladders', revenue: 1102400, margin: 31.5, percentOfTotal: 16.0, isToxic: false },
  { name: 'Step Ladders (Premium)', revenue: 827400, margin: 36.8, percentOfTotal: 12.0, isToxic: false },
  { name: 'Industrial Scaffolding', revenue: 551200, margin: 28.4, percentOfTotal: 8.0, isToxic: false },
  { name: 'Accessories & Parts', revenue: 275000, margin: 52.1, percentOfTotal: 4.0, isToxic: false },
];

export const monthlyTrend = [
  { month: 'Jul', revenue: 6200000, gp: 1720000 },
  { month: 'Aug', revenue: 6450000, gp: 1810000 },
  { month: 'Sep', revenue: 6100000, gp: 1650000 },
  { month: 'Oct', revenue: 6780000, gp: 1920000 },
  { month: 'Nov', revenue: 7100000, gp: 2050000 },
  { month: 'Dec', revenue: 5900000, gp: 1580000 },
  { month: 'Jan', revenue: 6890000, gp: 1890000 },
];

// Working Capital Data
export const workingCapital = {
  cash: 1430000,
  ar: 14200000,
  ap: 5800000,
  inventory: 8400000,
  arDays: 62,
  apDays: 34,
  inventoryDays: 45,
  liquidityPressure: (14200000 + 8400000 - 5800000) / MONTHLY_OVERHEAD, // 7.53x
};

// AI Executive Brief
export const executiveBrief = {
  financialRisk: 'Cash position covers only 0.64 months of overhead. AR at R14.2m with R3.8m past 90 days creates severe liquidity exposure. If two major debtors delay, the business faces overdraft pressure within 3 weeks.',
  operationalIssue: 'Factory efficiency at 58.3% is 6.7 points below target. EXT-02 at 34.1% is dragging the average. Scrap rate at 14.2% is converting R48k/month of aluminium into waste. Combined with rising LME prices, this is a direct margin destroyer.',
  positiveSignal: 'Premium product lines (Extension, Platform, Step Premium) are delivering 31-37% margins. If the sales mix shifts 10% from builders to premium, gross margin recovers to target within 2 months.',
  recommendations: [
    'Immediately cap 6-step builder ladder production to 30% of volume. Redirect capacity to premium lines.',
    'Place EXT-02 on emergency maintenance. If unrecoverable within 5 days, reallocate its orders to CNC-04.',
    'Collections blitz on R3.8m 90+ day AR. Offer 2% settlement discount for payment within 7 days.',
  ],
};
