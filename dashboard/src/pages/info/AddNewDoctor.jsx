import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { inputFormFields } from "../../constants/inputFormFields";
import { Box, Button, TextField } from "@mui/material";
import { Header } from "../../components";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../index";

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
  
  const [docAvatarPrev, setDocAvatarPrev] = useState("");
  const { isAuthenticated, baseUrl } = useContext(Context);
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
    <Box p="90px 80px 80px 360px">
      <Header
        title="AJOUTER UN MEDECIN"
        subtitle="Céer un nouveau profile de médecin"
      />

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
          </Box>

          <Box display="flex" justifyContent="end" mt="30px">
            <Button type="submit" color="secondary" variant="contained">
              Créer le nouveau médecin
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddNewDoctor;
