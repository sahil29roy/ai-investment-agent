/**
 * @file mockFallback.js
 * @description In-memory fallback database for top tickers when FMP API quota is reached.
 */

export const MOCK_COMPANIES = {
  MSFT: {
    symbol: 'MSFT',
    price: 415.60,
    marketCap: 2860700000000,
    beta: 1.13,
    lastDividend: 3.0,
    range: '315.00-430.00',
    change: 3.52,
    changesPercentage: 0.85,
    companyName: 'Microsoft Corporation',
    currency: 'USD',
    exchange: 'NASDAQ',
    industry: 'Software—Infrastructure',
    website: 'http://www.microsoft.com',
    description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. Its products include Operating Systems, cross-device productivity applications, server applications, business solution applications, desktop and server management tools, software development tools, and video games.',
    ceo: 'Satya Nadella',
    sector: 'Technology',
    fullTimeEmployees: '228000',
    ipoDate: '1986-03-13'
  },
  META: {
    symbol: 'META',
    price: 669.21,
    marketCap: 1698700000000,
    beta: 1.246,
    lastDividend: 2.1,
    range: '520.26-796.25',
    change: 37.73,
    changesPercentage: 5.97,
    companyName: 'Meta Platforms, Inc.',
    currency: 'USD',
    exchange: 'NASDAQ',
    industry: 'Internet Content & Information',
    website: 'http://www.meta.com',
    description: 'Meta Platforms, Inc. focuses on building products that enable people to connect and share through mobile devices, personal computers, virtual reality headsets, and wearables worldwide. It operates in two segments, Family of Apps and Reality Labs.',
    ceo: 'Mark Zuckerberg',
    sector: 'Communication Services',
    fullTimeEmployees: '76834',
    ipoDate: '2012-05-18'
  },
  AMZN: {
    symbol: 'AMZN',
    price: 245.34,
    marketCap: 2639100000000,
    beta: 1.461,
    lastDividend: 0.0,
    range: '196.00-278.56',
    change: -1.70,
    changesPercentage: -0.69,
    companyName: 'Amazon.com, Inc.',
    currency: 'USD',
    exchange: 'NASDAQ',
    industry: 'Specialty Retail',
    website: 'http://www.aboutamazon.com',
    description: 'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally. It operates through three segments: North America, International, and Amazon Web Services (AWS).',
    ceo: 'Andy Jassy',
    sector: 'Consumer Cyclical',
    fullTimeEmployees: '1560000',
    ipoDate: '1997-05-15'
  },
  AAPL: {
    symbol: 'AAPL',
    price: 178.20,
    marketCap: 2890000000000,
    beta: 1.24,
    lastDividend: 0.96,
    range: '164.08-198.11',
    change: 1.20,
    changesPercentage: 0.68,
    companyName: 'Apple Inc.',
    currency: 'USD',
    exchange: 'NASDAQ',
    industry: 'Consumer Electronics',
    website: 'http://www.apple.com',
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services.',
    ceo: 'Tim Cook',
    sector: 'Technology',
    fullTimeEmployees: '164000',
    ipoDate: '1976-03-12'
  },
  NVDA: {
    symbol: 'NVDA',
    price: 128.20,
    marketCap: 3150000000000,
    beta: 1.85,
    lastDividend: 0.04,
    range: '45.01-140.76',
    change: 4.82,
    changesPercentage: 3.91,
    companyName: 'NVIDIA Corporation',
    currency: 'USD',
    exchange: 'NASDAQ',
    industry: 'Semiconductors',
    website: 'http://www.nvidia.com',
    description: 'NVIDIA Corporation focuses on personal computer graphics, graphics processing units, and also on artificial intelligence solutions. It operates through Graphics and Compute & Networking segments.',
    ceo: 'Jensen Huang',
    sector: 'Technology',
    fullTimeEmployees: '29600',
    ipoDate: '1999-01-22'
  },
  TSLA: {
    symbol: 'TSLA',
    price: 175.40,
    marketCap: 552100000000,
    beta: 2.10,
    lastDividend: 0.00,
    range: '138.80-271.00',
    change: -2.10,
    changesPercentage: -1.18,
    companyName: 'Tesla, Inc.',
    currency: 'USD',
    exchange: 'NASDAQ',
    industry: 'Electric Vehicles',
    website: 'http://www.tesla.com',
    description: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States, China, and internationally.',
    ceo: 'Elon Musk',
    sector: 'Automotive',
    fullTimeEmployees: '140400',
    ipoDate: '2010-06-29'
  }
};

export const MOCK_FINANCIALS = {
  incomeStatement: [
    { calendarYear: '2025', revenue: 245000000000, netIncome: 72000000000 },
    { calendarYear: '2024', revenue: 211000000000, netIncome: 61000000000 }
  ],
  balanceSheet: [
    { calendarYear: '2025', totalAssets: 480000000000, totalLiabilities: 230000000000 }
  ],
  cashFlow: [
    { calendarYear: '2025', operatingCashFlow: 95000000000, capitalExpenditure: -25000000000 }
  ]
};

export const MOCK_RATIOS = {
  peRatio: 28.4,
  debtToEquity: 0.45,
  currentRatio: 1.8,
  returnOnEquity: 0.32
};

export const MOCK_NEWS = [
  {
    title: 'Market leaders expand enterprise cloud service footprint',
    site: 'TechDaily',
    publishedDate: '2026-07-10T12:00:00Z',
    sentiment: 'Positive',
    text: 'Enterprise software demand continues to grow robustly as cloud migration trends show no signs of slowing down.'
  },
  {
    title: 'Regulatory scrutiny intensifies regarding marketplace operations',
    site: 'Finance Wire',
    publishedDate: '2026-07-09T08:30:00Z',
    sentiment: 'Negative',
    text: 'A regulatory inquiry has been launched regarding antitrust and consumer protection policies.'
  }
];

export function getMockFallback(symbol) {
  const sym = symbol.toUpperCase();
  const company = MOCK_COMPANIES[sym];
  if (!company) return null;

  return {
    profile: [company],
    financials: MOCK_FINANCIALS,
    ratios: [MOCK_RATIOS],
    quote: {
      price: company.price,
      change: company.change,
      changesPercentage: company.changesPercentage,
      volume: 15000000,
      pe: MOCK_RATIOS.peRatio
    },
    news: MOCK_NEWS
  };
}
