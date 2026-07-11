/**
 * @file newsFilter.service.js
 * @description Service to filter and analyze news articles using Gemini API.
 */

import ai from '../../config/gemini.config.js';
import { buildNewsFilterPrompt } from './prompts.js';
import { parseNewsResponse } from './outputParser.js';

/**
 * Filters news articles for a company to keep only investment-relevant ones.
 * 
 * @param {string} companyName - The name of the company.
 * @param {Array<object>} newsArticles - Array of raw news articles.
 * @returns {Promise<object>} The validated filtered news object containing filteredNews.
 * @throws {Error} Descriptive error if parameter validation, API call, or parsing fails.
 */
export async function filterNews(companyName, newsArticles) {
  try {
    if (!companyName) {
      throw new Error('Company name is required for news filtering.');
    }

    if (!newsArticles || !Array.isArray(newsArticles) || newsArticles.length === 0) {
      // Return empty list if no news is provided
      return { filteredNews: [] };
    }

    // Build the instruction prompt
    const promptText = buildNewsFilterPrompt(companyName, newsArticles);

    // Call Gemini API using gemini-2.0-flash
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: promptText,
      config: {
        responseMimeType: 'application/json',
      },
    });

    if (!response || !response.text) {
      throw new Error('Gemini returned an empty or invalid response.');
    }

    // Parse and validate the response against the schema
    return parseNewsResponse(response.text);
  } catch (error) {
    // Re-throw with clear context, maintaining descriptive validation errors
    throw new Error(`News filtering service failed: ${error.message}`);
  }
}
