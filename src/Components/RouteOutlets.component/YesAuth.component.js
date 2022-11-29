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
import {  ProfileContextProvider } from "../../context/ProfileContext";

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
    const [friendProfiles, setFriendProfiles] = React.useState([]);

    useEffect(() => {
        loadFriends();
    },[]);

    if (!user) {
        return <Navigate to="/login" />;
    }


    const loadFriends = async () => {
        let response = await friendProfilesCall(user.token);
        if (response) {
            // console.log(response);
            setFriendProfiles(response.profiles);
        } else {
            console.log("some error occured");
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <ProfileContextProvider>
     
                <CssBaseline />
                <Grid container spacing={3} sx={{px:5}}>
                    <Grid item xs={0} md={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <LeftBar/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {outlet}
                    </Grid>
                    <Grid item xs={0} md={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <RightBar itemData={friendProfiles}/>
                    </Grid>
                </Grid>
            </ProfileContextProvider>
        </ThemeProvider>
    );
}