import fmpClient from '../../config/axios.config.js';
import { getMockFallback } from './mockFallback.js';

export async function getQuote(symbol) {
  try {
    const response = await fmpClient.get('/quote', {
      params: { symbol },
    });
    return response.data;
  } catch (error) {
    console.warn(`[FMP Service] getQuote failed for ${symbol} (${error.message}). Checking mock database...`);
    const fallback = getMockFallback(symbol);
    if (fallback) {
      return [fallback.quote];
    }
    throw error;
  }
}

export async function getHistoricalPrice(symbol, timeseries = 30) {
  try {
    const response = await fmpClient.get('/historical-price-eod/full', {
      params: { symbol },
    });
    const data = Array.isArray(response.data) ? response.data.slice(0, timeseries) : [];
    return {
      symbol,
      historical: data,
    };
  } catch (error) {
    console.warn(`[FMP Service] getHistoricalPrice failed for ${symbol} (${error.message}). Checking mock database...`);
    const fallback = getMockFallback(symbol);
    if (fallback) {
      return {
        symbol,
        historical: []
      };
    }
    throw error;
  }
}
