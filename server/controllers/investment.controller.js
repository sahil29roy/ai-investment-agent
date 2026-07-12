/**
 * @file investment.controller.js
 * @description Controller that receives the analysis request and invokes the LangGraph orchestrator.
 */

import investmentAgent from '../langchain/investmentAgent.js';
import { success, badRequest } from '../utils/apiResponse.js';

/**
 * Orchestrates company research and triggers the sequential investment analysis workflow.
 * 
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Promise<object>} Express JSON response containing validation failure or final recommendation analysis.
 */
export async function analyzeInvestment(req, res, next) {
  try {
    const { company } = req.body;

    if (!company || typeof company !== 'string' || !company.trim()) {
      return badRequest(res, 'Company name or ticker symbol is required inside the "company" parameter of the request body.');
    }

    const companyQuery = company.trim();

    // Run the LangGraph agent workflow
    const result = await investmentAgent.invoke({ companyQuery });

    if (!result || !result.analysis) {
      throw new Error(`Investment analysis workflow did not return a valid recommendation report for query "${companyQuery}".`);
    }

    return success(res, result.analysis, 'Investment analysis completed successfully');
  } catch (error) {
    // Pass execution error to the global error middleware
    next(error);
  }
}

export default {
  analyzeInvestment,
};
