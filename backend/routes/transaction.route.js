import express from "express";
import { getAllTransaction, transaction } from "../controller/transactionsController.js";

const router = express.Router();

router.post('/transaction', transaction)
router.get('/getall', getAllTransaction)

export default router;