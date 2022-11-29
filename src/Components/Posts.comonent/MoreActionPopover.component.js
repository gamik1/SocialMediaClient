import React from 'react'
import { red } from '@mui/material/colors';
import {
    ListItemText,
    Menu, MenuItem,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonAdd from '@mui/icons-material/PersonAdd';
import PersonRemove from '@mui/icons-material/PersonRemove';
import ListItemIcon from '@mui/material/ListItemIcon';
import { AuthContext } from "../../context/AuthContext";
import { friendAddCall, friendRemoveCall } from "../../API/apiCalls";
import TransitionAlert from "./TransitionAlert.component";

const ITEM_HEIGHT = 48;

export default function MoreActionPopover({ post, anchorEl, onClose, isSelf, friends, askings, updateAskings, updateFriends }) {

    const { user } = React.useContext(AuthContext);
    const [alertMsg, setAlertMsg] = React.useState(null);
    const open = Boolean(anchorEl);
    const popoverId = open ? 'moreAction' : undefined;
    const isAsking = askings.includes(post._user_Id);
    const isFriend = friends.includes(post._user_Id);

    const handleAddFriend = async (e) => {
        e.stopPropagation();
        onClose(e);
        const got = await friendAddCall(post._user_Id, user.token);
        askings.push(post._user_Id);
        updateAskings(askings);
        got.friend.error
            ? setAlertMsg(got.friend.error)
            : setAlertMsg('Adding friend request has been sent');
    }

    const handleRemoveFriend = async (e) => {
        e.stopPropagation();
        onClose(e);
        const got = await friendRemoveCall(post._user_Id, user.token);
        friends = friends.filter((v) => {
            return v !== post._user_Id;
        });
        updateFriends(friends);
        setAlertMsg('Your friend has been removed');
    }

    const closeAlert = (e) => {
        e.stopPropagation();
        setAlertMsg(null);
    }

    const handleProfile = (e) => {
        e.stopPropagation();
        onClose(e);
        window.location.href = isSelf ? `/user/profile` : `/user/others/profile/${post._user_Id}`;
    }

    function FriendActions() {
        if (isSelf || isAsking) {
            return '';
        } else if (isFriend) {
            return (
                <MenuItem key='removefriend' onClick={handleRemoveFriend}>
                    <ListItemIcon sx={{ color: red[500] }}>
                        <PersonRemove fontSize="small" />
                    </ListItemIcon>
                    <ListItemText sx={{ color: red[500] }}>Remove Friend</ListItemText>
                </MenuItem>
            )
        }
        return (
            <MenuItem key='addfriend' onClick={handleAddFriend}>
                <ListItemIcon>
                    <PersonAdd fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add Friend</ListItemText>
            </MenuItem>
        )
    }

    return (
        <div>
            <Menu
                id={popoverId}
                elevation={4}
                MenuListProps={{
                    'aria-labelledby': 'more_' + post._id,
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={onClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <FriendActions />
                <MenuItem key='reportpost' onClick={handleProfile}>
                    <ListItemIcon>
                        <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                </MenuItem>
            </Menu>
            <TransitionAlert msg={alertMsg} closeAlert={closeAlert} />
        </div>
    )
}
