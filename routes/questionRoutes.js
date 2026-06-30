import express from 'express';
import { getQuestionList } from '../controllers/questionController.js';

const router = express.Router();

// This maps to the root of our sub-route structure
router.route('/').get(getQuestionList);

export default router;