/**
 * @file test-agent.js
 * @description Integration test for the LangGraph Investment Research Agent workflow.
 */

import { GEMINI_API_KEY } from '../config/env.js';
import investmentAgent from '../langchain/investmentAgent.js';

async function testAgent() {
  console.log('--- Starting LangGraph Investment Agent Integration Test ---');
  console.log('Target Query: "NVIDIA"\n');

  try {
    const initialState = {
      companyQuery: 'NVIDIA',
    };

    console.log('Invoking StateGraph workflow with companyQuery = "NVIDIA"...');
    
    // Invoke the compiled graph
    const result = await investmentAgent.invoke(initialState);

    console.log('\nSUCCESS! Completed Graph State:');
    console.log('Resolved Symbol:', result.symbol);
    console.log('Company Name:', result.companyName);
    console.log('Recommendation:', result.analysis?.recommendation);
    console.log('Confidence:', result.analysis?.confidence);
    console.log('Summary:', result.analysis?.companySummary);
    console.log('Reasoning:', result.analysis?.reasoning);
  } catch (error) {
    console.error('\nAgent workflow execution terminated:');
    console.error(error.message);
    console.log('\nNote: Execution might fail if the Financial Modeling Prep (FMP) "demo" key is restricted, or if GEMINI_API_KEY is not set.');
  }
}

testAgent();
