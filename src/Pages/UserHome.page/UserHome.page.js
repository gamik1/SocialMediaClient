import React, { useState } from "react";
import Posts from "../../Components/Posts.comonent/Posts.component";
import { AuthContext } from "../../context/AuthContext";
import { friendProfilesCall } from "../../API/apiCalls";


export default function Index() {
    const { user } = React.useContext(AuthContext);
    const [ setFriendProfiles] = React.useState([]);

    React.useEffect(() => {
        loadFriends();
    },[]);

    const loadFriends = async () => {
        let response = await friendProfilesCall(user.token);
        if (response) {
            // console.log(response);
            setFriendProfiles(response.profiles);
        } else {
            console.log("some error occured");
        }
    }
    
    return (
        
                        <Posts trigger={loadFriends}/>
                
    );
}