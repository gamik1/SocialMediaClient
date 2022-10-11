import React, { useState } from "react";
import axios from "axios";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
//import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../Components/Copyright.component/Copyright.component";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Logo from "../../Components/Logo.component/Logo.component";


const theme = createTheme();

export default function Register() {
  
  const [emailPass, setEmailPass] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const register = async () => {
    await axios
      .post("http://localhost:8800/signup", emailPass)
      .then((response) => {
        console.log(response.data);
        console.log("signup succesfull");
        alert("signup success");
        navigate("/login");  
      })
      .catch((error) => {
        if (error.response.status == 500) {
          console.log({ message: "signup Failed" });
                }
      });
  };

  const handleChange = async (event) => {
    let { name, value } = event.target;

    await setEmailPass((prevEmailPass) => {
      return { ...prevEmailPass, [name]: value };
    });
    console.log(emailPass);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await register();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          
            <Logo />
          
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
