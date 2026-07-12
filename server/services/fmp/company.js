import fmpClient from '../../config/axios.config.js';
import { getMockFallback, MOCK_COMPANIES } from './mockFallback.js';

export async function getProfile(symbol) {
  try {
    const response = await fmpClient.get('/profile', {
      params: { symbol },
    });
    return response.data;
  } catch (error) {
    console.warn(`[FMP Service] getProfile failed for ${symbol} (${error.message}). Checking mock database...`);
    const fallback = getMockFallback(symbol);
    if (fallback) {
      return fallback.profile;
    }
    throw error;
  }
}

export async function searchCompanies(query, limit = 10) {
  try {
    const response = await fmpClient.get('/search-name', {
      params: { query, limit },
    });
    return response.data;
  } catch (error) {
    console.error(`Error in searchCompanies for query ${query}:`, error.message);
    throw error;
  }
}

/**
 * Resolves a company name or ticker query to a clean ticker symbol.
 * Scores candidates to select the primary US ticker.
 * If API is rate-limited, falls back to local company mappings.
 */
export async function resolveTicker(input) {
  if (!input || typeof input !== 'string' || !input.trim()) {
    throw new Error('Search input cannot be empty.');
  }

  const query = input.trim();
  const qUpper = query.toUpperCase();

  // Try to resolve using local mock keys first if query matches a known mock asset
  if (MOCK_COMPANIES[qUpper]) {
    return qUpper;
  }
  
  // Check synonyms/sub-strings
  const lowerQuery = query.toLowerCase();
  if (lowerQuery.includes('microsoft')) return 'MSFT';
  if (lowerQuery.includes('meta')) return 'META';
  if (lowerQuery.includes('amazon')) return 'AMZN';
  if (lowerQuery.includes('apple')) return 'AAPL';
  if (lowerQuery.includes('nvidia')) return 'NVDA';
  if (lowerQuery.includes('tesla')) return 'TSLA';

  try {
    // Run search-name and search-symbol in parallel
    const [nameRes, symbolRes] = await Promise.allSettled([
      fmpClient.get('/search-name', { params: { query } }),
      fmpClient.get('/search-symbol', { params: { query } }),
    ]);

    let candidates = [];
    if (nameRes.status === 'fulfilled' && Array.isArray(nameRes.value.data)) {
      candidates = candidates.concat(nameRes.value.data);
    }
    if (symbolRes.status === 'fulfilled' && Array.isArray(symbolRes.value.data)) {
      candidates = candidates.concat(symbolRes.value.data);
    }

    if (candidates.length === 0) {
      throw new Error(`Could not resolve ticker symbol for "${query}". No matching companies found.`);
    }

    // De-duplicate candidates by symbol
    const seen = new Set();
    const uniqueCandidates = [];
    for (const c of candidates) {
      if (!c.symbol) continue;
      const sym = c.symbol.toUpperCase();
      if (!seen.has(sym)) {
        seen.add(sym);
        uniqueCandidates.push(c);
      }
    }

    if (uniqueCandidates.length === 0) {
      throw new Error(`Could not resolve ticker symbol for "${query}". No matching companies found.`);
    }

    // Score candidates
    const scored = uniqueCandidates.map((c) => {
      let score = 0;
      const symbol = c.symbol.toUpperCase();
      const name = (c.name || '').toUpperCase();
      const q = query.toUpperCase();

      // 1. Exact symbol match
      if (symbol === q) {
        score += 1000;
      }

      // 2. Primary listing (no dot in symbol)
      if (!symbol.includes('.')) {
        score += 300;
      } else {
        score -= 200; // Suffix penalty
      }

      // 3. Major US exchanges (NASDAQ, NYSE, AMEX)
      if (c.exchange) {
        const ex = c.exchange.toUpperCase();
        if (ex.includes('NASDAQ') || ex.includes('NYSE') || ex.includes('AMEX') || ex.includes('NEW YORK STOCK EXCHANGE')) {
          score += 500;
        }
      }

      // 4. Name match
      if (name === q) {
        score += 300;
      } else if (name.startsWith(q)) {
        score += 100;
      }

      return { candidate: c, score };
    });

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    // Return the best symbol
    const best = scored[0].candidate.symbol.toUpperCase();
    return best;
  } catch (error) {
    // If the API request failed (e.g. 429 rate limit), fallback to matching local keys
    console.warn(`[FMP Service] resolveTicker API call failed (${error.message}). Checking mock database...`);
    
    // Check if query is contained in any mock name
    for (const [ticker, mock] of Object.entries(MOCK_COMPANIES)) {
      if (mock.companyName.toLowerCase().includes(lowerQuery) || ticker.toLowerCase().includes(lowerQuery)) {
        return ticker;
      }
    }
    
    throw new Error(`Could not resolve ticker symbol for "${query}". FMP API is rate-limited and no offline mock fallback found.`);
  }
}
