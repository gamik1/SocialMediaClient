import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { ProfileContext } from "../../context/ProfileContext";

export default function ProfilePictureUpload({ updateEdit, updatePP}) {
  const [file, setFile] = useState(null);
  const {getProfile} = useContext(ProfileContext);
  const { user } = useContext(AuthContext);
  const secret_token = user.token;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      axios
        .post(`${process.env.REACT_APP_API_URL}/user/upload-profile`, data, {
          headers: {
            Authorization: `Bearer ${secret_token}`,
          },
        })
        .then((response) => {
          updatePP(response.data.id);
        })
        .catch((error) => {
          console.log("error:occured:",error);
        });
    }
    await getProfile(user.token);
    updateEdit(false);
  };

  return (
    <Stack
      direction="column"
      spacing={1}
      justifyContent="center"
      alignItems="center"
    >
      {file && (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="profile pic"
            height="400"
            image={URL.createObjectURL(file)}
          />
        </Card>
      )}
      <form className="" onSubmit={submitHandler}>
        <label htmlFor="file">
          <Typography
            style={{ cursor: "pointer" }}
            sx={{ borderBottom: 1, fontWeight: "light", p: 1 }}
            variant="h6"
            component="span"
          >
            Upload Profile Picture
          </Typography>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            accept=".png,.jpeg,.jpg"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
        &nbsp;&nbsp;
        <Button variant="contained" className="shareButton" type="submit">
          Update
        </Button>
      </form>
    </Stack>
  );
}
