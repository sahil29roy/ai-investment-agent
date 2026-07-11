/**
 * @file prompts.js
 * @description Export prompt builder functions only. Do NOT call Gemini here.
 */

/**
 * Builds the prompt for filtering news articles.
 * 
 * @param {string} companyName - The name of the company.
 * @param {Array<object>} news - Array of raw news articles.
 * @returns {string} The formatted prompt string.
 */
export function buildNewsFilterPrompt(companyName, news) {
  const newsString = JSON.stringify(news, null, 2);
  return `You are an expert investment news analyst. Your task is to filter, classify, and rank news articles for "${companyName}".

Please perform the following tasks:
1. Review all news articles provided below.
2. Remove any irrelevant news articles that have no bearing on the company's business, stock price, or potential investment decisions.
3. Keep only investment-relevant articles.
4. Rank the remaining articles by their importance to a potential investor (highest importance first).
5. For each kept article:
   - Provide a concise summary.
   - Classify the sentiment as one of: "Positive", "Neutral", "Negative".
   - Determine the investment impact as one of: "High", "Medium", "Low".
   - Provide a brief reason explaining the sentiment and impact classification.

Return the result ONLY as a valid JSON object matching the following structure:
{
  "filteredNews": [
    {
      "title": "Original article title",
      "summary": "Concise summary of the news and its relevance to the company",
      "sentiment": "Positive" | "Neutral" | "Negative",
      "investmentImpact": "High" | "Medium" | "Low",
      "reason": "Brief explanation of why this sentiment and impact were selected"
    }
  ]
}

Ensure the output is valid JSON and contains no other text.

Raw News Articles:
${newsString}`;
}

/**
 * Builds the prompt for performing a comprehensive investment analysis.
 * 
 * @param {object} research - The gathered research data.
 * @param {object} research.profile - The company profile.
 * @param {object} research.financials - The financial statements.
 * @param {object} research.ratios - The financial ratios.
 * @param {object} research.stock - Stock data.
 * @param {object} research.events - Corporate events.
 * @param {Array<object>} research.news - Filtered news articles.
 * @returns {string} The formatted prompt string.
 */
export function buildInvestmentAnalysisPrompt(research) {
  const researchString = JSON.stringify(research, null, 2);
  return `You are a senior investment analyst and portfolio manager. Your task is to conduct a thorough investment research analysis based on the provided data and recommend a course of action.

Analyze all of the gathered data below carefully, including the company profile, financial health/statements, financial ratios, stock metrics, corporate events, and relevant news.

Please generate:
1. Company Summary: A brief description/summary of the company's business model and current standing.
2. Strengths: Key factors that give the company a competitive advantage.
3. Weaknesses: Key internal factors that present challenges or operational inefficiencies.
4. Opportunities: External avenues for growth, expansion, or improvement.
5. Risks: External threats, industry headwinds, or potential pitfalls.
6. Final Recommendation: Choose exactly one of: "Invest", "Hold", "Pass".
7. Confidence Score: An integer from 0 to 100 representing your confidence in this recommendation.
8. Detailed reasoning: A comprehensive explanation supporting the final recommendation and confidence score.

Return the result ONLY as a valid JSON object matching the following structure:
{
  "recommendation": "Invest" | "Hold" | "Pass",
  "confidence": 85,
  "companySummary": "Brief overview of the company",
  "strengths": ["Strength 1", "Strength 2"],
  "weaknesses": ["Weakness 1", "Weakness 2"],
  "opportunities": ["Opportunity 1", "Opportunity 2"],
  "risks": ["Risk 1", "Risk 2"],
  "reasoning": "Detailed, multi-paragraph justification explaining the analysis of financial statements, ratios, news, and events leading to the recommendation"
}

Ensure the output is valid JSON and contains no other text.

Research Data:
${researchString}`;
}
