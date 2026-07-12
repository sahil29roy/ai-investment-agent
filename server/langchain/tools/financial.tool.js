/**
 * @file financial.tool.js
 * @description LangChain tool that wraps the financial statements fetching services.
 */

import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { getIncomeStatement, getBalanceSheet, getCashFlow } from '../../services/fmp/financial.js';

/**
 * Financial Statements Tool.
 * Wraps FMP income statement, balance sheet, and cash flow services.
 */
export const financialTool = new DynamicStructuredTool({
  name: 'get_financial_statements',
  description: 'Fetches income statement, balance sheet statement, and cash flow statement for a given stock symbol.',
  schema: z.object({
    symbol: z.string().describe('The stock ticker symbol (e.g., NVDA, AAPL).'),
    period: z.enum(['annual', 'quarter']).optional().default('annual').describe('The period type, either annual or quarter.'),
    limit: z.number().optional().default(5).describe('The number of historical statements to fetch.'),
  }),
  func: async ({ symbol, period, limit }) => {
    try {
      if (!symbol) {
        throw new Error('Ticker symbol is required.');
      }
      const upperSymbol = symbol.trim().toUpperCase();

      const [incomeStatement, balanceSheet, cashFlow] = await Promise.all([
        getIncomeStatement(upperSymbol, period, limit),
        getBalanceSheet(upperSymbol, period, limit),
        getCashFlow(upperSymbol, period, limit),
      ]);

      return {
        incomeStatement,
        balanceSheet,
        cashFlow,
      };
    } catch (error) {
      throw new Error(`Failed to fetch financial statements for ${symbol}: ${error.message}`);
    }
  },
});

export default financialTool;
