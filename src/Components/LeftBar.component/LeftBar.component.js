import * as React from 'react';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpIcon from '@mui/icons-material/Help';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { eventCountCall } from "../../API/apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { ProfileContext } from '../../context/ProfileContext';



export default function LeftBar({ showEvent }) {
  const { user } = React.useContext(AuthContext);
  const {evtCount, loadEventCount} = React.useContext(ProfileContext);

  React.useEffect(()=>{
    loadEventCount(user.token);
  },[]);

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', mt: 2, ml: 2 }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/user/home">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <RssFeedIcon />
              </ListItemIcon>
              <ListItemText primary="Feed" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton component="a" href="/user/userlist">
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary="Search Friends" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
          <ListItemButton component="a" href="/donate">
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Donate" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BookmarkIcon />
              </ListItemIcon>
              <ListItemText primary="Bookmarks" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Questions" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
          <ListItemButton component="a" href="/jobs">
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="JObs" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton component="a" href="/user/events">
              <ListItemIcon>
                <Badge badgeContent={evtCount} color="secondary">
                  <EventIcon color={evtCount > 0 ? "primary" : ''} />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton component="a" href="/user/news">
              <ListItemIcon>
                <NewspaperIcon />
              </ListItemIcon>
              <ListItemText primary="News" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}