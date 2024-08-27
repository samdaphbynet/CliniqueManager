import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import React from "react";
import StatBox from "../../components/StatBox";
import PersonIcon from "@mui/icons-material/Person";
import { Context } from '../../index';

const StateDoctor = () => {
  const [appointment, setAppointment] = useState([]);
  const {baseUrl} = useContext(Context)

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const appointment = await axios.get(
          `${baseUrl}/api/v1/appointment/all`
        );
        setAppointment(appointment.data.appointment);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppointment();
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
        title={appointment.length}
        subtitle="Rendez-Vous"
        progress={appointment.length / 100}
        increase="+15%"
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
