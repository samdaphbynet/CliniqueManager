import express from 'express';
import { sendMessage } from '../controller/messageController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "from Router"
    })
})

router.post("/patient", sendMessage)

export default router;