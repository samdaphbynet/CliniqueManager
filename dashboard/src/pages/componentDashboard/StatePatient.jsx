import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import React from "react";
import StatBox from "../../components/StatBox";
import PersonIcon from "@mui/icons-material/Person";
import { Context } from "../../index";


const StateDoctor = () => {
  const [patient, setPatient] = useState([]);
  const { baseUrl } = useContext(Context);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patient = await axios.get(
          `${baseUrl}/api/v1/user/allpatient`
        );
        setPatient(patient.data.patients);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPatients();
  }, []);
  
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
        title={patient.length}
        subtitle="Patiente"
        progress={patient.length / 100}
        increase="+5%"
        icon={
          <PersonIcon
            sx={{ color: "#00AEFF", fontSize: "26px" }}
          />
        }
      />
    </Box>
  );
};

export default StateDoctor;
