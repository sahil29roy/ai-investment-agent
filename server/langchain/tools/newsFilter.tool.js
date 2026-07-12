/**
 * @file newsFilter.tool.js
 * @description LangChain tool that wraps the AI news filtering service.
 */

import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { filterNews } from '../../services/ai/newsFilter.service.js';

/**
 * News Filtering Tool.
 * Wraps the AI news filter service.
 */
export const newsFilterTool = new DynamicStructuredTool({
  name: 'filter_news',
  description: 'Uses the Gemini AI service to clean raw news articles, keep only investment-relevant ones, classify sentiment, and rank them by significance.',
  schema: z.object({
    companyName: z.string().describe('The name of the company.'),
    newsArticles: z.array(z.any()).describe('The array of raw news articles to be filtered.'),
  }),
  func: async ({ companyName, newsArticles }) => {
    try {
      if (!companyName) {
        throw new Error('Company name is required for filtering.');
      }
      return await filterNews(companyName, newsArticles);
    } catch (error) {
      throw new Error(`Failed to filter news: ${error.message}`);
    }
  },
});

export default newsFilterTool;
