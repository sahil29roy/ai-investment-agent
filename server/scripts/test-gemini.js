import ai from '../config/gemini.config.js';
import { GEMINI_API_KEY } from '../config/env.js';

async function testGemini() {
  console.log('Starting Gemini API Connection Test...');
  
  if (!GEMINI_API_KEY) {
    console.warn('\n[SKIPPED] GEMINI_API_KEY is not set. Skipping content generation test.');
    console.warn('To test the Gemini API, please set the GEMINI_API_KEY variable in your server/.env file.');
    return;
  }

  try {
    console.log('Sending request to Gemini model (gemini-2.0-flash)...');
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: 'Explain the concept of compound interest in one sentence.',
    });

    console.log('\nSuccess! Gemini Response:');
    console.log(response.text);
  } catch (error) {
    console.error('\nGemini API Test FAILED:', error.message);
  }
}

testGemini();
