import fmpClient from '../../config/axios.config.js';

export async function getIncomeStatement(symbol, period = 'annual', limit = 5) {
  try {
    const response = await fmpClient.get(`/income-statement/${symbol}`, {
      params: { period, limit },
    });
    return response.data;
  } catch (error) {
    console.error(`Error in getIncomeStatement for symbol ${symbol}:`, error.message);
    throw error;
  }
}

export async function getBalanceSheet(symbol, period = 'annual', limit = 5) {
  try {
    const response = await fmpClient.get(`/balance-sheet-statement/${symbol}`, {
      params: { period, limit },
    });
    return response.data;
  } catch (error) {
    console.error(`Error in getBalanceSheet for symbol ${symbol}:`, error.message);
    throw error;
  }
}

export async function getCashFlow(symbol, period = 'annual', limit = 5) {
  try {
    const response = await fmpClient.get(`/cash-flow-statement/${symbol}`, {
      params: { period, limit },
    });
    return response.data;
  } catch (error) {
    console.error(`Error in getCashFlow for symbol ${symbol}:`, error.message);
    throw error;
  }
}
