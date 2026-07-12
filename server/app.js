/**
 * @file app.js
 * @description Creates the Express application, configures security headers, body parsers, logging, and routing.
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import investmentRoutes from './routes/investment.routes.js';
import { notFoundHandler } from './middleware/notFound.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

// Security and utility middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Registered API routes
app.use('/api/investment', investmentRoutes);

// Fallback middlewares for unknown paths and execution exceptions
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
