import React, { useState, useContext } from "react";

import Geolocation from "../../Components/Geolocation.componemt/Geolocation.component";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";


import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../Components/Copyright.component/Copyright.component";

import { ProfileContext } from "../../context/ProfileContext";


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
    <Paper
    sx={{
      
      p: 2,
      marginTop: 10,
      width:"auto",
      height: "auto",
      flexGrow: 1,
      backgroundColor: (theme) =>
        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    }}
  >
    <Grid container spacing={1} mt={2} mb={5} paddingLeft={1}>
      <Grid item>
        <Avatar
          src="/broken-image.jpg"
          sx={{ width: 250, height: 250 ,marginLeft:15}}
          
          padding={2}
        />
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item  container direction="row" spacing={2}>
          <Grid item >
            <Typography gutterBottom variant="h4" component="div">
              PROFILE INFO
            </Typography>
            <Typography variant="body2" gutterBottom>
              <TextField
             
                margin="normal"
                required
                fullWidth
                onChange={handleChange}
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
              />
              <TextField
              fullWidth
               
               
                margin="normal"
                required
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                autoFocus
                onChange={handleChange}
              />
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <TextField
               fullWidth
                margin="normal"
                required
                id="hobby"
                label="Hobbies"
                name="hobby"
                autoComplete="hobby"
                autoFocus
                onChange={handleChange}
              />
           
            </Typography>
          </Grid>
          <Grid item>
            
            <Typography variant="body2" color="text.secondary">
            <TextField
                
                fullWidth
                margin="normal"
                required
                type="date"
                defaultValue="Date Of Birth"
                inputProps={{ min: "2019-01-24", max: "2020-05-31" }}
               
                id="dob"
                name="dob"
                autoComplete="dob"
                autoFocus
                onChange={handleChange}
              />
              
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
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="body2" color="text.secondary"></Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              <TextField
                margin="normal"
                required
                fullWidth
               
                style={{ width: 530 }}
                id="profession"
              label="Profession"
              name="profession"
              autoComplete="profession"
              autoFocus
              onChange={handleChange}
              />
            </Typography>
          </Grid>
          <Grid item>
          <Button onClick={handleSubmit} variant="contained" sx={{ mt: 3, mb: 4,

  bgColor: '#000',
  paddingTop: 1,
  fontSize: 15,
  paddingBottom: 1,
  fontWeight: 400,
  letterSpacing: 3,
  
  }}  style={{ width: 530 }} >SAVE PROFILE</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Paper>
  );
}
