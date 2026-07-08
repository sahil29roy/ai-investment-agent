import fmpClient from '../../config/axios.config.js';

export async function getEarningsCalendar(from, to) {
  try {
    const response = await fmpClient.get('/earning_calendar', {
      params: { from, to },
    });
    return response.data;
  } catch (error) {
    console.error(`Error in getEarningsCalendar from ${from} to ${to}:`, error.message);
    throw error;
  }
}

export async function getDividendCalendar(from, to) {
  try {
    const response = await fmpClient.get('/stock_dividend_calendar', {
      params: { from, to },
    });
    return response.data;
  } catch (error) {
    console.error(`Error in getDividendCalendar from ${from} to ${to}:`, error.message);
    throw error;
  }
}

export async function getIpoCalendar(from, to) {
  try {
    const response = await fmpClient.get('/ipo_calendar', {
      params: { from, to },
    });
    return response.data;
  } catch (error) {
    console.error(`Error in getIpoCalendar from ${from} to ${to}:`, error.message);
    throw error;
  }
}

export async function getSplitCalendar(from, to) {
  try {
    const response = await fmpClient.get('/stock_split_calendar', {
      params: { from, to },
    });
    return response.data;
  } catch (error) {
    console.error(`Error in getSplitCalendar from ${from} to ${to}:`, error.message);
    throw error;
  }
}
