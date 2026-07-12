/**
 * @file ratio.tool.js
 * @description LangChain tool that wraps financial ratios and key metrics fetching services.
 */

import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { getRatios, getKeyMetrics } from '../../services/fmp/ratio.js';

/**
 * Financial Ratios & Metrics Tool.
 * Wraps FMP ratios and key metrics services.
 */
export const ratioTool = new DynamicStructuredTool({
  name: 'get_financial_ratios',
  description: 'Fetches financial ratios and key performance metrics (PE ratio, ROE, debt-to-equity, etc.) for a given stock symbol.',
  schema: z.object({
    symbol: z.string().describe('The stock ticker symbol (e.g., NVDA, AAPL).'),
    limit: z.number().optional().default(5).describe('The number of historical statement ratios to fetch.'),
  }),
  func: async ({ symbol, limit }) => {
    try {
      if (!symbol) {
        throw new Error('Ticker symbol is required.');
      }
      const upperSymbol = symbol.trim().toUpperCase();

      const [ratios, keyMetrics] = await Promise.all([
        getRatios(upperSymbol, limit),
        getKeyMetrics(upperSymbol, limit),
      ]);

      return {
        ratios,
        keyMetrics,
      };
    } catch (error) {
      throw new Error(`Failed to fetch financial ratios for ${symbol}: ${error.message}`);
    }
  },
});

export default ratioTool;
