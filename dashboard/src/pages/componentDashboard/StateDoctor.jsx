import {useState, useEffect} from 'react'
import axios from 'axios'
import { Box } from "@mui/material";
import React from "react";
import StatBox from "../../components/StatBox";
import MedicationIcon from '@mui/icons-material/Medication';

const StateDoctor = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const doctors = await axios.get("http://localhost:5000/api/v1/user/doctor")
                setDoctors(doctors.data.doctors);
            } catch (error) {
                console.error(error);
            }
        }
        fetchDoctor();
    }, [])

    return (
        <Box
        gridColumn="span 3"
        backgroundColor="#EBEBEB"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="0 0px 20px 0px #A0A0A0"
        >
        <StatBox
            title={doctors.length}
            subtitle="Médecin"
            progress={doctors.length / 100}
            increase="+10%"
            icon={
            <MedicationIcon
                sx={{ color: "#00AEFF", fontSize: "26px" }}
            />
            }
        />
        </Box>
    );
};

export default StateDoctor;
