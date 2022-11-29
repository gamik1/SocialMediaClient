import * as React from "react";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { red } from "@mui/material/colors";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import { minHeight } from "@mui/system";

export default function UserCard({ displayName, displayImage, uid }) {
  const cardSX = {
    "&:hover": {
      boxShadow: `0px 0px 0px 8px ${alpha("#777", 0.1)}`,
      backgroundColor: "#f9f9f9",
      cursor: "pointer",
    },
  };
  const headerSX = {
    ".MuiBox-root": {
      display: "flex",
      alignItems: "center",
    },
    ".MuiCardHeader-content": {
      textAlign: "left",
    },
  };

  return (
    <Card sx={cardSX}>
      <Box
        onClick={() => (window.location.href = `/user/others/profile/${uid}`)}
      >
        <CardHeader
          sx={headerSX}
          avatar={
            <Avatar
              component={Paper}
              elevation={2}
              sx={{ bgcolor: red[500], width: 48, height: 48 }}
              src={`${process.env.REACT_APP_API_URL}/image/profile/${displayImage}`}
              aria-hidden="true"
              alt={`profile pic - ${displayName}`}
              //   onClick={openAvatarPopover}
            >
              R
            </Avatar>
          }
          action={
            <Stack flexDirection="row" alignItems="center">
              {
                //     <IconButton href={`/user/others/profile/${uid}`} aria-label="View Profile">
                //   <AccountBoxOutlinedIcon />
                // </IconButton>
                // <IconButton aria-label="Add Friend">
                // <PersonAddAlt1Icon />
                //</IconButton>
              }
            </Stack>
          }
          title={displayName}
        />
      </Box>
    </Card>
  );
}
