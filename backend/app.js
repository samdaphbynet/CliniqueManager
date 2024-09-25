import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import {connectionDB} from './db/connectionDB.js';

// import routes
import messageRoutes from './routes/message.route.js'
import registerRoutes from './routes/userRegister.route.js'
import apointmentRoutes from './routes/appointment.route.js'
import transactionRoutes from './routes/transaction.route.js'
import faqRoutes from './routes/faq.route.js'
import documentRoutes from './routes/document.route.js'

// config variable environment
dotenv.config({
    path: "./config/config.env",
})

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// configure cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// configure cors middleware
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL, "http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// configure fileupload middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

app.get("/", (req, res) => {
    res.json("server runing...")
})

// use routes
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/user", registerRoutes);
app.use("/api/v1/appointment", apointmentRoutes);
app.use("/api/v1/transaction", transactionRoutes);
app.use("/api/v1/question", faqRoutes);
app.use('/api/v1/document', documentRoutes);



connectionDB();

export default app;