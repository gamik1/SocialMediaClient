import * as React from 'react';
import { red } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Card, CardActions, CardContent, CardHeader,
    IconButton,
    Paper,
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
import AvatarPopover from "./AvatarPopover.component";
import MoreActionPopover from "./MoreActionPopover.component";
import moment from 'moment'

export default function PostItem({ post, isMain, friends, askings, updateAskings, updateFriends }) {
    const { user, getUid } = React.useContext(AuthContext);
    const [profile, setProfile] = React.useState({});
    const [avatarPopoverAnchor, setAvatarPopoverAnchor] = React.useState(null);
    const [moreActionPopoverAnchor, setMoreActionPopoverAnchor] = React.useState(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const isSelf = post._user_Id === getUid() ? true : false;

    React.useEffect(() => {
        async function fetchData() {
            const got = await profleByIdCall(post._user_Id, user.token);
            // console.log(got);
            setProfile(got.userProfile);
        }
        fetchData();
    }, []);

    const cardSX = {
        '&:hover': {
            boxShadow: `0px 0px 0px 8px ${alpha('#777', 0.1)}`,
            backgroundColor: '#f9f9f9',
            cursor: 'pointer',
        }
    }
    const headerSX = {
        '.MuiBox-root': {
            display: 'flex',
            alignItems: 'center',
        },
        '.MuiCardHeader-content': {
            textAlign: 'left',
        }
    }

    const postDetail = (e) => {
        if (!isMain) {
            e.preventDefault();
            window.location.href = `/post/${post._id}`;
        }
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


    const openAvatarPopover = (e) => {
        e.stopPropagation();
        setAvatarPopoverAnchor(e.currentTarget);
    }
    const closeAvatarPopover = (e) => {
        e.stopPropagation();
        setAvatarPopoverAnchor(null);
    };

    const openMoreActionPopover = (e) => {
        e.stopPropagation();
        setMoreActionPopoverAnchor(e.currentTarget);
    };
    const closeMoreActionPopover = (e) => {
        e.stopPropagation();
        setMoreActionPopoverAnchor(null);
    };

    return (
        <Card sx={isMain ? {} : cardSX} >
            <Box onClick={postDetail}>
                <CardHeader sx={headerSX}
                    avatar={
                        <Box>
                            <Avatar
                                component={Paper}
                                elevation={2}
                                sx={{ bgcolor: red[500], width: 48, height: 48 }}
                                src={`${process.env.REACT_APP_API_URL}/image/profile/${profile.displayImage}`}
                                aria-label={profile.displayName}
                                onClick={openAvatarPopover}>
                            </Avatar>
                            <Typography sx={{ ml: 2 }}>{profile.displayName}</Typography>
                            <AvatarPopover
                                profile={profile}
                                anchorEl={avatarPopoverAnchor}
                                onClose={closeAvatarPopover}
                                isSelf={isSelf}
                                askings={askings}
                                friends={friends}
                                updateAskings={updateAskings}
                                updateFriends={updateFriends} />
                        </Box>
                    }
                    action={
                        <Box>
                            <IconButton id={'more_' + post._id} aria-label="more" onClick={openMoreActionPopover}>
                                <MoreVertIcon />
                            </IconButton>
                            <MoreActionPopover
                                post={post}
                                anchorEl={moreActionPopoverAnchor}
                                onClose={closeMoreActionPopover}
                                isSelf={isSelf}
                                askings={askings}
                                friends={friends}
                                updateAskings={updateAskings}
                                updateFriends={updateFriends} />
                        </Box>
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
                        {post.countOfLike === 0 ? '' : post.countOfLike}
                    </Typography>
                    <Tooltip title="Comment">
                        <IconButton aria-label="comment" onClick={handleComment}>
                            <CommentIcon />
                        </IconButton>
                    </Tooltip>
                    <Typography sx={{ mr: 2 }}>
                        {post.countOfComment === 0 ? '' : post.countOfComment}
                    </Typography>
                    <Tooltip title="Share">
                        <IconButton aria-label="share" onClick={handleShare}>
                            <ShareIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Box>
            <CommentDialog isOpen={dialogOpen} closeComment={closeComment} profile={profile} post={post} />
        </Card>

    );
}
