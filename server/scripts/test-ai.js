/**
 * @file test-ai.js
 * @description Script to test the AI news filter and investment analysis services.
 */

import { GEMINI_API_KEY } from '../config/env.js';
import { filterNews } from '../services/ai/newsFilter.service.js';
import { analyzeInvestment } from '../services/ai/investmentAnalysis.service.js';

// Mock news data
const mockNews = [
  {
    title: 'Apple Inc. Reports Record Q3 Earnings',
    text: 'Apple Inc. announced financial results for its fiscal 2026 third quarter today. The company posted a quarterly revenue record of $90.8 billion, up 5 percent year-over-year.',
    publishedDate: '2026-07-10',
    site: 'Financial News',
    url: 'https://example.com/apple-q3-earnings'
  },
  {
    title: 'Local Cat Rescued from Tree in Cupertino',
    text: 'A sweet domestic shorthair cat named Luna was successfully rescued from an oak tree in Cupertino yesterday afternoon by firefighters.',
    publishedDate: '2026-07-09',
    site: 'Cupertino Daily',
    url: 'https://example.com/cat-rescue'
  },
  {
    title: 'Apple Keynote: iPhone 18 Pro to Feature Groundbreaking AI Chip',
    text: 'At its yearly developer conference, Apple unveiled the iPhone 18 Pro showcasing a new neural processing unit built for complex real-time edge AI computations.',
    publishedDate: '2026-07-08',
    site: 'TechCrunch',
    url: 'https://example.com/iphone-18-pro'
  }
];

// Mock research data
const mockResearch = {
  profile: {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
    sector: 'Technology',
    industry: 'Consumer Electronics'
  },
  financials: {
    incomeStatement: [
      {
        date: '2025-09-30',
        revenue: 383285000000,
        netIncome: 96995000000,
        eps: 6.13
      }
    ],
    balanceSheet: [
      {
        date: '2025-09-30',
        totalAssets: 352581000000,
        totalLiabilities: 290437000000,
        totalStockholdersEquity: 62144000000
      }
    ]
  },
  ratios: {
    peRatio: 31.5,
    returnOnEquity: 1.56,
    debtToEquity: 4.67
  },
  stock: {
    price: 195.42,
    change: 1.25,
    volume: 52340000
  },
  events: [
    {
      eventName: 'Q4 2026 Earnings Release',
      eventDate: '2026-10-29'
    }
  ],
  news: [
    {
      title: 'Apple Inc. Reports Record Q3 Earnings',
      summary: 'Apple posted record Q3 revenue of $90.8 billion, showing steady 5% YoY growth.',
      sentiment: 'Positive',
      investmentImpact: 'High',
      reason: 'Strong earnings beat and positive growth trajectory directly support stock valuations.'
    }
  ]
};

async function runTests() {
  console.log('--- Starting AI Layer Integration Test ---');

  if (!GEMINI_API_KEY) {
    console.warn('\n[SKIPPED] GEMINI_API_KEY is not set. Skipping Gemini API integration tests.');
    console.warn('To test the services, please configure GEMINI_API_KEY in your server/.env file.');
    return;
  }

  try {
    console.log('\n1. Testing News Filter Service...');
    console.log(`Input: 3 articles (2 relevant, 1 irrelevant about a cat)`);
    
    const filterResult = await filterNews('Apple Inc.', mockNews);
    console.log('Output filtered news:', JSON.stringify(filterResult, null, 2));

    console.log('\n2. Testing Investment Analysis Service...');
    const analysisResult = await analyzeInvestment(mockResearch);
    console.log('Output analysis recommendation:', JSON.stringify(analysisResult, null, 2));

    console.log('\n--- AI Layer Integration Test PASSED ---');
  } catch (error) {
    console.error('\n--- AI Layer Integration Test FAILED ---');
    console.error(error.stack || error.message);
  }
}

runTests();
