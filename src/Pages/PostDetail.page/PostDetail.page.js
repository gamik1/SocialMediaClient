import React, { useState, useEffect } from "react";
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
import PostDetail from "../../Components/Posts.comonent/PostDetail.component";
import { ProfileContextProvider } from "../../context/ProfileContext";
import { Route, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { friendProfilesCall } from "../../API/apiCalls";

const theme = createTheme();

export default function PostsDetail() {
    const {id} = useParams();
    const { user } = React.useContext(AuthContext);
    const [friendProfiles, setFriendProfiles] = React.useState([]);

    React.useEffect(() => {
        loadFriends();
    },[]);

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
                        <LeftBar showEvent={true}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PostDetail postId={id} trigger={loadFriends} />
                    </Grid>
                    <Grid item xs={0} md={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <RightBar itemData={friendProfiles}/>
                    </Grid>
                </Grid>
            </ProfileContextProvider>
        </ThemeProvider>
    );
}