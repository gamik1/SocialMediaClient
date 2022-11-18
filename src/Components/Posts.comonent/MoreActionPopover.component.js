import React from 'react'
import {
    ListItemText,
    Menu, MenuItem,
} from '@mui/material';
import Flag from '@mui/icons-material/Flag';
import PersonAdd from '@mui/icons-material/PersonAdd';
import ListItemIcon from '@mui/material/ListItemIcon';

const ITEM_HEIGHT = 48;

export default function MoreActionPopover({ moreBtnId, anchorEl, onClose, isSelf, isFriend, isAsking }) {

    const open = Boolean(anchorEl);
    const popoverId = open ? 'moreAction' : undefined;

    const handleAddFriend = (e) => {
        e.stopPropagation();
        onClose(e);

    }

    const handleReport = (e) => {
        e.stopPropagation();
        onClose(e);
    }

    return (
        <Menu
            id={popoverId}
            elevation={4}
            MenuListProps={{
                'aria-labelledby': { moreBtnId },
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
            {!isSelf && !isAsking && !isFriend ?
                <MenuItem key='addfriend' onClick={handleAddFriend}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add Friend</ListItemText>
                </MenuItem>
                : ''
            }
            <MenuItem key='reportpost' onClick={handleReport}>
                <ListItemIcon>
                    <Flag fontSize="small" />
                </ListItemIcon>
                <ListItemText>Report Post</ListItemText>
            </MenuItem>
        </Menu>
    )
}
