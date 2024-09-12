import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { inputFormAppointment } from "../constants/inputFormFields";
import { department } from "../constants/mockData";
import {toast} from 'react-toastify';

const ModalAppointment = () => {

  const [appointment, setAppointment] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birth: "",
    gender: "",
    doctor_firstName: "",
    doctor_lastName: "",
    department: "",
    address: "",
    appointment: "",
    hasVisited: false,
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // fetch all doctor information
  const [doctor, setDoctor] = useState([]);
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/doctor"
        );
        setDoctor(response.data.doctors);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctor();
  }, []);

  // handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/v1/appointment/appointment", {
        firstName: appointment.firstName,
        lastName: appointment.lastName,
        email: appointment.email,
        phone: appointment.phone,
        birth: appointment.birth,
        gender: appointment.gender,
        doctor_firstName: appointment.doctor_firstName,
        doctor_lastName: appointment.doctor_lastName,
        department: appointment.department,
        address: appointment.address,
        appointment: appointment.appointment,
        hasVisited: appointment.hasVisited,
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      }).then(res => {
        toast.success("Le rendez-vous est ajouter avec success")
        window.location.reload()
        handleClose()
      }).catch(err => {
        toast.error(err.response.data.message)
      });
    } catch (error) {
      
    }
  }

  return (
    <Box
      width="auto"
      height="45px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="6px"
      backgroundColor="#00A2FF"
    >
      <IconButton
        sx={{
          width: "100%",
          height: "100%",
          fontSize: "16px",
          fontWeight: "bold",
          borderRaduis: "none",
          "&:hover": {
            backgroundColor: "#00A2FF",
          },
        }}
        area-label="Ajouter un rendez-vous"
        color="white"
        onClick={handleOpen}
      >
        Nouveau Rendez-Vous
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        area-labeledby="modal-appointment"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleFormSubmit}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "45%",
              height: "auto",
              backgroundColor: "#0093E9",
              backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
              boxShadow: "0 0px 20px 0px #9C9C9C",
              p: 8,
            }}
          >
            <Typography id="modal-appointment" variant="h3" color="#FFFFFFFF" mb="20px">
              Ajouter un rendez-vous
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="body2"
              component="span"
            >
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              >
                {inputFormAppointment.map(({ label, name, type }) => (
                  <TextField
                  InputLabelProps={{
                    style: {color: "#000000"}
                  }}
                  InputProps={{
                    style: {color: "#000000"}
                  }}
                    sx={{
                      gridColumn: "span 2",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "10px",
                      backgroundColor: "#F0F0F0",
                      
                    }}
                    key={name}
                    fullWidth
                    variant="filled"
                    type={type}
                    label={label}
                    onChange={(e) => {
                      setAppointment({
                        ...appointment,
                        [name]: e.target.value,
                      });
                    }}
                  />
                ))}
                {/* list the name of doctor */}
                <FormControl 
                  sx={{ 
                    gridColumn: "span 2", 
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    marginBottom: "10px",
                    backgroundColor: "#F0F0F0",
                  }}>
                  <InputLabel sx={{color: "#000000"}}>choisissez un medecin</InputLabel>
                  <Select
                    sx={{
                      color: "black"
                    }}
                    defaultValue=""
                    onChange={(e) => {
                      const [first, last] = e.target.value.split(" ");
                      setAppointment({
                        ...appointment,
                        doctor_firstName: first,
                        doctor_lastName: last,
                      });
                    }}
                  >
                    {doctor.map((doc) => (
                      <MenuItem
                        key={doc._id}
                        value={`${doc.firstName} ${doc.lastName}`}
                      >
                        Dr. {doc.firstName} {doc.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* list department */}
                <FormControl sx={{ 
                    gridColumn: "span 2", 
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    marginBottom: "10px",
                    backgroundColor: "#F0F0F0",
                  }}>
                  <InputLabel sx={{color: "#000000"}}>Department</InputLabel>
                  <Select
                    sx={{
                      color: "black"
                    }}
                    defaultValue=""
                    onChange={(e) => {
                      setAppointment({...appointment, department: e.target.value });
                    }}
                  >
                    {department.map((dep) => (
                      <MenuItem value={dep.name} key={dep.name}>{dep.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  InputLabelProps={{
                    style: {color: "#000000"}
                  }}
                  InputProps={{
                    style: {color: "#000000", paddingTop: "5px"}
                  }}
                  sx={{
                      gridColumn: "span 2",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "10px",
                      backgroundColor: "#F0F0F0",
                  }}
                  variant="filled"
                  type="date"
                  label="Appointment"
                  onChange={(e) => {
                    setAppointment({...appointment, appointment: e.target.value });
                  }}
                />

                <label htmlFor="checkbox" style={{color: "#242424", display: "flex"}}>
                  <input 
                    type="checkbox" 
                    checked={appointment.hasVisited}
                    onChange={(e) => {
                    setAppointment({...appointment, hasVisited: e.target.checked})
                  }}/>
                  Avez-vous déjà consulté?
                </label>
              </Box>
            </Typography>
            <Box 
              display="flex" 
              justifyContent="end" my="20px" 
            >
              <Button sx={{
                backgroundColor: "#00A2FF",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "#00C3FF",
                },
              }} variant="contained" type="submit">Submit</Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </Box>
  );
};

export default ModalAppointment;
