import React from 'react'
import { red, blue } from '@mui/material/colors';
import {
    Avatar,
    Box, Button,
    Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, CssBaseline,
    IconButton,
    Link,
    Popover,
    Tooltip,
    Typography
} from '@mui/material';
import { AuthContext } from "../../context/AuthContext";
import { friendAddCall, friendRemoveCall } from "../../API/apiCalls";
import TransitionAlert from "./TransitionAlert.component";

export default function AvatarPopover({ profile, anchorEl, onClose, isSelf, friends, askings, updateAskings, updateFriends }) {

    const { user } = React.useContext(AuthContext);
    const [alertMsg, setAlertMsg] = React.useState(null);
    const avatarPopoverOpen = Boolean(anchorEl);
    const avatarPopoverId = avatarPopoverOpen ? 'profile_' + profile._user_Id : undefined;
    const isAsking = askings.includes(profile._user_Id);
    const isFriend = friends.includes(profile._user_Id);

    const handlePopoverClick = (e) => {
        e.stopPropagation();
    }

    const handleAddFriend = async (e) => {
        onClose(e);
        const got = await friendAddCall(profile._user_Id, user.token);
        // console.log(got);
        askings.push(profile._user_Id);
        updateAskings(askings);
        got.friend.error
            ? setAlertMsg(got.friend.error)
            : setAlertMsg('Adding friend request has been sent');
    }

    const handleRemoveFriend = async (e) => {
        onClose(e);
        const got = await friendRemoveCall(profile._user_Id, user.token);
        // console.log(got);
        friends = friends.filter((v) => {
            return v !== profile._user_Id;
        });
        updateFriends(friends);
        setAlertMsg('Your friend has been removed');
    }

    const closeAlert = (e) => {
        e.stopPropagation();
        setAlertMsg(null);
    }

    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );

    function FriendActionButton() {
        if (isSelf) {
            return '';
        } else if (isFriend) {
            return <Button sx={{ color: red[500] }} size="small" onClick={handleRemoveFriend}>Remove Friend</Button>
        } else if (isAsking) {
            return <Typography sx={{ fontSize: 14 }} color={blue[500]} gutterBottom>
                You've sent friend request
            </Typography>
        }
        return <Button size="small" onClick={handleAddFriend}>Add Friend</Button>
    }

    return (
        <div>
            <Popover
                id={avatarPopoverId}
                open={avatarPopoverOpen}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                onClick={handlePopoverClick}
            >
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {profile.displayName}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {bull} {profile.profession ? profile.profession : ''}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.primary">
                            {profile.bio ? profile.bio : ''}
                        </Typography>
                        <Typography variant="body2">
                            {profile.hobby ? profile.hobby : ''}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <FriendActionButton />
                    </CardActions>
                </Card>
            </Popover>
            <TransitionAlert msg={alertMsg} closeAlert={closeAlert} />
        </div>
    )
}
