/**
 * @file investment.routes.js
 * @description Express routing file for the investment endpoints.
 */

import { Router } from 'express';
import { analyzeInvestment } from '../controllers/investment.controller.js';

const router = Router();

/**
 * @route POST /api/investment/analyze
 * @desc Triggers investment analysis workflow for a given company name or symbol.
 */
router.post('/analyze', analyzeInvestment);

export default router;
