import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import PostAdd from "../../Components/Posts.comonent/PostAdd.component";
import PostItem from "../../Components/Posts.comonent/PostItem.component";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Posts() {
    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            <PostAdd />
            <Stack spacing={2}>
                <PostItem></PostItem>
                <PostItem></PostItem>
            </Stack>
        </Box>
    );
}