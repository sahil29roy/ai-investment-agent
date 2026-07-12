/**
 * @file logger.js
 * @description Lightweight logger utility using standard console methods prepended with timestamps.
 */

/**
 * Returns the current date and time in ISO format.
 * @returns {string} ISO timestamp string.
 */
function getTimestamp() {
  return new Date().toISOString();
}

/**
 * Custom lightweight logger object.
 */
export const logger = {
  info: (...args) => {
    console.log(`[${getTimestamp()}] [INFO]`, ...args);
  },
  error: (...args) => {
    console.error(`[${getTimestamp()}] [ERROR]`, ...args);
  },
  warn: (...args) => {
    console.warn(`[${getTimestamp()}] [WARN]`, ...args);
  },
  debug: (...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[${getTimestamp()}] [DEBUG]`, ...args);
    }
  },
};

export default logger;
