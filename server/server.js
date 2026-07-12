/**
 * @file server.js
 * @description Entry point for the Express server. Handles initialization and graceful shutdown.
 */

import app from './app.js';
import { PORT } from './config/env.js';
import { logger } from './utils/logger.js';

// Initialize HTTP server listener
const server = app.listen(PORT, () => {
  logger.info(`AI Investment Research Agent server running on port ${PORT}`);
});

/**
 * Initiates a graceful shutdown of the HTTP server.
 * Closes connections and exits the Node process.
 * 
 * @param {string} trigger - The signal or event that initiated the shutdown.
 */
function gracefulShutdown(trigger) {
  logger.warn(`Received ${trigger}. Initiating graceful shutdown...`);

  server.close(() => {
    logger.info('HTTP server successfully closed. Process exiting cleanly.');
    process.exit(0);
  });

  // Force shutdown after 10 seconds if connections hang
  setTimeout(() => {
    logger.error('Graceful shutdown timeout exceeded. Forcefully exiting.');
    process.exit(1);
  }, 10000);
}

// Listen for termination signals
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Capture uncaught errors and reject promises cleanly
process.on('uncaughtException', (error) => {
  logger.error('CRITICAL: Uncaught Exception:', error.stack || error.message);
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('CRITICAL: Unhandled Promise Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('unhandledRejection');
});
