/**
 * @file company.tool.js
 * @description LangChain tool that wraps the company profile fetching service.
 */

import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { getProfile } from '../../services/fmp/company.js';

/**
 * Company Profile Tool.
 * Wraps the getProfile FMP service.
 */
export const companyTool = new DynamicStructuredTool({
  name: 'get_company_profile',
  description: 'Fetches the company profile including business description, sector, industry, and general company details.',
  schema: z.object({
    symbol: z.string().describe('The stock ticker symbol (e.g., NVDA, AAPL).'),
  }),
  func: async ({ symbol }) => {
    try {
      if (!symbol) {
        throw new Error('Ticker symbol is required.');
      }
      const data = await getProfile(symbol.trim().toUpperCase());
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch company profile for ${symbol}: ${error.message}`);
    }
  },
});

export default companyTool;
