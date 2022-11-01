import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpIcon from '@mui/icons-material/Help';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';

export default function LeftBar() {
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', mt:2, ml:2 }}>
      <nav aria-label="main mailbox folders">
        <List>
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
            <ListItemButton>
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary="Chats" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Groups" />
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
            <ListItemButton>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="Jobs" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}