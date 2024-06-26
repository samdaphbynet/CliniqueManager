import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import {connectionDB} from './db/connectionDB.js';
import cloudinary from "cloudinary";

import Message from "./models/messageSchema.js"


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// config variable environment
dotenv.config({
    path: "./config/config.env",
})

// configure cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// configure cors middleware
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// configure fileupload middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

connectionDB()

export default app;