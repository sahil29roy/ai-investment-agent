/**
 * @file events.tool.js
 * @description LangChain tool that wraps the earnings calendar fetching service.
 */

import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { getEarningsCalendar } from '../../services/fmp/events.js';

/**
 * Format Date helper to return YYYY-MM-DD.
 * @param {Date} date - The date object.
 * @returns {string} The formatted string.
 */
function formatDateString(date) {
  return date.toISOString().split('T')[0];
}

/**
 * Corporate Events/Calendar Tool.
 * Wraps FMP earnings calendar service.
 */
export const eventsTool = new DynamicStructuredTool({
  name: 'get_earnings_calendar',
  description: 'Fetches scheduled earnings announcement events and earnings calendar data for a given stock symbol.',
  schema: z.object({
    symbol: z.string().describe('The stock ticker symbol (e.g., NVDA, AAPL).'),
    from: z.string().optional().describe('Start date in YYYY-MM-DD format. Defaults to 90 days ago.'),
    to: z.string().optional().describe('End date in YYYY-MM-DD format. Defaults to 90 days in the future.'),
  }),
  func: async ({ symbol, from, to }) => {
    try {
      if (!symbol) {
        throw new Error('Ticker symbol is required.');
      }
      const upperSymbol = symbol.trim().toUpperCase();

      // Compute defaults if not provided
      let fromDateStr = from;
      let toDateStr = to;

      if (!fromDateStr) {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 90);
        fromDateStr = formatDateString(fromDate);
      }

      if (!toDateStr) {
        const toDate = new Date();
        toDate.setDate(toDate.getDate() + 90);
        toDateStr = formatDateString(toDate);
      }

      const rawCalendar = await getEarningsCalendar(fromDateStr, toDateStr);

      // Filter events by the requested symbol
      const filteredEvents = Array.isArray(rawCalendar)
        ? rawCalendar.filter((event) => event.symbol === upperSymbol)
        : [];

      return filteredEvents;
    } catch (error) {
      throw new Error(`Failed to fetch earnings calendar for ${symbol}: ${error.message}`);
    }
  },
});

export default eventsTool;
