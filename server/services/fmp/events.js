import fmpClient from '../../config/axios.config.js';

export async function getEarningsCalendar(from, to) {
  try {
    const response = await fmpClient.get('/earnings-calendar', {
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
    const response = await fmpClient.get('/dividends-calendar', {
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
    const response = await fmpClient.get('/ipos-calendar', {
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
    const response = await fmpClient.get('/splits-calendar', {
      params: { from, to },
    });
    return response.data;
  } catch (error) {
    console.error(`Error in getSplitCalendar from ${from} to ${to}:`, error.message);
    throw error;
  }
}
