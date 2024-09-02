import Document from "../models/documentSchema.js"
import jwt from 'jsonwebtoken';
import User from '../models/usersSchema.js';

// Create a new Document object with the specified properties
export const documentPdf = async (req, res) => {
    try {
        const {title} = req.body;
        if (!req.file.path) {
            return res.status(400).json({ message: "File is required" });
        }
        const file = req.file.path;
        const token = req.cookies.PatientToken;
        // check if the token is valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decoded) {
            return res.status(401).json({ message: "Token is not valid" });
        }
        // Create an instance of Document and save it to the database
        const documentPdf = new Document({
            title: title,
            pdf: file,
            user: decoded.id
        })
        await documentPdf.save();

        return res.status(200).json({
            success: true,
            message: "Document uploaded successfully"
        })
    } catch (error) {
        console.log("Error in documentPdf: ", error)
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

// Get all documents by user id 
export const getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find({ user: req.params.id });
        if (!documents) {
            return res.status(404).json({ message: "No documents found" });
        }
        return res.status(200).json({
            success: true,
            message: "Documents fetched successfully",
            documents: documents
         });
    } catch (error) {
        console.log("Error in getAllDocuments: ", error)
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}