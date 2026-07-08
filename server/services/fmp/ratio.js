import fmpClient from '../../config/axios.config.js';

export async function getRatios(symbol, limit = 5) {
  try {
    const response = await fmpClient.get(`/ratios/${symbol}`, {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error(`Error in getRatios for symbol ${symbol}:`, error.message);
    throw error;
  }
}

export async function getKeyMetrics(symbol, limit = 5) {
  try {
    const response = await fmpClient.get(`/key-metrics/${symbol}`, {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error(`Error in getKeyMetrics for symbol ${symbol}:`, error.message);
    throw error;
  }
}
