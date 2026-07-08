import fmpClient from '../../config/axios.config.js';

export async function getProfile(symbol) {
  try {
    const response = await fmpClient.get(`/profile/${symbol}`);
    return response.data;
  } catch (error) {
    console.error(`Error in getProfile for symbol ${symbol}:`, error.message);
    throw error;
  }
}

export async function searchCompanies(query, limit = 10) {
  try {
    const response = await fmpClient.get('/search', {
      params: { query, limit },
    });
    return response.data;
  } catch (error) {
    console.error(`Error in searchCompanies for query ${query}:`, error.message);
    throw error;
  }
}
