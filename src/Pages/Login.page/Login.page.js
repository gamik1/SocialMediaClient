import React, { useState, useContext, useEffect } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../Components/Copyright.component/Copyright.component";
import { Routes, Route, useNavigate } from "react-router-dom";
import Logo from "../../Components/Logo.component/Logo.component";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { CircularProgress } from '@mui/material';

import { loginCall } from "../../API/apiCalls";
import { AuthContext } from "../../context/AuthContext";


const theme = createTheme({
  palette: {
    buttonPrimary: {
      main: "#32CD32",
      darker: "#299617",
    },
  },
});

export default function Login({ setToken }) {
  const [emailPass, setEmailPass] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const {error, isFetching , dispatch} = useContext(AuthContext);

  
  useEffect(()=>{
    if(error){
      if(error.includes("User not found")){
        setErrorMsg("User Not Found");
      }else if(error.includes("Wrong Password")){
        setErrorMsg("Wrong Password")
      }else{
        setErrorMsg("Something's Wrong Try Again")
      }
    }else{
      setErrorMsg("");
    }
  },[error]);
  const handleChange = async (event) => {
    setErrorMsg("");
    let { name, value } = event.target;
    await setEmailPass((prevEmailPass) => {
      return { ...prevEmailPass, [name]: value };
    });
    console.log(emailPass);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(emailPass);
    await loginCall({ ...emailPass }, dispatch);
    // if(error){
    //   if(error.toString().includes("User Not Found")){
    //     setErrorMsg("user Not Found");
    //   }
    // }else{
    //   setErrorMsg("");
    // }
    console.log("error:",error, errorMsg);
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
            Sign in
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          { errorMsg !== "" ?
            <Alert severity="error">{errorMsg}</Alert>
            :
            ""
            }
            <TextField
              variant="filled"
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
              variant="filled"
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
              color="buttonPrimary"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: 60 }}
              disabled={isFetching}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs={12}>
               { 
                // <Link href="#" variant="body2">
                //   Forgot password?
                // </Link>
              }
              </Grid>
              <Grid item xs={12}>
              {isFetching ? 
                <CircularProgress  />
               : 
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              }
                
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
