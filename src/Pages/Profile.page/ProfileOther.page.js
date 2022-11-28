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
import { ProfileContext, ProfileContextProvider } from "../../context/ProfileContext";
import Profile from "./Profile.page";
import ProfileShow from "./Profile.Show.Page";
import ProfileUpdate from "./Profile.page";
import { Route, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { friendProfilesCall, friendIdsCall } from "../../API/apiCalls";
import { profileGetOther } from "../../API/apiCalls";
import OtherProfile from "./OtherProfile.page"

const theme = createTheme();

export default function ProfileOther() {
    const { param } = useParams();
    console.log("param", param);
    const [profile, setProfile] = useState({});
    const { user } = React.useContext(AuthContext);
    const [friendProfiles, setFriendProfiles] = React.useState([]);
    const [askings, setAskings] = useState([]);
    const [friends, setFriends] = useState([]);

    const loadProfile = async () => {
        const response = await profileGetOther(param);
        setProfile(response.userProfile);
    };

    React.useEffect(() => {
        loadFriends();
        loadProfile();
    }, []);

    console.log(profile);
    const loadFriends = async () => {
        let response = await friendProfilesCall(user.token);
        if (response) {
            // console.log(response);
            setFriendProfiles(response.profiles);
        } else {
            console.log("some error occured");
        }
        response = await friendIdsCall(user.token);
        if (response.friend) {
            // console.log(response);
            await setAskings(() => {
                return response.friend.askings;
            });
            await setFriends(() => {
                return response.friend.friendIds;
            });
        }
    }

    const updateAskings = (newAskings) => {
        setAskings(newAskings);
        loadFriends()
    }

    const updateFriends = (newFriends) => {
        setFriends(newFriends);
        loadFriends()
    }

    return (
        <ThemeProvider theme={theme}>
            <ProfileContextProvider>
                <CssBaseline />
                <Grid container spacing={3} sx={{ px: 5 }}>
                    <Grid item xs={0} md={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <LeftBar />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <OtherProfile
                            profile={profile}
                            askings={askings}
                            friends={friends}
                            updateAskings={updateAskings}
                            updateFriends={updateFriends} />
                    </Grid>
                    <Grid item xs={0} md={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <RightBar itemData={friendProfiles} />
                    </Grid>
                </Grid>
            </ProfileContextProvider>
        </ThemeProvider>
    );
}