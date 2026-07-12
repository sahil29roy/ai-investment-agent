/**
 * @file stock.tool.js
 * @description LangChain tool that wraps stock quote and historical price fetching services.
 */

import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { getQuote, getHistoricalPrice } from '../../services/fmp/stock.js';

/**
 * Stock Data Tool.
 * Wraps FMP stock quote and historical price services.
 */
export const stockTool = new DynamicStructuredTool({
  name: 'get_stock_data',
  description: 'Fetches stock quote (price, volume, change) and historical stock price data for a given stock symbol.',
  schema: z.object({
    symbol: z.string().describe('The stock ticker symbol (e.g., NVDA, AAPL).'),
    timeseries: z.number().optional().default(30).describe('The number of historical stock price days to fetch.'),
  }),
  func: async ({ symbol, timeseries }) => {
    try {
      if (!symbol) {
        throw new Error('Ticker symbol is required.');
      }
      const upperSymbol = symbol.trim().toUpperCase();

      const [quote, historicalPrice] = await Promise.all([
        getQuote(upperSymbol),
        getHistoricalPrice(upperSymbol, timeseries),
      ]);

      return {
        quote,
        historicalPrice,
      };
    } catch (error) {
      throw new Error(`Failed to fetch stock data for ${symbol}: ${error.message}`);
    }
  },
});

export default stockTool;
