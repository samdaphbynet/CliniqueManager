import express from 'express';
import { getQuestions, questions } from '../controller/faqController.js';

const router = express.Router();

router.post("/faq", questions)
router.get("/getall", getQuestions)

export default router;