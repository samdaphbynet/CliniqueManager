
import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../../components/Header';
import { Context } from '../../index';

const Messages = () => {
    const [message, setMessage] = useState([])
    const {baseUrl} = useContext(Context)

    useEffect(() => {
        const getAllMessages = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/v1/message/patient/all`)
                setMessage(response.data.allMessage)
            } catch (error) {
                console.error(error)
            }
        }
        getAllMessages()
    }, [])


    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field:'message', headerName: 'Message', width: 500 },
    ]

    const rows = message.map((msg) => ({
        id: msg._id,
        firstName: msg.firstName,
        lastName: msg.lastName,
        email: msg.email,
        phone: msg.phone,
        message: msg.message,

    }))
  return (
    <Box m="80px 30px 30px 320px">
        <Header title="Boite de réception" subtitle="liste de tout les messages" />
        <Box mt="10px" height="75vh"
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
          }

        }}
      >
            <DataGrid 
            sx={{
                fontSize: "14px",
            }}
            rows={rows}
            columns={columns}/>
        </Box>
    </Box>
  )
}

export default Messages