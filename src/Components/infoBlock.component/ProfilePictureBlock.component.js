import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import PhotoCameraBackOutlinedIcon from "@mui/icons-material/PhotoCameraBackOutlined";
import { useContext, useState, useEffect } from "react";
import ProfilePictureUpload from "./ProfilePictureUpload.component";
import { AuthContext } from "../../context/AuthContext";

export default function ProfilePictureBlock({profileImage, update}) {
  const [edit, setEdit] = useState(false);
  const [pp,setPP] = useState(profileImage);
  const updateEdit = (edit) => {
    setEdit(edit);
  };

  const updatePP = (id)=>{
    setPP(id.toString());
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
        <ProfilePictureUpload updateEdit={updateEdit} updatePP={updatePP} />
      ) : (
        <Stack direction="column" spacing={1}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="profile pic"
              height={{xs:200,sm:220,md:350,lg:400,xl:400}}
              image={`${process.env.REACT_APP_API_URL}/image/profile/${pp}`}
            />
          </Card>
          {update && 
          <Button
            variant="outlined"
            endIcon={<PhotoCameraBackOutlinedIcon />}
            onClick={() => {
              setEdit(true);
            }}
          >
            Update Image
          </Button>
          }
        </Stack>
      )}
    </Stack>
  );
}
