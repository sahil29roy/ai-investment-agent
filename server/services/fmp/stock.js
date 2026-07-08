import fmpClient from '../../config/axios.config.js';

export async function getQuote(symbol) {
  try {
    const response = await fmpClient.get(`/quote/${symbol}`);
    return response.data;
  } catch (error) {
    console.error(`Error in getQuote for symbol ${symbol}:`, error.message);
    throw error;
  }
}

export async function getHistoricalPrice(symbol, timeseries = 30) {
  try {
    const response = await fmpClient.get(`/historical-price-full/${symbol}`, {
      params: { timeseries },
    });
    return response.data;
  } catch (error) {
    console.error(`Error in getHistoricalPrice for symbol ${symbol}:`, error.message);
    throw error;
  }
}
