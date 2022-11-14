import React,{useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ProfileContext } from "../../context/ProfileContext";

export default function ProfileShow ({id}){

    const {profile,getProfile} = useContext(ProfileContext);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(()=>{getProfile(user.token);},[]);
    return (
        <div>
            <h1>profile</h1>
            <p>{JSON.stringify(profile)}</p>
            <button onClick={()=>{navigate("/profile/update")}}>Update Profile</button>
        </div>
    );
};