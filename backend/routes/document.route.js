import express from 'express';
import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import { documentPdf } from '../controller/documentController.js';
import cloudinary from 'cloudinary';

const router = express.Router()

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: "documents",
        resouce_type: "raw",
        allowed_formats: ["pdf"],
    }
});

const upload = multer({ storage: storage });

router.post("/pdf", upload.single("file"), documentPdf);

export default router