import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import PostAdd from "../../Components/Posts.comonent/PostAdd.component";
import PostItem from "../../Components/Posts.comonent/PostItem.component";
import { AuthContext } from "../../context/AuthContext";
import { postByIdCall, commentListCall, friendByUidCall } from "../../API/apiCalls";

export default function PosstDetailComponent({ postId }) {
    const { user, initUid } = useContext(AuthContext);
    const [post, setPost] = useState(null);
    const [commentList, setCommentList] = useState([]);
    const [askingFriends, setAskingFriends] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const topicPost = await postByIdCall(postId, user.token)
        if (topicPost) {
            console.log(topicPost.post);
            initUid(topicPost.user._id);
            setPost(() => {
                return topicPost.post;
            });
        }

        let response = await commentListCall(postId, user.token);
        if (response) {
            console.log(response.posts);
            setCommentList(() => {
                return response.comments;
            });

        } else {
            console.log("some error occured");
        }

        response = await friendByUidCall(user.token);
        if (response.friend) {
            console.log(response);
            await setAskingFriends(() => {
                return response.friend.askings;
            });
            await setFriends(() => {
                return response.friend.friendIds;
            });
        } else {
            console.log("some error occured");
        }
    }

    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            {post ? <PostItem key={post._id} post={post} isMain={true} askings={askingFriends} friends={friends} /> : <div>Post doesn't exsit!</div>}
            <Stack spacing={2} sx={{ mt: 2 }}>
                {commentList.map((p) => (<PostItem key={p._id} post={p} askings={askingFriends} friends={friends} />))}
            </Stack>
        </Box>
    );
}