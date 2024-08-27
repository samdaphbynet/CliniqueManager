// src/Login.js
import React, { useState, useContext} from "react";
import {
  Container,
  TextField,
  Button,
  Avatar,
  Typography,
  Box,
  Grid,
  Paper,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { toast } from "react-toastify";
import {Context} from "../../index";

const Login = () => {
  const {setIsAuthenticated, baseUrl} = useContext(Context);
  const [ admin, setAdmin ] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });


  const handleLoginPage = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/v1/user/login`, {
        email: admin.email,
        password: admin.password,
        confirmPassword: admin.confirmPassword,
        role: admin.role,
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
        toast.success(response.data.message)
        setIsAuthenticated(true);
        window.location.href = "/";
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message)
    }

  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 4, marginTop: 8 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              value={admin.email}
              onChange={(e) => {
                setAdmin({ ...admin, email: e.target.value });
              }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse E-mail"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={admin.password}
              onChange={(e) => {
                setAdmin({ ...admin, password: e.target.value });
              }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              value={admin.confirmPassword}
              onChange={(e) => {
                setAdmin({ ...admin, confirmPassword: e.target.value });
              }}
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmez le mot de passe"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={admin.role}
                onChange={(e) => {
                  setAdmin({ ...admin, role: e.target.value });
                }}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Doctor">Doctor</MenuItem>
                <MenuItem value="Patient">Patient</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={handleLoginPage}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Connexion
            </Button>
            <Grid container>
              <Grid item xs>
                <Button href="#" variant="body2">
                  Mot de passe oublié ?
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
