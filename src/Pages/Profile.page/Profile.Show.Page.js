import React,{useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ProfileContext } from "../../context/ProfileContext";
import ProfilePictureUpload from "./ProfilePictureUpload.Page";

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
        <div>
            <h1>profile</h1>
            <div>
            {uploadFile && <img alt="uploaded" src={URL.createObjectURL(uploadFile)} className="uploadImg"/>}
            <ProfilePictureUpload uploadedFile={uploadedFile} />
            </div>
            <p>{JSON.stringify(profile)}</p>
            <img className="uploadImg" src={`http://localhost:8800/images/${profile.displayImage}`} alt="" />
            <button onClick={()=>{navigate("/profile/update")}}>Update Profile</button>
        </div>
    );
};