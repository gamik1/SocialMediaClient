import React, { useState, useContext } from "react";
//import axios from "axios";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
//import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
//import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
//import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../Components/Copyright.component/Copyright.component";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Logo from "../../Components/Logo.component/Logo.component";


import { loginCall } from "../../API/apiCalls";
import { AuthContext } from "../../context/AuthContext";

const theme = createTheme();

export default function Login({setToken}) {
  
  const [emailPass, setEmailPass] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { isFetching,error, dispatch } = useContext(AuthContext);
  console.log(useContext(AuthContext));
  // const login = async () => {
  //   await axios
  //     .post("http://localhost:8800/login", {email : email.current.value , password : password.current.value})
  //     .then((response) => {
  //       setToken(response.data);
  //       console.log("logged in succesfully");
  //       navigate("/success");
  //     })
  //     .catch((error) => {
  //       if (error.response.status == 500) {
  //         console.log({ message: "Login Failed" });
  //         alert("login failed");        }
  //     });
  // };

  const handleChange = async (event) => {
    let { name, value } = event.target;

    await setEmailPass((prevEmailPass) => {
      return { ...prevEmailPass, [name]: value };
    });
    console.log(emailPass);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(emailPass);
    loginCall(
      { ...emailPass },
      dispatch
    );
  };

  //console.log(user);
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
