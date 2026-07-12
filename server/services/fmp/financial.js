import fmpClient from '../../config/axios.config.js';
import { getMockFallback } from './mockFallback.js';

export async function getIncomeStatement(symbol, period = 'annual', limit = 5) {
  try {
    const response = await fmpClient.get('/income-statement', {
      params: { symbol, period, limit },
    });
    return response.data;
  } catch (error) {
    console.warn(`[FMP Service] getIncomeStatement failed for ${symbol} (${error.message}). Checking mock database...`);
    const fallback = getMockFallback(symbol);
    if (fallback) {
      return fallback.financials.incomeStatement;
    }
    throw error;
  }
}

export async function getBalanceSheet(symbol, period = 'annual', limit = 5) {
  try {
    const response = await fmpClient.get('/balance-sheet-statement', {
      params: { symbol, period, limit },
    });
    return response.data;
  } catch (error) {
    console.warn(`[FMP Service] getBalanceSheet failed for ${symbol} (${error.message}). Checking mock database...`);
    const fallback = getMockFallback(symbol);
    if (fallback) {
      return fallback.financials.balanceSheet;
    }
    throw error;
  }
}

export async function getCashFlow(symbol, period = 'annual', limit = 5) {
  try {
    const response = await fmpClient.get('/cash-flow-statement', {
      params: { symbol, period, limit },
    });
    return response.data;
  } catch (error) {
    console.warn(`[FMP Service] getCashFlow failed for ${symbol} (${error.message}). Checking mock database...`);
    const fallback = getMockFallback(symbol);
    if (fallback) {
      return fallback.financials.cashFlow;
    }
    throw error;
  }
}
