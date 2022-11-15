import * as React from 'react';
import { red } from '@mui/material/colors';
import { styled, alpha } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Card, CardActions, CardContent, CardHeader, CardMedia, Collapse,
    IconButton,
    Link,
    Popover,
    Tooltip,
    Typography
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { profleByIdCall } from "../../API/apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CommentDialog from "./CommentDialog.component";
import moment from 'moment'

export default function PostItem({ post, isMain }) {
    const [avatarImg, setAvatarImg] = React.useState(null);
    const [avatarLetter, setAvatarLetter] = React.useState('');
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { user } = React.useContext(AuthContext);

    React.useEffect(() => {
        async function fetchData() {
            let response = await profleByIdCall(post._user_Id, user.token);
            // console.log(response)

            let s = response.userProfile.firstName ? response.userProfile.firstName : response.user.email;
            setAvatarLetter(s);
            // TODO setAvatarImg
        }
        fetchData();
    }, []);

    const MyCard = isMain ? Card : styled(Card)(({ theme }) => ({
        ':hover': {
            boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.info.dark, 0.1)}`,
            backgroundColor: '#f9f9f9',
            cursor: 'pointer',
        }
    }));

    const postDetail = (e) => {
        if (!isMain) {
            e.preventDefault();
            window.location.href = `/post/${post._id}`;
        }
    }

    const handleAvatar = (e) => {
        e.stopPropagation();

    }

    const handleComment = (e) => {
        e.stopPropagation();
        setDialogOpen(true);
    }

    const handleShare = (e) => {
        e.stopPropagation();
    }

    const closeComment = () => {
        setDialogOpen(false);
    }

    const handleLike = (e) => {
        e.stopPropagation();

    }

    return (
        <MyCard sx={{ maxWidth: 3450 }} >
            <Box onClick={postDetail}>
                <CardHeader
                    avatar={
                        <Box>
                            <Avatar sx={{ bgcolor: red[500] }} aria-label={avatarLetter} onClick={handleAvatar}>
                                {avatarLetter.slice(0, 1).toUpperCase()}
                            </Avatar>
                        </Box>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    subheader={moment(post.createDate).format('h:mm a, MMM Do')}
                />
                {/* <CardMedia
                        component="img"
                        height="294"
                        image="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
                        alt="Paella dish"
                    /> */}
                <CardContent sx={{ textAlign: 'left' }}>
                    {post.postContent.split('\n').map((row, i) =>
                        <Typography paragraph sx={{ lineHeight: 1 }} key={i}>
                            {row}
                        </Typography>
                    )}
                </CardContent>
                <CardActions disableSpacing>
                    <Tooltip title="Like">
                        <IconButton aria-label="add to favorites" onClick={handleLike}>
                            <FavoriteIcon />
                        </IconButton>
                    </Tooltip>
                    <Typography sx={{ mr: 2 }}>
                        {post.countOfLike == 0 ? '' : post.countOfLike}
                    </Typography>
                    <Tooltip title="Comment">
                        <IconButton aria-label="comment" onClick={handleComment}>
                            <CommentIcon />
                        </IconButton>
                    </Tooltip>
                    <Typography sx={{ mr: 2 }}>
                        {post.countOfComment == 0 ? '' : post.countOfComment}
                    </Typography>
                    <Tooltip title="Share">
                        <IconButton aria-label="share" onClick={handleShare}>
                            <ShareIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Box>
            <CommentDialog isOpen={dialogOpen} closeComment={closeComment} avatar={avatarLetter} post={post} />
        </MyCard>

    );
}
