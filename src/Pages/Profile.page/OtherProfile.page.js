import React from 'react'
import Box from "@mui/material/Box";
import { red, blue } from '@mui/material/colors';
import Stack from "@mui/material/Stack";
import { Typography, Button } from "@mui/material";
import ViewInfo from "../../Components/infoBlock.component/ViewInfo.component";
import moment from "moment";
import ProfilePictureBlock from "../../Components/infoBlock.component/ProfilePictureBlock.component";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemove from "@mui/icons-material/PersonRemove";
import { friendAddCall, friendRemoveCall } from "../../API/apiCalls";
import TransitionAlert from "../../Components/Posts.comonent/TransitionAlert.component";
import { AuthContext } from "../../context/AuthContext";

export default function OtherProfile({ profile, askings, friends, updateAskings, updateFriends }) {
  const { user } = React.useContext(AuthContext);
  const [alertMsg, setAlertMsg] = React.useState(null);
  const isAsking = askings.includes(profile._user_Id);
  const isFriend = friends.includes(profile._user_Id);

  const handleAddFriend = async (e) => {
    const got = await friendAddCall(profile._user_Id, user.token);
    // console.log(got);
    askings.push(profile._user_Id);
    updateAskings(askings);
    got.friend.error
      ? setAlertMsg(got.friend.error)
      : setAlertMsg('Adding friend request has been sent');
  }

  const handleRemoveFriend = async (e) => {
    const got = await friendRemoveCall(profile._user_Id, user.token);
    // console.log(got);
    friends = friends.filter((v) => {
      return v !== profile._user_Id;
    });
    updateFriends(friends);
    setAlertMsg('Your friend has been removed');
  }

  const closeAlert = (e) => {
    e.stopPropagation();
    setAlertMsg(null);
  }

  function FriendActions() {
    if (isAsking) {
      return <Typography sx={{ fontSize: 14 }} color={blue[500]} gutterBottom>
        You've sent friend request
      </Typography>
    } else if (isFriend) {
      return <Button sx={{ color: red[500] }} variant="outlined" onClick={handleRemoveFriend} endIcon={<PersonRemove />}>
        Remove Friend
      </Button>
    }
    return (
      <Button variant="outlined" endIcon={<PersonAddAlt1Icon />} onClick={handleAddFriend}>
        Send friend request
      </Button>
    )
  }

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <h1>profile</h1>
      <hr />
      <ProfilePictureBlock profileImage={profile.displayImage} update={false} />

      <hr />
      <Box px={{ xs: 1, sm: 2, md: 5, lg: 10, xl: 12 }}>
        <Stack spacing={2}>
          <Stack spacing={1} justifyContent="flex-start" alignItems="center">
            <ViewInfo
              data={`${profile.firstName === "Not Set" &&
                profile.lastName === "Not Set"
                ? ""
                : profile.firstName
                } ${profile.lastName === "Not Set" ? "" : profile.lastName}`}
              variant="h4"
            />
            <FriendActions />
          </Stack>
          <hr />
          <Stack
            direction={"row"}
            spacing={1}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {`Bio:`}{" "}
            </Typography>
            <ViewInfo
              data={`${profile.bio ? profile.bio : "Not Set"}`}
              variant="h6"
            />
          </Stack>

          <Stack
            direction={"row"}
            spacing={1}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {`D.O.B.:`}{" "}
            </Typography>
            <ViewInfo
              data={`${profile.dob ? moment(profile.dob).format("LL") : "Not Set"
                }`}
              variant="h6"
            />
          </Stack>

          <Stack
            direction={"row"}
            spacing={1}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {`Works As:`}{" "}
            </Typography>
            <ViewInfo
              data={profile.profession ? profile.profession : "Not Set"}
              variant="h6"
            />
          </Stack>

          <Stack
            direction={"row"}
            spacing={1}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {`Hobby:`}{" "}
            </Typography>
            <ViewInfo
              data={profile.hobby ? profile.hobby : "Not Set"}
              variant="h6"
            />
          </Stack>
        </Stack>
      </Box>
      <hr />
      <TransitionAlert msg={alertMsg} closeAlert={closeAlert} />
    </Box>
  );
}
