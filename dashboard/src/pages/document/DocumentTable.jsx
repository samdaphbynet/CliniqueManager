import * as React from "react";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Row from "./Row";

const DocumentTable = ({patient}) => {

  return (
    <Box
      sx={{
        borderRadius: "10px",
        marginTop: "20px",
        marginLeft: "300px",
        marginRight: "50px",
        color: "black",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#008A9C", fontSize: "30px", }} >
              <TableCell />
              <TableCell sx={{ fontSize: "15px", fontWeight: "bold" }}> Patients </TableCell>
              <TableCell sx={{ fontSize: "15px", fontWeight: "bold" }} align="right" > Genre </TableCell>
              <TableCell sx={{ fontSize: "15px", fontWeight: "bold" }} align="right" > Téléphone </TableCell>
              <TableCell sx={{ fontSize: "15px", fontWeight: "bold" }} align="right" > Naissance </TableCell>
              <TableCell sx={{ fontSize: "15px", fontWeight: "bold" }} align="right" > Notification </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#F0F8FF"}} >
            {patient?.map((row) => (
               <Row key={row._id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DocumentTable;
