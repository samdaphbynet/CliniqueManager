import express from 'express';
import multer from "multer";
import path from "path";
import { documentPdf } from '../controller/documentController.js';

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./files");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

router.post("/pdf", upload.single("file"), documentPdf);

export default router