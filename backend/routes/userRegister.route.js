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
    addNewDoctor,
    deleteDoctor,
    getAllPatients,
    updateDoctor,
    findDoctorById
} from "../controller/usersController.js"
import { protectAdmin, protectPatient } from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/register', patientRegister)
router.post('/login', login)
router.post("/add", protectAdmin, addNewAdmin)
router.get("/getadmin", protectAdmin, getAdmin)
router.get("/getpatient", getPatient)
router.get("/allpatient", getAllPatients)
router.get("/doctor", getAllDoctors)

router.post("/logoutadmin", protectAdmin, logoutAdmin)
router.post("/logoutpatient", protectPatient, logoutPatient)

router.post("/addnewdoctor", protectAdmin, addNewDoctor)
router.post("/updatedoctor/:id", updateDoctor)
router.get("/getdoctor/:id", findDoctorById)
router.delete("/deletedoctor/:id", deleteDoctor)

export default router;