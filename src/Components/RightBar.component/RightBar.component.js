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
import Link from "@mui/material/Link";

export default function RightBar({ itemData }) {
  function Friends() {
    if (itemData && itemData.length > 0) {
      return (
        <ImageList cols={2} sx={{ mr: 2 }}>
          {itemData.map((item) => (
            <ImageListItem key={item._id} sx={{ mr: 3 }}>
            {console.log("user friend",item._user_Id)}
              <Avatar
                component={Paper}
                elevation={8}
                sx={{
                  bgcolor: red[500],
                  width: 96,
                  height: 96,
                  ml: 2,
                  borderRadius: 1,
                }}
                src={`${process.env.REACT_APP_API_URL}/image/profile/${item.displayImage}`}
                aria-label=""
              />
              <Link href={`/user/others/profile/${item._user_Id}`}>
                <ImageListItemBar title={item.displayName} position="below" />
              </Link>
            </ImageListItem>
          ))}
        </ImageList>
      );
    }
    return "You have no friends";
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" sx={{ mt: 2 }}>
        User Friends
      </Typography>
      <Friends />
    </Box>
  );
}
