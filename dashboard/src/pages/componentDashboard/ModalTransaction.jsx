import React, { useState, useContext } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { inputFormTransaction } from "../../constants/inputFormFields";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../index";
import { department } from "../../constants/mockData";

const ModalTransaction = ({ open, handleClose }) => {
  const { baseUrl } = useContext(Context);

  const [transaction, setTransaction] = useState({
    user: "",
    department: "",
    date: "",
    cost: "",
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "85%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#DFE4EB",
    boxShadow: 20,
    borderRadius: 3,
    overflow: "hidden",
    color: "black",
    p: 4,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/transaction/transaction`,
        {
          user: transaction.user,
          department: transaction.department,
          date: transaction.date,
          cost: transaction.cost,
        }
      );
      if (response) {
        toast.success("Transaction ajoutée avec succès");
        handleClose();
      } else {
        toast.error(
          "Une erreur est survenue lors de l'ajout de la transaction"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Une erreur est survenue lors de l'ajout de la transaction");
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              backgroundColor: "#04657EFF",
              width: "max-content",
              color: "white",
              p: "10px",
              borderRadius: "5px",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Ajouter une transaction
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit}>
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
                  department
                </InputLabel>
                <Select
                  sx={{
                    color: "black",
                  }}
                  value={transaction.department}
                  label="Department"
                  onChange={(e) => {
                    setTransaction({
                      ...transaction,
                      department: e.target.value,
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
              {inputFormTransaction.map(({ label, name, type }) => (
                <TextField
                  InputLabelProps={{
                    style: { color: "#000000" },
                  }}
                  InputProps={{
                    style: { color: "#000000" },
                  }}
                  sx={{
                    gridColumn: "span 2",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    marginBottom: "10px",
                    backgroundColor: "#F0F0F0",
                  }}
                  key={name}
                  fullWidth
                  variant="filled"
                  type={type}
                  label={label}
                  onChange={(e) => {
                    setTransaction({ ...transaction, [name]: e.target.value });
                  }}
                />
              ))}
              <Button
                sx={{
                  backgroundColor: "#99DB5BFF",
                  border: "1px solid black",
                  mt: "10px",
                }}
                type="submit"
              >
                Ajouter
              </Button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalTransaction;
