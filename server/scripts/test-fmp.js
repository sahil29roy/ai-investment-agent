import { getProfile, searchCompanies } from '../services/fmp/company.js';
import { getIncomeStatement, getBalanceSheet, getCashFlow } from '../services/fmp/financial.js';
import { getRatios, getKeyMetrics } from '../services/fmp/ratio.js';
import { getQuote, getHistoricalPrice } from '../services/fmp/stock.js';
import { getEarningsCalendar, getDividendCalendar, getIpoCalendar, getSplitCalendar } from '../services/fmp/events.js';
import { getStockNews } from '../services/news/news.service.js';

const SYMBOL = 'AAPL';

async function testEndpoint(name, fn, ...args) {
  console.log(`\n--- Testing ${name} ---`);
  try {
    const data = await fn(...args);
    console.log(`Success! Response type: ${Array.isArray(data) ? 'Array' : typeof data}`);
    if (Array.isArray(data)) {
      console.log(`Array length: ${data.length}`);
      if (data.length > 0) {
        console.log('First element keys:', Object.keys(data[0]));
        console.log('Sample data (first element):', JSON.stringify(data[0], null, 2).slice(0, 500) + '...');
      } else {
        console.log('Empty array returned.');
      }
    } else if (data && typeof data === 'object') {
      console.log('Keys:', Object.keys(data));
      console.log('Sample data:', JSON.stringify(data, null, 2).slice(0, 500) + '...');
    } else {
      console.log('Response:', data);
    }
  } catch (error) {
    console.error(`FAILED:`, error.message);
    if (error.config) {
      console.log(`Request URL: ${error.config.url}`);
      console.log(`Request Params:`, error.config.params);
    }
  }
}

async function runTests() {
  console.log('Starting Financial Modeling Prep (FMP) Integration Tests...');

  // Company Services
  await testEndpoint('getProfile', getProfile, SYMBOL);
  await testEndpoint('searchCompanies', searchCompanies, 'Apple', 2);

  // Financial Services
  await testEndpoint('getIncomeStatement', getIncomeStatement, SYMBOL, 'annual', 1);
  await testEndpoint('getBalanceSheet', getBalanceSheet, SYMBOL, 'annual', 1);
  await testEndpoint('getCashFlow', getCashFlow, SYMBOL, 'annual', 1);

  // Ratio Services
  await testEndpoint('getRatios', getRatios, SYMBOL, 1);
  await testEndpoint('getKeyMetrics', getKeyMetrics, SYMBOL, 1);

  // Stock Services
  await testEndpoint('getQuote', getQuote, SYMBOL);
  await testEndpoint('getHistoricalPrice', getHistoricalPrice, SYMBOL, 3);

  // Calendar/Event Services
  const fromDate = '2026-06-01';
  const toDate = '2026-06-30';
  await testEndpoint('getEarningsCalendar', getEarningsCalendar, fromDate, toDate);
  await testEndpoint('getDividendCalendar', getDividendCalendar, fromDate, toDate);
  await testEndpoint('getIpoCalendar', getIpoCalendar, fromDate, toDate);
  await testEndpoint('getSplitCalendar', getSplitCalendar, fromDate, toDate);

  // News Services
  await testEndpoint('getStockNews', getStockNews, SYMBOL, 2);

  console.log('\nFMP Integration Tests Finished.');
}

runTests().catch((err) => {
  console.error('Test run failed:', err);
});
