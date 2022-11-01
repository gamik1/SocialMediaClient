import * as React from 'react';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import {
    Avatar,
    Box, Button,
    Card, CardActions, CardContent,
    IconButton,
    TextField, Typography
} from '@mui/material';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

export default function PostAdd() {

    return (
        <Card sx={{ maxWidth: 3450, mb:3 }}>
            <CardContent>
                <TextField
                    id="outlined-textarea"
                    label="New Post"
                    placeholder="What's New?"
                    multiline
                    rows={4}
                    variant="filled"
                    sx={{ width: '100%' }}
                />
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add a media" sx={{flexGrow:0, ml:2, mr:4}}>
                    <PermMediaIcon color="primary" />
                </IconButton>
                <IconButton aria-label="emoji" sx={{flexGrow:0, mr:4}}>
                    <EmojiEmotionsIcon color="primary" />
                </IconButton>
                <Box sx={{ flexGrow:1 }}/>
                <Button variant="contained" sx={{ flexGrow:0, borderRadius:5, mr:2 }}>Post</Button>
            </CardActions>
        </Card>
    );
}
