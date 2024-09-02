import React, {useState, useEffect, useCallback, useContext} from "react";
import {toast} from 'react-toastify';
import Box from "@mui/material/Box";
import axios from 'axios';
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DoneIcon from '@mui/icons-material/Done';
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { Context } from '../../index';


// fetch document by user id
const fetchDocuments = async (baseUrl, id) => {
    try {
      const {data} = await axios.get(`${baseUrl}/api/v1/document/pdf/${id}`)
      return data.documents;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const [documents, setDocuments] = useState([])
    const {baseUrl} = useContext(Context)

    // handle document with using hook useCallback
    const handleDocument = useCallback( async () => {
        try {
            const fetchedDocuments = await fetchDocuments(baseUrl, row._id);
            setDocuments(fetchedDocuments);
        } catch (error) {
            toast.error("Error fetching document")
        }
    }, [row._id]);

    useEffect(() => {
        if (open) {
            handleDocument()
        }
    }, [open, handleDocument])

    // TODO: handle visited links
    const handleLinkVisited = (e) => {
      e.preventDefault();
    }
  
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset", color: "black", fontSize: "15px" }, }} >
          <TableCell>
            <IconButton sx={{ color: "black", }}
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell 
            sx={{color: "black"}} 
            component="th" 
            scope="row"
          >
            {row.firstName} {row.lastName}
          </TableCell>
          <TableCell sx={{color: "black"}} align="right">{row.gender}</TableCell>
          <TableCell sx={{color: "black"}} align="right">{row.phone}</TableCell>
          <TableCell sx={{color: "black"}} align="right">
            {new Date(row.birth).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </TableCell>
          <TableCell sx={{color: "black"}} align="right">{documents.length}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse 
                sx={{
                    border: "2px solid #707070",
                    my: "15px", p:"20px",
                    color: "black",
                    backgroundColor: "#EEEEEE",
                    borderRadius: "4px",
                    "&:hover": {
                        backgroundColor: "#F7F2F2",
                    }
                }}
                in={open}
                timeout="auto"
                unmountOnExit
            >
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{color: "black", fontWeight: "bold"}}>Title</TableCell>
                      <TableCell sx={{color: "black", fontWeight: "bold"}}>Reçu le</TableCell>
                      <TableCell sx={{color: "black", fontWeight: "bold"}} align="right">Documents</TableCell>
                      <TableCell sx={{color: "black", fontWeight: "bold"}} align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {documents?.map((doc) => (
                      <TableRow key={doc._id}>
                        <TableCell sx={{color: "#616161"}} component="th" scope="row">
                          {doc.title}
                        </TableCell>
                        <TableCell 
                          sx={{color: "#616161"}}
                        >
                          {new Date(doc.createdAt).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell sx={{color: "#616161"}} align="right"><a href={doc.pdf}>Voir le document</a></TableCell>
                        <TableCell sx={{color: "#616161"}} align="right">
                          <DoneIcon />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  export default Row;