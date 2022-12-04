import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ProfileContext } from "../../context/ProfileContext";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import InfoBlock from "../../Components/infoBlock.component/InfoBlock.component";
import UserNameBlock from "../../Components/infoBlock.component/UserNameBlock.componemt";
import DateBlock from "../../Components/infoBlock.component/DateBlock.component";
import moment from "moment";
import ProfilePictureBlock from "../../Components/infoBlock.component/ProfilePictureBlock.component";

export default function ProfileShow({ id }) {
  const { profile, getProfile } = useContext(ProfileContext);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      await getProfile(user.token);
    })();
  }, []);

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <h1>profile</h1>
      <hr />
      <ProfilePictureBlock profileImage={profile.displayImage} update={true} />

      <hr />
      <Box px={{xs:1, sm:2, md:5, lg:10, xl:12}} >
        <Stack spacing={2}>
          <Stack spacing={1} justifyContent="flex-start" alignItems="center">
            <UserNameBlock
              dataFN={profile.firstName ? profile.firstName : "Not Set"}
              dataLN={profile.lastName ? profile.lastName : "Not Set"}
              infoTitleFN="firstName"
              infoTitleLN="lastName"
            />
          </Stack>
          <hr/>
          <Stack
            direction={"row"}
            spacing={1}
            justifyContent="flex-start"
            alignItems="center"
          >
            <InfoBlock
              title="Bio :"
              infoTitle="bio"
              data={profile.bio ? profile.bio : "Not Set"}
            />
          </Stack>

          <Stack
            direction={"row"}
            spacing={1}
            justifyContent="flex-start"
            alignItems="center"
          >
            <DateBlock
              title="D.O.B. :"
              infoTitle="dob"
              data={
                profile.dob ? `${moment(profile.dob).format("LL")}` : ""
              }
            />
          </Stack>

          <Stack
            direction={"row"}
            spacing={1}
            justifyContent="flex-start"
            alignItems="center"
          >
            <InfoBlock
              title="Works As :"
              infoTitle="profession"
              data={profile.profession ? profile.profession : "Not Set"}
            />
          </Stack>

          <Stack
            direction={"row"}
            spacing={1}
            justifyContent="flex-start"
            alignItems="center"
          >
            <InfoBlock
              title="Hobby :"
              infoTitle="hobby"
              data={profile.hobby ? profile.hobby : "Not Set"}
            />
          </Stack>
        </Stack>
      </Box>
      <hr />
    </Box>
  );
}
