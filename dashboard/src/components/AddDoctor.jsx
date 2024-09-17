import React from "react";
import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const AddNewDoctor = ({ title }) => {
    const navigate = useNavigate();

    const url = window.location.href.split("/")[3]

    

    // add new doctor
    const handleNewDoctor = async (e) => {
        e.preventDefault();
        if (url === "adddoctor") {
            navigate(`/doctor`)
        }else {
            navigate(`/adddoctor`)
        }
    };

    return (
        <Box 
            width="200px" 
            height="45px" 
            display="flex" 
            justifyContent="center" 
            alignItems="center"   
            borderRadius="10px"
            backgroundColor= "#00A2FF"
        >
        <IconButton
            sx={{
                width: "100%",
                height: "100%",
                fontSize: "16px",
                fontWeight: "bold",
                "&:hover": {
                    backgroundColor: "#00A2FF",
                },
            }}
            area-label={title}
            color="white"
            onClick={handleNewDoctor}
        >
            <AddIcon sx={{fontSize: "20px"}} />
            {title}
        </IconButton>
        </Box>
    );
};

export default AddNewDoctor;
