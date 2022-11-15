import * as React from 'react';
import PropTypes from 'prop-types';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import {
    Avatar,
    Box, Button,
    Card, CardActions, CardContent, CardHeader,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    TextField, Typography
} from '@mui/material';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment'
import { AuthContext } from "../../context/AuthContext";
import { commentAddCall } from "../../API/apiCalls";

const MyDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function MyDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

MyDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


export default function CommentDialog({ isOpen, closeComment, avatar, post }) {
    const { user } = React.useContext(AuthContext);

    const handleComment = async (event) => {
        event.preventDefault();
        const postContent = document.getElementById('comment-text').value;
        closeComment();
        const response = await commentAddCall({'comment-text': postContent, 'post-id': post._id}, user.token);
        if (response) {
            console.log(response.newComment);
            console.log("comment added");
            window.location.reload();
        } else {
            console.log("some error occured");
        }
    }

    return (
        <div>
            <MyDialog open={isOpen} onClose={closeComment}>
                <MyDialogTitle id="my-dialog-title" onClose={closeComment}>
                    Add Comment
                </MyDialogTitle>
                <DialogContent>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label={avatar}>
                                {avatar.slice(0, 1).toUpperCase()}
                            </Avatar>
                        }
                        subheader={moment(post.createDate).format('h:mm a, MMM Do')}
                    />
                    <CardContent sx={{ textAlign: 'left' }}>
                        {post.postContent.split('\n').map((row, i) =>
                            <DialogContentText paragraph sx={{ lineHeight: 1 }} key={i}>
                                {row}
                            </DialogContentText>
                        )}
                    </CardContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="comment-text"
                        label="Write your comment"
                        type="text"
                        multiline
                        rows={3}
                        fullWidth
                        variant="filled"
                    />
                </DialogContent>
                <DialogActions>
                    <IconButton aria-label="add a media" sx={{ flexGrow: 0, ml: 4, mr: 4 }}>
                        <PermMediaIcon color="primary" />
                    </IconButton>
                    <IconButton aria-label="emoji" sx={{ flexGrow: 0, mr: 4 }}>
                        <EmojiEmotionsIcon color="primary" />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button variant="contained" sx={{ flexGrow: 0, mr: 4 }} onClick={handleComment}>Comment</Button>
                </DialogActions>
            </MyDialog>
        </div>
    );
}
