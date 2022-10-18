import React, { useEffect, useState } from "react";
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
  
  const [validation, setValidation] = useState({
    
    email: "Valid",
    password: "Valid",
    confirmPassword: "Valid",
  });
  const [emailPass, setEmailPass] = useState({ 
  email: "",
  password: "",
  confirmPassword: "", });
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

 

  //handle submit updates
  
  const setErrors = (name,value) => {
    setValidation(prevVal => {
      return {...prevVal, [name]:value}
    });
  }

  const checkValidation = () => {
    //let validation = errors;

    

    // email validation
    const emailCond =
      "^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";
    if (!emailPass.email.trim()) {
      setValidation(prev=>{
        return {...prev, email : "Email is required !!"}
      });
    } else if (!emailPass.email.match(emailCond)) {
      setErrors("email", "Please enter a valid email address");
    } else {
      setErrors("email", "Valid");
    }

    //password validation
    const cond1 = "^(?=.*[a-z]).{6,20}$";
    const cond2 = "^(?=.*[A-Z]).{6,20}$";
    const cond3 = "^(?=.*[0-9]).{6,20}$";
    const password = emailPass.password;
    if (!password) {
      //errors.password = "password is required";
      setErrors("password", "Password is Required");
    } else if (password.length < 6) {
      // errors.password = "Password must be longer than 6 characters";
      setErrors("password", "Password must be longer than 6 characters");
    } else if (password.length >= 20) {
      //errors.password = "Password must shorter than 20 characters";
      setErrors("password", "Password must shorter than 20 characters");
    } else if (!password.match(cond1)) {
      //errors.password = "Password must contain at least one lowercase";
      setErrors("password", "Password must contain at least one lowercase");
    } else if (!password.match(cond2)) {
      //errors.password = "Password must contain at least one capital letter";
      setErrors("password", "Password must contain at least one capital letter");
    } else if (!password.match(cond3)) {
      //errors.password = "Password must contain at least a number";
      setErrors("password", "Password must contain at least a number");
    } else {

      setErrors("password", "Valid");
    }

    //matchPassword validation
    if (!emailPass.confirmPassword) {
     
      setErrors("confirmPassword", "Password confirmation is required");
    } else if (emailPass.confirmPassword !== emailPass.password) {
      //errors.confirmPassword = "Password does not match confirmation password";
      setErrors("confirmPassword", "Password does not match confirmation password");
    } else {
      setErrors("confirmPassword", "Valid");
    }

    
  };
  
  const handleChange = async (event) => {
    let { name, value } = event.target;
    // setEmailPass({ ...emailPass, [name]: value });
    await setEmailPass((prevEmailPass) => {
      return { ...prevEmailPass, [name]: value };
    });
    console.log(emailPass);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(validation.email == "Valid" && validation.password == "Valid" && validation.confirmPassword == "Valid"){
      await register();
    }else{
      alert("you have errors");
    }
    
  };

  useEffect(() => {
    checkValidation();
  }, [emailPass]);

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
            Register Now
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
              value={emailPass.email}
            />
             {validation.email && <p>{validation.email}</p>}
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
              value={emailPass.password}
            />
            {validation.password && <p>{validation.password}</p>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              onChange={handleChange}
              value={emailPass.confirmPassword}
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
