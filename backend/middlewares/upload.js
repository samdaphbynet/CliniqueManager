import multer from "multer";
import cloudinary from 'cloudinary';
import {CloudinaryStorage} from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: "documents",
        resource_type: "auto", // "raw"
        // format: async (req, file) => "pdf",
        public_id: (req, file) => file.originalname.split(".")[0],
    }
});

const fileFilter = (req, res, cb) => {
    const allowedFormats = ["application/pdf", "application/png", "application/jpg", "application/jpeg", "application/webp"]

    if (allowedFormats.includes(allowedFormats.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file format. Only PDF, PNG, JPG, JPEG, and WebP are allowed."), false);
    }
}

const upload = multer(
    { 
        storage: storage,
        fileFilter: fileFilter,
    });
export default upload