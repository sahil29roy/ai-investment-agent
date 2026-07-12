import fmpClient from '../../config/axios.config.js';
import { getMockFallback } from './mockFallback.js';

export async function getRatios(symbol, limit = 5) {
  try {
    const response = await fmpClient.get('/ratios', {
      params: { symbol, limit },
    });
    return response.data;
  } catch (error) {
    console.warn(`[FMP Service] getRatios failed for ${symbol} (${error.message}). Checking mock database...`);
    const fallback = getMockFallback(symbol);
    if (fallback) {
      return fallback.ratios;
    }
    throw error;
  }
}

export async function getKeyMetrics(symbol, limit = 5) {
  try {
    const response = await fmpClient.get('/key-metrics', {
      params: { symbol, limit },
    });
    return response.data;
  } catch (error) {
    console.warn(`[FMP Service] getKeyMetrics failed for ${symbol} (${error.message}). Checking mock database...`);
    const fallback = getMockFallback(symbol);
    if (fallback) {
      return fallback.ratios; // Can reuse mock ratios / metrics
    }
    throw error;
  }
}
