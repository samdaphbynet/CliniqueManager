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
    const [doctorData, setDoctorData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        role: "",
    })
    const [loading, setLoading] = useState(false);

    // fetch data doctor by id
    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/v1/user/getdoctor/${idDoctor}`);
                setDoctorData(response.data.doctor);
            } catch (error) {
                toast.error("Erreur lors de la récuperation des données du médecin.");
            }
        };
        if (idDoctor) {
            fetchDoctor();
        }
    }, [idDoctor, baseUrl])

    // handle input change
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setDoctorData((prevData) => ({
            ...prevData, [name]: value,
        }))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${baseUrl}/api/v1/user/updatedoctor/${idDoctor}`, doctorData);
            toast.success("Le profil du médecin a été mis à jour avec succés.")
            onClose();
        } catch (error) {
            toast.error("Erreur lors de la mise à jour des informations.")
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
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
                    {`Chargement...`}
                </Typography>
            </Box>
        )
    }

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
                {`modifier les information du Dr.${doctorData.firstName} ${doctorData.lastName}`}
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
                        key={name}
                        label={label}
                        name={name}
                        sx={{
                            gridColumn: "span 2",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            marginBottom: "10px",
                            backgroundColor: "#F0F0F0",
                        }}
                        InputLabelProps={{ style: { color: "#000000" }}}
                        InputProps={{ style: { color: "#000000" }}}
                        value={doctorData[name] || ""}
                        onChange={handleInputChange}
                        fullWidth
                        variant="filled"
                        type={type}
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
                    onChange={handleInputChange}
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
