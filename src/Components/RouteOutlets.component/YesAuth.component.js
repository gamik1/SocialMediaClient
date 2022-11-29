import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TopBar from "../../Components/TopBar.component/TopBar.component";
import LeftBar from "../../Components/LeftBar.component/LeftBar.component";
import RightBar from "../../Components/RightBar.component/RightBar.component";
import Posts from "../../Components/Posts.comonent/Posts.component";
import {  ProfileContext, ProfileContextProvider } from "../../context/ProfileContext";

import { Link, Navigate, useOutlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { friendProfilesCall } from "../../API/apiCalls";
import Navigation from "../Navigation.component/Navigation.component";


const theme = createTheme();

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     width:'100%',
//     color: theme.palette.text.secondary,
// }));

export default function ProfileMain() {
    const { user } = useContext(AuthContext);
    const outlet = useOutlet();
   
    const {friendProfiles, loadFriends} = useContext(ProfileContext);
    
    useEffect(() => {
        loadFriends(user.token);
    },[]);


    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <ThemeProvider theme={theme}>
                <CssBaseline />
                <Grid container spacing={3} sx={{px:5}}>
                    <Grid item xs={0} md={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <LeftBar showEvent={true}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {outlet}
                    </Grid>
                    <Grid item xs={0} md={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <RightBar itemData={friendProfiles}/>
                    </Grid>
                </Grid>
        </ThemeProvider>
    );
}