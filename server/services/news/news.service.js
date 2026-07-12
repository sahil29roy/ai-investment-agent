import fmpClient from '../../config/axios.config.js';
import { getMockFallback } from '../fmp/mockFallback.js';

export async function getStockNews(tickers, limit = 10, page = 0) {
  try {
    const params = { limit, page };
    if (tickers) {
      params.symbols = Array.isArray(tickers) ? tickers.join(',') : tickers;
    }
    const response = await fmpClient.get('/news/stock', { params });
    return response.data;
  } catch (error) {
    console.warn(`[News Service] getStockNews failed for ${tickers} (${error.message}). Checking mock database...`);
    const fallback = getMockFallback(Array.isArray(tickers) ? tickers[0] : tickers);
    if (fallback) {
      return fallback.news;
    }
    throw error;
  }
}
