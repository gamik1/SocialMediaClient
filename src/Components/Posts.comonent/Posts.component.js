import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import PostAdd from "../../Components/Posts.comonent/PostAdd.component";
import PostItem from "../../Components/Posts.comonent/PostItem.component";
import { AuthContext } from "../../context/AuthContext";
import { postListCall } from "../../API/apiCalls";

export default function Posts() {
    const [postList, setPostList] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        getPostList();
    }, []);

    const getPostList = async () => {
        const response = await postListCall(user.token);
        if (response) {
            console.log(response.posts);
            await setPostList(() => {
                return response.posts;
            });

        } else {
            console.log("some error occured");
        }
    }

    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            <PostAdd />
            <Stack spacing={2} sx={{ mb: 4 }}>
                {postList.map((p) => (<PostItem key={p._id} post={p} />))}
            </Stack>
        </Box>
    );
}