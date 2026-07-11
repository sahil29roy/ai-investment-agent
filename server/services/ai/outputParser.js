/**
 * @file outputParser.js
 * @description Zod schemas and response validation/parsing helpers for the AI layer.
 */

import { z } from 'zod';

/**
 * News Filter Zod Schema.
 * Validates the filtered news response structure.
 */
export const NewsFilterSchema = z.object({
  filteredNews: z.array(
    z.object({
      title: z.string({ required_error: 'Article title is required' }).min(1),
      summary: z.string({ required_error: 'Article summary is required' }).min(1),
      sentiment: z.enum(['Positive', 'Neutral', 'Negative'], {
        required_error: 'Sentiment must be Positive, Neutral, or Negative',
      }),
      investmentImpact: z.enum(['High', 'Medium', 'Low'], {
        required_error: 'Investment impact must be High, Medium, or Low',
      }),
      reason: z.string({ required_error: 'Classification reasoning is required' }).min(1),
    })
  ),
});

/**
 * Investment Analysis Zod Schema.
 * Validates the final investment recommendation and SWAT analysis.
 */
export const InvestmentAnalysisSchema = z.object({
  recommendation: z.enum(['Invest', 'Hold', 'Pass'], {
    required_error: 'Recommendation must be Invest, Hold, or Pass',
  }),
  confidence: z
    .number({ required_error: 'Confidence score is required' })
    .int()
    .min(0)
    .max(100),
  companySummary: z.string({ required_error: 'Company summary is required' }).min(1),
  strengths: z.array(z.string()).min(1, 'At least one strength is required'),
  weaknesses: z.array(z.string()).min(1, 'At least one weakness is required'),
  opportunities: z.array(z.string()).min(1, 'At least one opportunity is required'),
  risks: z.array(z.string()).min(1, 'At least one risk is required'),
  reasoning: z.string({ required_error: 'Detailed reasoning is required' }).min(1),
});

/**
 * Helper to strip markdown JSON code blocks from response text if present.
 * 
 * @param {string} text - The raw response text.
 * @returns {string} Clean JSON string.
 */
function cleanJsonText(text) {
  if (!text) return '';
  return text.replace(/```json|```/gi, '').trim();
}

/**
 * Parses and validates raw news filtering response from Gemini.
 * 
 * @param {string} responseText - Raw text response from Gemini.
 * @returns {object} The parsed and validated filtered news object.
 * @throws {Error} Descriptive validation or JSON parsing error.
 */
export function parseNewsResponse(responseText) {
  if (!responseText) {
    throw new Error('Received empty response from Gemini for news filtering.');
  }

  const cleanedText = cleanJsonText(responseText);

  let parsedData;
  try {
    parsedData = JSON.parse(cleanedText);
  } catch (error) {
    throw new Error(`Failed to parse news filter response as JSON: ${error.message}. Raw text: ${responseText}`);
  }

  const result = NewsFilterSchema.safeParse(parsedData);
  if (!result.success) {
    const errorDetails = result.error.errors
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join(', ');
    throw new Error(`News Filter validation failed: ${errorDetails}`);
  }

  return result.data;
}

/**
 * Parses and validates raw investment analysis response from Gemini.
 * 
 * @param {string} responseText - Raw text response from Gemini.
 * @returns {object} The parsed and validated investment analysis object.
 * @throws {Error} Descriptive validation or JSON parsing error.
 */
export function parseInvestmentResponse(responseText) {
  if (!responseText) {
    throw new Error('Received empty response from Gemini for investment analysis.');
  }

  const cleanedText = cleanJsonText(responseText);

  let parsedData;
  try {
    parsedData = JSON.parse(cleanedText);
  } catch (error) {
    throw new Error(`Failed to parse investment analysis response as JSON: ${error.message}. Raw text: ${responseText}`);
  }

  const result = InvestmentAnalysisSchema.safeParse(parsedData);
  if (!result.success) {
    const errorDetails = result.error.errors
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join(', ');
    throw new Error(`Investment Analysis validation failed: ${errorDetails}`);
  }

  return result.data;
}
