import React, { useState, useEffect } from "react";
import axios from "axios";
import Geolocation from "../../Components/Geolocation.componemt/Geolocation.component";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

//import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../../Components/Copyright.component/Copyright.component";


import { red } from "@mui/material/colors";

import '../Profile.page/Profile.page.css';


const theme  = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: '#FF3CAC',
            backgroundImage: `linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)`,
          },
        },
      },
    }
  });

export default function Profile() {
  
  
  return (
    <ThemeProvider theme={theme} sx={{ bgcolor: red }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            paddingTop:10,
            marginLeft:-10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 600, height: "auto",
            color:'#fffff',
            bgcolor: '#F0F0F0' ,
            borderRadius:10
          }}
        >
        
          <Typography component="h1" variant="h5" >
            HOWDY User!!!
          </Typography>
          <br />
          <Avatar src="/broken-image.jpg"
          sx={{ width: 200, height: 200 }} />
          
          <Box 
            component="form"
            // onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
            <TextField
              margin="normal"
              required
              fullWidth
              id="fname"
              label="First Name"
              name="fname"
              autoComplete="fname"
              autoFocus
              
             
            />
            <TextField
              sx={{marginLeft:3}}
              margin="normal"
              required
              fullWidth
              id="lname"
              label="Last Name"
              name="lname"
              autoComplete="lname"
              autoFocus
              
            />
        
        
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              
             
            />
           
        
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
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
            />
           
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <TextField
              margin="normal"
              required
              fullWidth
              id="bio"
              multiline
              label="Bio"
              name="bio"
              rows ={2}
              autoComplete="bio"
              autoFocus
            />
           
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <TextField
              margin="normal"
              required
              fullWidth
              id="loc"
              
              label="Location"
              name="loc"
              
              autoComplete="loc"
              autoFocus
            />
             
           
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <TextField
              margin="normal"
              required
              fullWidth
              id="profession"
              
              label="Profession"
              name="profession"
              
              autoComplete="profession"
              autoFocus
            />
           
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <TextField
              margin="normal"
              required
              fullWidth
              id="hobby"
              
              label="Hobbies"
              name="hobby"
              
              autoComplete="hobby"
              autoFocus
            />
           
      </Box>
      
      <Button variant="contained" sx={{ mt: 3, mb: 4,
    
    bgColor: '#FF3CAC',
    paddingTop: 1,
    fontSize: 21,
    paddingBottom: 1,
    fontWeight: 700,
    letterSpacing: 3,
    }} fullWidth >Save</Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
