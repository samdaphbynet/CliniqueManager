import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import ModalTransaction from "./ModalTransaction";
import { Context } from "../../index";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const {baseUrl} = useContext(Context)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // function that fetch all transactions
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/transaction/getall`
      );
      setTransactions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // 
  const handleTransactionAdedd = () => {
    fetchTransactions();
  }

  return (
    <Box
      gridColumn="span 4"
      gridRow="span 7"
      backgroundColor="#FFFFFFFF"
      overflow="auto"
      borderRadius="7px"
      boxShadow="0 0px 20px 0px #A0A0A0"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid #00AEFF`}
        colors="#000000"
        p="15px"
      >
        <Typography color="#000000" variant="h5" fontWeight="600">
          Transactions récentes
        </Typography>
        <Typography color="#0077FF" variant="h5" fontWeight="600">
          <Button>
            <AddCircleIcon onClick={handleOpen} sx={{ fontSize: "30px", color: "#0077FF" }} />
          </Button>
        </Typography>
      </Box>
      <ModalTransaction open={open} handleClose={handleClose} onTransactionAdded={handleTransactionAdedd}/>
      {transactions.map((transaction, i) => (
        <Box
          key={`${transaction._id}-${i}`}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid #00AEFF`}
          p="15px"
        >
          <Box borderRight="1px solid #CCCCCCFF" pl="3px" width="190px">
            <Typography color="#0077FF" variant="h6" fontWeight="500">
              {transaction._id}
            </Typography>
            <Typography color="#000000">{transaction.user}</Typography>
          </Box>
          <Box 
            borderRight="1px solid #CCCCCCFF" 
            pl="3px" 
            width="110px" 
            height="40px" 
            display="flex" 
            justifyContent="start" 
            alignItems="center"
          >
            <Typography color="#000000">{transaction.department}</Typography>
          </Box>
          <Box color="#575757">
            {new Date(transaction.date).toLocaleDateString("fr-FR",{
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </Box>
          <Box
            backgroundColor="#00FFFF"
            color="#000000"
            p="5px 10px"
            borderRadius="4px"
          >
            ${transaction.cost}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Transactions;
