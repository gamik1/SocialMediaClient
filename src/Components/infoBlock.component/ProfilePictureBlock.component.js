import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import PhotoCameraBackOutlinedIcon from "@mui/icons-material/PhotoCameraBackOutlined";
import { useContext, useState, useEffect } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import ProfilePictureUpload from "./ProfilePictureUpload.component";
import { AuthContext } from "../../context/AuthContext";

export default function ProfilePictureBlock({profileImage}) {
  const [edit, setEdit] = useState(false);
  const [pp,setPP] = useState(profileImage);
  const { user } = useContext(AuthContext);
  const updateEdit = (edit) => {
    setEdit(edit);
  };

  useEffect(()=>{setPP(profileImage)},[profileImage])
  return (
    <Stack
      direction="column"
      spacing={1}
      justifyContent="center"
      alignItems="center"
    >
      {edit ? (
        <ProfilePictureUpload updateEdit={updateEdit} />
      ) : (
        <Stack direction="column" spacing={1}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="profile pic"
              height={{xs:200,sm:220,md:350,lg:400,xl:400}}
              image={`http://localhost:8800/images/${pp}`}
            />
          </Card>
          <Button
            variant="outlined"
            endIcon={<PhotoCameraBackOutlinedIcon />}
            onClick={() => {
              setEdit(true);
            }}
          >
            Update Image
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
