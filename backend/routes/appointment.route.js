import express from 'express';
import { appointControle, deleteAppointment, getAllAppointment, updateAppointmentStatus } from '../controller/appointmentController.js';
import { protectAdmin, protectPatient } from '../middlewares/protectRoute.js';

const router = express.Router();

router.post("/appointment", (protectPatient || protectAdmin), appointControle)
router.get("/all", getAllAppointment)
router.put("/update/:id", updateAppointmentStatus)
router.delete("/delete/:id", protectAdmin, deleteAppointment)

export default router;