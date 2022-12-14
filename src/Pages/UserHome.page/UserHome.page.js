import React, { useState } from "react";
import Posts from "../../Components/Posts.comonent/Posts.component";
import { AuthContext } from "../../context/AuthContext";
import { friendProfilesCall } from "../../API/apiCalls";
import { ProfileContext } from "../../context/ProfileContext";


export default function Index() {
    const { user } = React.useContext(AuthContext);
    const { loadFriends } = React.useContext(ProfileContext);
    // const [ setFriendProfiles] = React.useState([]);

    // React.useEffect(() => {
    //     loadFriends();
    // },[]);

    const trigger = ()=>{
        loadFriends(user.token);
    }
    
    return (
        
                        <Posts trigger={trigger} />
                
    );
}