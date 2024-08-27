import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { inputFormUpdateDoctor } from "../../constants/inputFormFields";
import { department } from "../../constants/mockData";
import { toast } from "react-toastify";
import { Context } from "../../index";

const ModalEditDoctor = ({ open, onClose, idDoctor }) => {

    const {baseUrl} = useContext(Context)
    const [doctorInfo, setDoctorInfo] = useState({})
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        role: "",
    })

    console.log(data)

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/api/v1/user/getdoctor/${idDoctor}`
                );
                setDoctorInfo(response.data.doctor);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDoctor();
    }, [idDoctor])

    const handleFormSubmit = async () => {
        try {
            const response = await axios.post(`${baseUrl}/api/v1/user/updatedoctor/${idDoctor}`, )
        } catch (error) {
            
        }
    };

    return (
        <Modal
        open={open}
        onClose={onClose}
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
                backgroundColor: "#D8D8D8",
                boxShadow: "0 0px 20px 0px #9C9C9C",
                p: 4,
            }}
            >
            <Typography
                id="modal-appointment"
                variant="h3"
                color="#000000"
                mb="20px"
            >
                {`modifier les information du Dr.${doctorInfo.firstName} ${doctorInfo.lastName}`}
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
                {inputFormUpdateDoctor.map(({ label, name, type }) => (
                    <TextField
                    InputLabelProps={{
                        style: { color: "#000000" },
                    }}
                    InputProps={{
                        style: { color: "#000000" },
                    }}
                    sx={{
                        gridColumn: "span 2",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        marginBottom: "10px",
                        backgroundColor: "#F0F0F0",
                    }}
                    value={doctorInfo[name] || ""}
                    onChange={(e) => {
                        setData({...data, [name]: e.target.value });
                    }}
                    key={name}
                    fullWidth
                    variant="filled"
                    type={type}
                    label={label}
                    />
                ))}

                {/* list department */}
                <FormControl
                    sx={{
                    gridColumn: "span 2",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    marginBottom: "10px",
                    backgroundColor: "#F0F0F0",
                    }}
                >
                    <InputLabel sx={{ color: "#000000" }}>Department</InputLabel>
                    <Select
                    sx={{
                        color: "black",
                    }}
                    defaultValue=""
                    onChange={(e) => {
                        setData({...data, department: e.target.value });
                    }}
                    >
                    {department.map((dep) => (
                        <MenuItem value={dep.name} key={dep.name}>
                        {dep.name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                </Box>
            </Typography>
            <Box display="flex" justifyContent="end" my="20px">
                <Button
                sx={{
                    backgroundColor: "#00A2FF",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    "&:hover": {
                    backgroundColor: "#00C3FF",
                    },
                }}
                variant="contained"
                type="submit"
                >
                Submit
                </Button>
            </Box>
            </Box>
        </form>
        </Modal>
    );
};

export default ModalEditDoctor;
