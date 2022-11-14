import React, { useEffect, useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
//import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../Components/Copyright.component/Copyright.component";
import { Routes, Route, useNavigate } from "react-router-dom";
import Logo from "../../Components/Logo.component/Logo.component";
import { loginCall, registerCall } from "../../API/apiCalls";
import { AuthContext } from "../../context/AuthContext";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const theme = createTheme({
  palette: {
    buttonPrimary: {
      main: "#32CD32",
      darker: "#299617",
    },
  },
});

export default function Register() {
  const [validation, setValidation] = useState({
    email: "Initial",
    password: "Initial",
    confirmPassword: "Initial",
  });
  const [emailPass, setEmailPass] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [regErr, setRegErr] = useState("");
  const navigate = useNavigate();
  const { isFetching, error, dispatch } = useContext(AuthContext);
  const register = async () => {
    const response = await registerCall(emailPass);
    if (response) {
      if (response.registerResponse) {
        if (response.registerResponse.alreadyUsed) {
          setRegErr("This Email is already used !!");
        } else {
          alert("Successfully Registered");
          loginCall(
            { email: emailPass.email, password: emailPass.password },
            dispatch
          );
        }
      } else {
        setRegErr("some error occured please try again later!!");
      }
    } else {
      setRegErr("some error occured please try again later!!");
    }
  };

  //handle submit updates

  const setErrors = (name, value) => {
    setValidation((prevVal) => {
      return { ...prevVal, [name]: value };
    });
  };

  const checkValidation = () => {
    
    // email validation
    const emailCond =
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";
    if (!emailPass.email.trim()) {
      setValidation((prev) => {
        return { ...prev, email: "Email is required !!" };
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
      setErrors(
        "password",
        "Password must contain at least one capital letter"
      );
    } else if (!password.match(cond3)) {
      //errors.password = "Password must contain at least a number";
      setErrors("password", "Password must contain at least a number");
    } else {
      setErrors("password", "Valid");
    }

    //matchPassword validation
    if (validation.password === "Valid") {
      if (!emailPass.confirmPassword) {
        setErrors("confirmPassword", "Password confirmation is required");
      } else if (emailPass.confirmPassword !== emailPass.password) {
        //errors.confirmPassword = "Password does not match confirmation password";
        setErrors("confirmPassword", "Passwords does not match");
      } else {
        setErrors("confirmPassword", "Valid");
      }
    } else {
      setErrors("confirmPassword", validation.password);
    }
  };

  const handleChange = async (event) => {
    setRegErr("");
    let { name, value } = event.target;
    await setEmailPass((prevEmailPass) => {
      return { ...prevEmailPass, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      validation.email === "Valid" &&
      validation.password === "Valid" &&
      validation.confirmPassword === "Valid"
    ) {
      await register();
    } else {
      setRegErr("Please type inputs correctly");
    }
  };

  const alertErr = () => { 
    return(
      <Alert fullWidth severity="error">
          
          {`${regErr}`}
        </Alert>
    )
  }

  useEffect(()=>{
    checkValidation();
  },[emailPass]);

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
          
          {regErr !== "" && alertErr() }
          
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error = {validation.email === "Initial" ? false : validation.email === "Valid" ? false : true}
              helperText={
                validation.email === "Valid" ? false : validation.email
              }
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
              value={emailPass.email}
            />
            <TextField
              error={validation.password === "Initial" ? false : validation.password === "Valid" ? false : true}
              helperText={
                validation.password === "Initial" ? false : validation.password === "Valid" ? false : validation.password
              }
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
              value={emailPass.password}
            />
            <TextField
            error={validation.confirmPassword === "Initial" ? false : validation.confirmPassword === "Valid" ? false : true}
            helperText={
              validation.confirmPassword === "Initial" ? false : validation.confirmPassword === "Valid" ? false : validation.confirmPassword
            }
              variant="filled"
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
              color="buttonPrimary"
              type="submit"
              size= "large"
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
