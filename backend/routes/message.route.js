import express from 'express';
import { getAllMessages, sendMessage } from '../controller/messageController.js';
import { protectAdmin, protectPatient } from '../middlewares/protectRoute.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "from Router"
    })
})

router.post("/patient", sendMessage)
router.get("/patient/all",getAllMessages)

export default router;