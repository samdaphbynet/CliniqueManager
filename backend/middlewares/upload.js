import multer from "multer";
import cloudinary from 'cloudinary';
import {CloudinaryStorage} from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: "documents",
        format: async (req, file) => "pdf",
        public_id: (req, file) => file.originalname.split(".")[0],
    }
});

const upload = multer({ storage: storage });
export default upload