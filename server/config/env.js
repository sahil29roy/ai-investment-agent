import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const PORT = process.env.PORT || 5000;
export const FMP_API_KEY = process.env.FMP_API_KEY || 'demo';
export const FMP_API_URL = process.env.FMP_API_URL || 'https://financialmodelingprep.com/api/v3';
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

export default {
  PORT,
  FMP_API_KEY,
  FMP_API_URL,
  GEMINI_API_KEY,
};
