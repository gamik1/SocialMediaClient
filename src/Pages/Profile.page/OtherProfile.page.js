import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import ViewInfo from "../../Components/infoBlock.component/ViewInfo.component";
import moment from "moment";
import ProfilePictureBlock from "../../Components/infoBlock.component/ProfilePictureBlock.component";


export default function OtherProfile({profile}) {
  

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <h1>profile</h1>
      <hr />
      <ProfilePictureBlock profileImage={profile.displayImage} />

      <hr />
      <Box px={{ xs: 1, sm: 2, md: 5, lg: 10, xl: 12 }}>
        <Stack spacing={2}>
          <Stack spacing={1} justifyContent="flex-start" alignItems="center">
            <ViewInfo
              data={`${
                profile.firstName === "Not Set" &&
                profile.lastName === "Not Set"
                  ? ""
                  : profile.firstName
              } ${profile.lastName === "Not Set" ? "" : profile.lastName}`}
              variant="h4"
            />
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
              data={`${
                profile.dob ? moment(profile.dob).format("LL") : "Not Set"
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
    </Box>
  );
}
