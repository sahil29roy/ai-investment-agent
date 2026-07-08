import fmpClient from '../../config/axios.config.js';

export async function getStockNews(tickers, limit = 10, page = 0) {
  try {
    const params = { limit, page };
    if (tickers) {
      params.tickers = Array.isArray(tickers) ? tickers.join(',') : tickers;
    }
    const response = await fmpClient.get('/stock_news', { params });
    return response.data;
  } catch (error) {
    console.error(`Error in getStockNews for tickers ${tickers}:`, error.message);
    throw error;
  }
}
