import * as React from "react";
import { red } from "@mui/material/colors";
import {
  Avatar,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";

export default function RightBar({ itemData }) {
  function Friends() {
    if (itemData && itemData.length > 0) {
      return (
        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {itemData.map((item) => {
            return (
              <ListItem component="a" href={`/user/others/profile/${item._user_Id}`} key={item._id} disablePadding>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      elevation={2}
                      sx={{ width: 56, height: 56 }}
                      alt={`Friend ${item.displayName}`}
                      src={`${process.env.REACT_APP_API_URL}/image/profile/${item.displayImage}`}
                    />
                  </ListItemAvatar>
                    <ListItemText
                      sx={{color:'black'}}
                      id={`Friend ${item.displayName}`}
                      primary={<Typography sx={{fontWeight:"bold", ml:2}}>{item.displayName}</Typography>}
                    />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      );
    }
    return "You have no friends";
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" sx={{ mt: 2,fontWeight:"bold" }}>
        Friends
      </Typography>
      <Friends />
    </Box>
  );
}
