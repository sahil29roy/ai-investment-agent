/**
 * @file news.tool.js
 * @description LangChain tool that wraps the stock news fetching service.
 */

import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { getStockNews } from '../../services/news/news.service.js';

/**
 * Company News Tool.
 * Wraps FMP stock news service.
 */
export const newsTool = new DynamicStructuredTool({
  name: 'get_company_news',
  description: 'Fetches recent stock market news articles related to a given stock ticker symbol.',
  schema: z.object({
    symbol: z.string().describe('The stock ticker symbol (e.g., NVDA, AAPL).'),
    limit: z.number().optional().default(10).describe('The number of news articles to retrieve (max 50).'),
    page: z.number().optional().default(0).describe('The page offset for pagination.'),
  }),
  func: async ({ symbol, limit, page }) => {
    try {
      if (!symbol) {
        throw new Error('Ticker symbol is required.');
      }
      const upperSymbol = symbol.trim().toUpperCase();
      const news = await getStockNews(upperSymbol, limit, page);
      return news;
    } catch (error) {
      throw new Error(`Failed to fetch news for ${symbol}: ${error.message}`);
    }
  },
});

export default newsTool;
