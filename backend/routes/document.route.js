import express from 'express';
import { documentPdf, getAllDocuments } from '../controller/documentController.js';
import upload from '../middlewares/upload.js';

const router = express.Router()


router.post("/pdf", upload.single("file"), documentPdf);
router.get("/pdf/:id", getAllDocuments)

export default router