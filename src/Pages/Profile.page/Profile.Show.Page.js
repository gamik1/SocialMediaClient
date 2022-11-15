import React,{useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ProfileContext } from "../../context/ProfileContext";
import ProfilePictureUpload from "./ProfilePictureUpload.Page";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ProfileShow ({id}){
    const [uploadFile,setUploadFile] = useState(null);
    const {profile,getProfile} = useContext(ProfileContext);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    
    const uploadedFile = (file)=>{
        setUploadFile(file);
    }

    useEffect(()=>{getProfile(user.token);},[]);
    console.log(uploadFile);
    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            <h1>profile</h1>
            <div>
            {uploadFile && <img alt="uploaded" src={URL.createObjectURL(uploadFile)} className="uploadImg"/>}
            <ProfilePictureUpload uploadedFile={uploadedFile} />
            </div>
            <hr/>
            <img className="uploadImg" src={`http://localhost:8800/images/${profile.displayImage}`} alt="" />
            <hr/>
            <stack spacing={2}>
            <Typography variant="h5">
                {`${profile.firstName} ${profile.lastName}`}
            </Typography>
            <Typography variant="h6">
                {`${profile.bio ? profile.bio : ""}`}
            </Typography>
            <Typography variant="h6">
                {`DOB: ${profile.dob}`}
            </Typography>
            <Typography variant="h6">
                {`I work as ${profile.profession ? profile.profession : "NOT SET"}.`}
            </Typography>
            <Typography variant="h6">
                {`I like ${profile.hobby ? profile.hobby : "NOT SET"}.`}
            </Typography>
            </stack>
            <hr/>
            <button onClick={()=>{navigate("/profile/update")}}>Update Profile</button>
        </Box>
    );
};