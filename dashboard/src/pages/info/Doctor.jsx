import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { Header } from "../../components";
import AddDoctor from "../../components/AddDoctor";
import ModalEditDoctor from "../info/ModalEditDoctor";
import { Context } from "../../index";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = useState(false);
  const [idDoctor, setIdDoctor] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {baseUrl, isCollapsed} = useContext(Context)

  // fetch data from api
  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await axios.get(`${baseUrl}/api/v1/user/doctor`);
      setDoctors(response.data.doctors);
    };
    fetchDoctors();
  }, []);

  // handle delete doctor
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/v1/user/deletedoctor/${id}`)
        .then((res) => {
          setDoctors((prevDoctors) =>
            prevDoctors.filter((doc) => doc._id !== id)
          );
          console.log(`Doctor with id ${id} deleted`);
        })
        .catch((error) => {
          console.error(`Error deleting doctor with id ${id}:`, error);
        });
    } catch (error) {
      console.error(`Error deleting doctor with id ${id}:`, error);
    }
  };
  // handle column 
  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 80,
      renderCell: (params) => (
        <Avatar src={params.value} alt={params.row.firstName} />
      ),
    },
    { field: "id", headerName: "ID", width: 250},
    { field: "firstName", headerName: "First name", width: 100},
    { field: "lastName", headerName: "Last name", width: 100},
    { field: "email", headerName: "Email", width: 250},
    { field: "departement", headerName: "Departement", width: 150},
    { field: "age", headerName: "Age", headerAlign: "left", width: 150},
    {
      field: "delete",
      headerName: "Delete",
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "0",
            "&:hover": {
              backgroundColor: "#FFB8B8",
            },
          }}
          aria-label="delete"
          size="large"
          onClick={() => handleDelete(params.row.id)}
        >
          <DeleteIcon fontSize="inherit" sx={{ color: "red" }} />
        </IconButton>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "0",
            "&:hover": {
              backgroundColor: "#67CFFF",
            },
          }}
          aria-label="edit"
          size="large"
          onClick={() => {
            handleOpen()
            setIdDoctor(params.row.id)
          }}
        >
          <EditIcon fontSize="inherit" sx={{ color: "green" }} />
        </IconButton>
      ),
    },
  ];

  // handle rows
  const rows = doctors.map((doc) => ({
    id: doc._id,
    image: doc.docAvatar.url,
    firstName: doc.firstName,
    lastName: doc.lastName,
    email: doc.email,
    departement: doc.doctorDepartement,
    age: new Date(doc.birth).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  }));

  return (
    <Box m="100px 30px" ml={isCollapsed ? "110px" : "300px"}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        m="0 20px"
      >
        <Header title="Médecins" subtitle="Gérer les médecins" />
        <AddDoctor title="Ajouter un médecin" />
      </Box>
      <ModalEditDoctor open={open} onClose={handleClose} idDoctor={idDoctor}/>
      {/* modal */}
      
      {/* fin modal  */}
      <Box
        m="15px 0 0 0"
        height="70vh"
        boxShadow="0 0px 20px 0px #A0A0A0"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #A0A0A0",
            color: "black",
          },
          "& .name-column--cell": {
            color: "#000000",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#00A2FF",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#EBEBEB",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#00A2FF",
            borderTop: "none",
          },
          "& .MuiCheckbox-root": {
            color: `#000000 !important`,
          },
        }}
      >
        <Box width="100%" height="100%">
          <DataGrid
            sx={{
              fontSize: "15px",
            }}
            rows={rows}
            columns={columns}
          />
        </Box>
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

export default Doctor;
