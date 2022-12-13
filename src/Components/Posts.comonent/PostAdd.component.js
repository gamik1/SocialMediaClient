import React, { useState, useContext } from 'react';
import { green, red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import {
    Avatar,
    Box, Button,
    Card, CardActions, CardContent,CardMedia,
    IconButton,
    TextField, Typography
} from '@mui/material';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { AuthContext } from "../../context/AuthContext";
import { postAddCall,postImageAddCall } from "../../API/apiCalls";
import TransitionAlert from "./TransitionAlert.component";
import "./post.css";

export default function PostAdd() {
    const [postContent, setPostContent] = useState({'post-text': '', file: null});
    const { user } = useContext(AuthContext);
    const [alertMsg, setAlertMsg] = React.useState(null);
    

    const handleChange = async (event) => {
        let value = event.target.value;
        await setPostContent((prevContent) => {
            return { ...prevContent, 'post-text' : value };
        });
    };

    const handleFileChange = async (event) => {
        let file = event.target.files[0];
        await setPostContent((prevContent) => {
            return { ...prevContent, file : file };
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
            let response;
            if(postContent.file){
                const data = new FormData();
                const fileName = Date.now() + postContent.file.name;
                data.append("name", fileName);
                data.append("file", postContent.file);
                data.append('post-text', postContent['post-text'] )
                console.log(data);
                response = await postImageAddCall(data, user.token);
            }else{
                response = await postAddCall(postContent, user.token);
            }
            
            if (response) {
                console.log(response.newPost);
                console.log("post added");
                await setPostContent(() => {
                    return { 'post-text': '', file:null };
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
            {
                postContent.file &&
                <Box sx={{padding:3,backgroundColor:'#32cd32', display: "flex", flexDirection:'column',alignItems:"baseline",justifyContent:"column"}}>
                <strong>Added Image: </strong>
                <Typography>
                {` ${postContent.file.name}`}
                </Typography>
                <Button size="small" variant="contained" color="error" disableElevation onClick={async ()=>{await setPostContent((prevContent) => {
                    return { ...prevContent, file : null };
                });}}>Remove Image</Button>
                </Box>
            }
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
            <label htmlFor='file'>
            <Typography
            style={{ cursor: "pointer" }}
            sx={{ fontWeight: "light", p: 1 }}
            variant="h6"
            component="span"
          >
            
            <PermMediaIcon color="primary" />
          </Typography>
                    <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={handleFileChange}
                  />
            </label>
                <Box sx={{ flexGrow: 1 }} />
                <Button variant="contained" onClick={ handleSubmit } sx={{ flexGrow: 0, borderRadius: 5, mr: 2 }}>Post</Button>
            </CardActions>
            <TransitionAlert msg={alertMsg} closeAlert={closeAlert} />
        </Card>
    );
}
