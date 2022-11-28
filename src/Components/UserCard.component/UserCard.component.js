import * as React from 'react';
import { styled } from '@mui/material/styles';

import {
    Avatar,
    Box,
    Card, CardActions, CardContent, CardHeader,
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Typography
} from '@mui/material';


import { red } from '@mui/material/colors';

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { minHeight } from '@mui/system';

export default function UserCard({displayName, displayImage, uid}) {


  return (
    <Card sx={{ width: "100vw" , mx: "auto"}}>
      <CardHeader
        avatar={
          <Avatar component={Paper}
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
        action={<Stack flexDirection="row" alignItems="center">
            <IconButton href={`/others/profile/${uid}`} aria-label="View Profile">
            <AccountBoxOutlinedIcon />
          </IconButton>
          <IconButton aria-label="Add Friend">
            <PersonAddAlt1Icon />
          </IconButton>
            </Stack>
          
        }
        title={displayName}
      />
     
    </Card>
  );
}