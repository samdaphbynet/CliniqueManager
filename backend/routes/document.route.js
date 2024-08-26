import express from 'express';
import { documentPdf } from '../controller/documentController.js';
import upload from '../middlewares/upload.js';

const router = express.Router()


router.post("/pdf", upload.single("file"), documentPdf);

export default router