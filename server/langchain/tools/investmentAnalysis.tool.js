/**
 * @file investmentAnalysis.tool.js
 * @description LangChain tool that wraps the AI investment analysis service.
 */

import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { analyzeInvestment } from '../../services/ai/investmentAnalysis.service.js';

/**
 * Investment Analysis Tool.
 * Wraps the AI investment analysis service.
 */
export const investmentAnalysisTool = new DynamicStructuredTool({
  name: 'analyze_investment',
  description: 'Uses the Gemini AI service to perform a thorough SWOT and financial analysis and recommendation on the collected company research data.',
  schema: z.object({
    research: z.object({
      profile: z.any().describe('Company profile.'),
      financials: z.any().describe('Financial statements.'),
      ratios: z.any().describe('Financial ratios.'),
      stock: z.any().describe('Stock price and volume data.'),
      events: z.any().describe('Corporate earnings and calendar events.'),
      news: z.any().describe('Cleaned, investment-relevant news articles.'),
    }).describe('The aggregated research dataset for the target company.'),
  }),
  func: async ({ research }) => {
    try {
      if (!research) {
        throw new Error('Research dataset is required.');
      }
      return await analyzeInvestment(research);
    } catch (error) {
      throw new Error(`Failed to perform investment analysis: ${error.message}`);
    }
  },
});

export default investmentAnalysisTool;
