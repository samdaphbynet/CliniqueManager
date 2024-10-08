import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { inputFormFields } from "../../constants/inputFormFields";
import { Box, Button, FormControl, InputLabel, TextField, Typography, Select, MenuItem } from "@mui/material";
import { Header } from "../../components";
import AddDoctor from "../../components/AddDoctor"
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../index";
import { department } from "../../constants/mockData";

const AddNewDoctor = () => {
  const [doctorInfo, setDoctorInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    birth: "",
    gender: "",
    doctorDepartement: "",
    docAvatar: null,
  });

  console.log(doctorInfo)
  
  const [docAvatarPrev, setDocAvatarPrev] = useState("");
  const { isAuthenticated, baseUrl, isCollapsed } = useContext(Context);
  const navigate = useNavigate();

  // handle avatar doctor
  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPrev(reader.result);
      setDoctorInfo({ ...doctorInfo, docAvatar: file });
    };
  };

  // user click | data send to server OR do some action...
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(doctorInfo).forEach((key) => {
      formData.append(key, doctorInfo[key]);
    });

    // Send the form data to the server...
    try {
      const response = await axios.post(`${baseUrl}/api/v1/user/addnewdoctor`,formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      navigate("/doctor");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Vous devez vous connecter pour accéder à cette page");
      return navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box m="100px 30px" ml={isCollapsed ? "110px" : "300px"}>
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center"
        m="0 20px"
      >
        <Header
          title="AJOUTER UN MEDECIN"
          subtitle="Créer un nouveau profile de médecin"
        />
        <AddDoctor title="Liste des medecin" />
      </Box>

      <Box 
        p="40px" 
        boxShadow="0 0px 20px 0px #A0A0A0"
        backgroundColor="#EBEBEB"
      >
        <form onSubmit={handleSubmit}>
          <Box
            backgroundColor="#FFFFFF"
            borderRadius="4px"
            mb="20px"
            p="20px"
            width="100%"
            display="flex"
            flexDirection="row-reverse"
            justifyContent="space-around"
            alignItems="center"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
          >
            <Box width="300px" height="300px" borderRadius= "5px">
              <img
                src={docAvatarPrev ? docAvatarPrev : "/p.webp"}
                alt="preview"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "5px"}}
              />
            </Box>
            <Box
              p="10px"
              mr="20px"
              borderRadius="8px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              backgroundColor="#242424"
            >
              <label
                style={{
                  marginBottom: "10px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Télécharger l'image du Médecin
              </label>
              <input
                type="file"
                onChange={handleAvatar}
                accept="image/*"
                style={{
                  cursor: "pointer",
                  color: "#555",
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "5px",
                }}
              />
            </Box>
          </Box>

          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            p="20px"
            borderRadius="4px"
            backgroundColor="#ffffff"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
          >
            {inputFormFields.map(({ label, name, type }) => (
              <TextField
                key={name}
                fullWidth
                variant="filled"
                type={type}
                label={label}
                onChange={(e) => {
                  setDoctorInfo({ ...doctorInfo, [name]: e.target.value });
                }}
                value={doctorInfo[name]}
                InputLabelProps={{
                  style: {color: "#000000"}
                }}
                InputProps={{
                  style: {color: "#000000"}
                }}
                sx={
                  name === "firstName" ||
                  name === "lastName" ||
                  name === "email" ||
                  name === "password"
                    ? {
                      gridColumn: "span 2",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "10px",
                      backgroundColor: "#F0F0F0",
                    }
                    : { 
                      gridColumn: "span 4",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "10px",
                      backgroundColor: "#F0F0F0",
                     }
                }
              />
            ))}
            <FormControl
                fullWidth
                sx={{
                  backgroundColor: "#F0F0F0",
                  color: "black",
                  mb: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <InputLabel
                  sx={{ color: "black" }}
                  id="demo-simple-select-label"
                >
                  Department
                </InputLabel>
                <Select
                  sx={{
                    color: "black",
                  }}
                  value={doctorInfo.doctorDepartement}
                  label="Department"
                  onChange={(e) => {
                    setDoctorInfo({
                      ...doctorInfo,
                      doctorDepartement: e.target.value,
                    });
                  }}
                >
                  {department.map((dep) => (
                    <MenuItem key={dep.name} value={dep.name}>
                      {dep.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          </Box>

          <Box display="flex" justifyContent="end" mt="30px">
            <Button type="submit" color="secondary" variant="contained">
              Ajouter le nouveau médecin
            </Button>
          </Box>
        </form>
      </Box>

      {/* footer */}
      <Box 
        sx={{
          height: "80px", 
          backgroundColor:"#fff", 
          mt: "40px", 
          mb:"20px", 
          color: "black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "40px",
          borderRadius: "10px",
        }}>
        <Box>
          <Typography>
            Copyright © 2024 ClincPlus, All rights reserved.
          </Typography>
        </Box>
        <Box sx={{borderBottom: "2px solid black"}}>
          <Typography>Privacy Policy | Terms & Conditions</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AddNewDoctor;
