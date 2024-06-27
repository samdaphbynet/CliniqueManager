import express from 'express';
import {
    patientRegister, 
    login, 
    addNewAdmin, 
    getAdmin, 
    getPatient,
    getAllDoctors,
    logoutAdmin,
    logoutPatient,
    addNewDoctor
} from "../controller/usersController.js"
import { protectAdmin, protectPatient } from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/register', patientRegister)
router.post('/login', login)
router.post("/add", protectAdmin, addNewAdmin)
router.get("/getadmin", protectAdmin, getAdmin)
router.get("/getpatient", protectPatient, getPatient)
router.get("/doctor", getAllDoctors)

router.post("/logoutadmin", protectAdmin, logoutAdmin)
router.post("/logoutpatient", protectPatient, logoutPatient)

router.post("/addnewdoctor", protectAdmin, addNewDoctor)

export default router;