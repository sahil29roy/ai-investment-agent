import { GoogleGenAI } from '@google/genai';
import { GEMINI_API_KEY } from './env.js';

if (!GEMINI_API_KEY) {
  console.warn('Warning: GEMINI_API_KEY is not set in environment variables.');
}

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY || undefined,
});

export default ai;
