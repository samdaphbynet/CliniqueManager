import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';
import { Box, IconButton, InputBase, Typography } from "@mui/material";
import Header from "../../components/Header";
import DocumentTable from "./DocumentTable";
import SearchIcon from "@mui/icons-material/Search";
import { Context } from '../../index';

const Document = () => {

  const [patients, setPatients] = useState([])
  const [filteredPatients, setFilteredPatients] = useState([])

  const {baseUrl, isCollapsed} = useContext(Context)

  console.log(isCollapsed)

  useEffect(() => {
      // function async fetched all patient
      const fetchAllPatients = async () => {
          try {
            const res = await axios.get(`${baseUrl}/api/v1/user/allpatient`)
            if (res.status === 200) {
                setPatients(res.data.patients)
                setFilteredPatients(res.data.patients)
            } else {
                toast("Error fetching patient")
            }
          } catch (error) {
            console.error("Error fetching patient", error)
            toast("Error fetching patient")
          }
      }
      fetchAllPatients();
  }, [])

  const handleSearchedPatients = async (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtred = patients.filter((pat) => pat.firstName.toLowerCase().includes(searchTerm));
    setFilteredPatients(filtred)
  }

  //console.log(patient)
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
          padding: "20px",
          marginTop: "100px",
          marginLeft: isCollapsed ? "100px" : "300px",
          marginRight: "50px",
          color: "black",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        
        <Header
          title="Document"
          subtitle="Les documents reçu de patients"
        />
        {/* 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧 SEARCH BAR 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧 */}
        <Box display="flex" borderRadius="3px" backgroundColor="#000000">
          <InputBase 
            sx={{ ml: 2, flex: 1 }}
            placeholder="Recherche"
            onChange={handleSearchedPatients}
          />

          <IconButton type="button" sx={{ p: 1 }} >
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      <DocumentTable patient={filteredPatients}/>

      {/* footer */}
      <Box 
        sx={{
          marginLeft: isCollapsed ? "100px" : "300px",
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
    </>
  );
};

export default Document;
