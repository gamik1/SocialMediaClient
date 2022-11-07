import React,{useContext} from "react";
import { ProfileContext } from "../../context/ProfileContext";

export default function ProfileShow (){

    const {profile} = useContext(ProfileContext);

    return (
        <div>
            <h1>profile</h1>
            <p>{JSON.stringify(profile)}</p>
        </div>
    );
};