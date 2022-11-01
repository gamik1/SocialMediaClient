import React, {useContext} from "react";
import Geolocation from "../../Components/Geolocation.componemt/Geolocation.component";
import jwt from "jwt-decode";
import { AuthContext } from "../../context/AuthContext";

export default function Success(){
    const {user} = useContext(AuthContext);

    const decoded = jwt(user.token);
    const {_id,email} = decoded.user;
    return (
        <div>
        <div>Login successful</div>
        <Geolocation />
        <h1>{_id}</h1>
        <h2>{email}</h2>
        </div>
        
    );
}