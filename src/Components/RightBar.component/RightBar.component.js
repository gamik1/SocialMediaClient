import * as React from 'react';
import { red } from '@mui/material/colors';
import {
    Avatar,
    Box,
    ImageList, ImageListItem, ImageListItemBar,
    Paper,
    Typography,
} from '@mui/material';

export default function RightBar({ itemData }) {
    function Friends() {
        if (itemData.length > 0) {
            return (
                <ImageList cols={2} sx={{ mr: 2 }}>
                    {itemData.map((item) => (
                        <ImageListItem key={item._id} sx={{ mr: 3 }}>
                            <Avatar
                                component={Paper}
                                elevation={8}
                                sx={{ bgcolor: red[500], width: 96, height: 96, ml: 2, borderRadius: 1 }}
                                src={`http://localhost:8800/images/${item.displayImage}`}
                                aria-label=''
                            />
                            <ImageListItemBar
                                title={item.displayName}
                                position="below"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            )
        }
        return 'This is empty'
    }

    return (
        <Box sx={{ width:'100%' }}>
            <Typography variant="h6" sx={{ mt: 2 }}>
                User Friends
            </Typography>
            <Friends />
        </Box>
    );
}