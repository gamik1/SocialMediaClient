import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from '@mui/material/Grid';
import LeftBar from "../../Components/LeftBar.component/LeftBar.component";
import RightBar from "../../Components/RightBar.component/RightBar.component";
import EventList from "../../Components/Event.component/EventList.component";
import { ProfileContextProvider } from "../../context/ProfileContext";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { friendProfilesCall } from "../../API/apiCalls";

const theme = createTheme();

export default function Events() {
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
                        <LeftBar showEvent={false}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <EventList trigger={loadFriends}/>
                    </Grid>
                    <Grid item xs={0} md={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <RightBar itemData={friendProfiles}/>
                    </Grid>
                </Grid>
            </ProfileContextProvider>
        </ThemeProvider>
    );
}