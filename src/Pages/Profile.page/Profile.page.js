import React, { useState, useContext } from "react";
import axios from "axios";
import Geolocation from "../../Components/Geolocation.componemt/Geolocation.component";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

//import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../Components/Copyright.component/Copyright.component";

import { ProfileContext } from "../../context/ProfileContext";

import { red } from "@mui/material/colors";

import "../Profile.page/Profile.page.css";
import { AuthContext } from "../../context/AuthContext";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#FF3CAC",
          backgroundImage: `linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)`,
        },
      },
    },
  },
});

export default function ProfileUpdate() {
  const [profileFormData, setProfileFormData] = useState({});
  const { updateProfile } = useContext(ProfileContext);
  const { user } = useContext(AuthContext);

  const handleChange = async (event) => {
    let { name, value } = event.target;
    await setProfileFormData((prevprofileFormData) => {
      return { ...prevprofileFormData, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = updateProfile(profileFormData, user.token);
    if (response) {
      console.log("profile updated");
      alert("profile updated");
    } else {
      console.log("some error occured");
    }
  };

  return (
    <ThemeProvider theme={theme} sx={{ bgcolor: red }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            paddingTop: 10,
            marginLeft: -10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 600,
            height: "auto",
            color: "#fffff",
            bgcolor: "#F0F0F0",
            borderRadius: 10,
          }}
        >
          <Typography component="h1" variant="h5">
            HOWDY User!!!
          </Typography>
          <br />
          <Avatar src="/broken-image.jpg" sx={{ width: 200, height: 200 }} />

          <Box
            component="form"
            // onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                sx={{ marginLeft: 3 }}
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                autoFocus
                onChange={handleChange}
              />
            </Box>
            
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <TextField
                margin="normal"
                required
                type="date"
                defaultValue="2019-05-24"
                inputProps={{ min: "2019-01-24", max: "2020-05-31" }}
                fullWidth
                id="dob"
                name="dob"
                autoComplete="dob"
                autoFocus
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="bio"
                multiline
                label="Bio"
                name="bio"
                rows={2}
                autoComplete="bio"
                autoFocus
                onChange={handleChange}
              />
            </Box>
            
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="profession"
                label="Profession"
                name="profession"
                autoComplete="profession"
                autoFocus
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="hobby"
                label="Hobbies"
                name="hobby"
                autoComplete="hobby"
                autoFocus
                onChange={handleChange}
              />
            </Box>

            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                mt: 3,
                mb: 4,

                bgColor: "#FF3CAC",
                paddingTop: 1,
                fontSize: 21,
                paddingBottom: 1,
                fontWeight: 700,
                letterSpacing: 3,
              }}
              fullWidth
            >
              Save
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
