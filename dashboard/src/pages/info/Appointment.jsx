import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Menu, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Header } from "../../components";
import { Context } from "../../index";

const Appointment = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [appointment, setAppointmnt] = useState([]);

  const { isAuthenticated, baseUrl } = useContext(Context);

  const navigate = useNavigate();


  // fetch all appointment
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        await axios.get(`${baseUrl}/api/v1/appointment/all`)
          .then((res) => {
            setAppointmnt(res.data.appointment);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppointment();
  }, []);

  // handle status appointment
  const handleStatusClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  // handle close menu status
  const handleStatusClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  }

  // handle status change 
  const handleStatusChange = async (newStatus) => {

    // Update the status in the backend
    await axios.put(`${baseUrl}/api/v1/appointment/update/${selectedRowId}`, {
        status: newStatus,
      })
     .then((res) => {
      setAppointmnt((prev) => prev.map((app) => app._id === selectedRowId ? {...app, status: newStatus} : app))
      })
     .catch((error) => {
        console.log(error);
      });
    handleStatusClose()
  }

  if (!isAuthenticated) {
    return navigate("/login");
  }

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "firstName", headerName: "Prénom" },
    { field: "lastName", headerName: "Nom" },
    { field: "email", headerName: "Email", width: 180 },
    { field: "phone", headerName: "Téléphone", width: 100 },
    { field: "birth", headerName: "Date de naissance", width: 150 },
    { field: "appointment", headerName: "Rendez-vous", width: 150 },
    {
      field: "doctor",
      headerName: "Médecin",
      width: 150,
      renderCell: (params) => (
        <Box>
          {params.row.doctor.firstName} {params.row.doctor.lastName}
        </Box>
      ),
    },
    { field: "address", headerName: "Address", width: 220 },
    { field: "hasVisited", headerName: "A visité", type: "boolean" },
    {
      field: "status",
      headerName: "Statut",
      width: 100,
      renderCell: (params) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="10px"
          onClick={(event) => handleStatusClick(event, params.row.id)}
        >
          <Box
            border="1px solid white"
            borderRadius="50%"
            width="15px"
            height="15px"
            backgroundColor={
              params.row.status === "pending"
                ? "orange"
                : params.row.status === "confirmed"
                ? "green"
                : params.row.status === "canceled"
                ? "red"
                : ""
            }
          ></Box>
          {params.row.status}
        </Box>
      ),
    },
  ];

  const rows = appointment.map((app) => ({
    id: app._id,
    firstName: app.firstName,
    lastName: app.lastName,
    email: app.email,
    phone: app.phone,
    birth: new Date(app.birth).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    appointment: new Date(app.appointment).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    hasVisited: app.hasVisited,
    doctor: {
      firstName: app.doctor.firstName,
      lastName: app.doctor.lastName,
    },
    address: app.address,
    status: app.status,
  }));

  // row - columns --> data display...
  return (
    <Box m="20px 20px 20px 320px">
      <Header title="RENDEZ-VOUS" subtitle="Liste de tout les rendez-vous" />

      <Box
        m="40px 0 0 0"
        height="75vh"
        // custom css for material ui
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #A0A0A0",
            color: "black"
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
        <DataGrid 
          checkboxSelection 
          rows={rows} 
          columns={columns}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleStatusClose}
        >
          <MenuItem onClick={() => handleStatusChange("pending")}>Pending</MenuItem>
          <MenuItem onClick={() => handleStatusChange("confirmed")}>Confirmed</MenuItem>
          <MenuItem onClick={() => handleStatusChange("canceled")}>Canceled</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Appointment;
