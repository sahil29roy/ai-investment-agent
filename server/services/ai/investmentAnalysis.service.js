/**
 * @file investmentAnalysis.service.js
 * @description Service to perform investment analysis on research data using Gemini API.
 */

import ai from '../../config/gemini.config.js';
import { buildInvestmentAnalysisPrompt } from './prompts.js';
import { parseInvestmentResponse } from './outputParser.js';

/**
 * Conducts a comprehensive investment analysis based on gathered financial, stock, and news data.
 * 
 * @param {object} research - The comprehensive research data.
 * @param {object} research.profile - The company profile data.
 * @param {object} research.financials - Financial statements (balance sheet, income statement, cash flow).
 * @param {object} research.ratios - Key financial ratios.
 * @param {object} research.stock - Stock price and volume information.
 * @param {object} research.events - Corporate events (earnings calls, dividend announcements, etc.).
 * @param {Array<object>} research.news - Filtered investment-relevant news articles.
 * @returns {Promise<object>} The validated investment analysis and recommendation object.
 * @throws {Error} Descriptive error if parameter validation, API call, or parsing fails.
 */
export async function analyzeInvestment(research) {
  try {
    if (!research) {
      throw new Error('Research data object is required for investment analysis.');
    }

    // Build the analysis prompt
    const promptText = buildInvestmentAnalysisPrompt(research);

    // Call Gemini API using gemini-2.0-flash with JSON mode enabled
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
    return parseInvestmentResponse(response.text);
  } catch (error) {
    // Handle failures gracefully and re-throw with descriptive context
    throw new Error(`Investment analysis service failed: ${error.message}`);
  }
}
