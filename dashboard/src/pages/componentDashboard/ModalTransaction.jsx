import React, { useState, useContext } from 'react'
import { Box, Modal, Typography, TextField, Button } from '@mui/material'
import { inputFormTransaction } from '../../constants/inputFormFields'
import axios from 'axios'
import { toast } from'react-toastify'
import { Context } from '../../index'

const ModalTransaction = ({open, handleClose}) => {

    const {baseUrl} = useContext(Context)

    const [transaction, setTransaction] = useState({
        user: "",
        date: "",
        cost: "",
    })
    const style = {
        position: 'absolute',
        top: '50%',
        left: '85%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#DFE4EB',
        boxShadow: 20,
        color: "black",
        p: 4,
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${baseUrl}/api/v1/transactio/transaction`, 
                {
                    user: transaction.user,
                    date: transaction.date,
                    cost: transaction.cost,
                },
            )
            if (response) {
                toast.success("Transaction ajoutée avec succès")
                handleClose()
            } else {
                toast.error("Une erreur est survenue lors de l'ajout de la transaction")
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Ajouter une transaction
                </Typography>

                <Typography id="modal-modal-description" sx={{mt: 2}}>
                <form onSubmit={handleSubmit}>
                {inputFormTransaction.map(({ label, name, type }) => (
                  <TextField
                  InputLabelProps={{
                    style: {color: "#000000"}
                  }}
                  InputProps={{
                    style: {color: "#000000"}
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
                      setTransaction({...transaction, [name]: e.target.value})
                    }}
                  />
                ))}
                <Button type='submit'>Ajouter</Button>
                </form>
                </Typography>
            </Box>
        </Modal>
    </div>
  )
}

export default ModalTransaction