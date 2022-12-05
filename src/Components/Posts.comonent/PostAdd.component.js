import React, { useState, useContext } from 'react';
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
import { AuthContext } from "../../context/AuthContext";
import { postAddCall } from "../../API/apiCalls";
import TransitionAlert from "./TransitionAlert.component";

export default function PostAdd() {
    const [postContent, setPostContent] = useState({'post-text': ''});
    const { user } = useContext(AuthContext);
    const [alertMsg, setAlertMsg] = React.useState(null);

    const handleChange = async (event) => {
        let { name, value } = event.target;
        await setPostContent((prevContent) => {
            return { ...prevContent, [name]: value };
        });
    };

    const closeAlert = (e) => {
        e.stopPropagation();
        setAlertMsg(null);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (postContent['post-text'].length < 1) {
            setAlertMsg('The content cannot be empty');
        } else if (postContent['post-text'].length > 512) {
            setAlertMsg('The content length of the post cannot be greater than 512');
        } else {
            const response = await postAddCall(postContent, user.token);
            if (response) {
                console.log(response.newPost);
                console.log("post added");
                await setPostContent(() => {
                    return { 'post-text': '' };
                });
                window.location.reload();
            } else {
                console.log("some error occured");
            }
        }
    };

    return (
        <Card aria-label="type your post" sx={{ maxWidth: 3450, mb: 3 }}>
            <CardContent aria-label="type your post">
                <TextField
                    aria-label="new post"
                    id="post-text"
                    name="post-text"
                    label="New Post"
                    placeholder="What's New?"
                    multiline
                    rows={4}
                    variant="filled"
                    autoComplete="post-text"
                    sx={{ width: '100%' }}
                    value={postContent['post-text']}
                    onChange={handleChange}
                />
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add a media" sx={{ flexGrow: 0, ml: 2, mr: 4 }}>
                    <PermMediaIcon color="primary" />
                </IconButton>
                <IconButton aria-label="emoji" sx={{ flexGrow: 0, mr: 4 }}>
                    <EmojiEmotionsIcon color="primary" />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Button variant="contained" onClick={ handleSubmit } sx={{ flexGrow: 0, borderRadius: 5, mr: 2 }}>Post</Button>
            </CardActions>
            <TransitionAlert msg={alertMsg} closeAlert={closeAlert} />
        </Card>
    );
}
