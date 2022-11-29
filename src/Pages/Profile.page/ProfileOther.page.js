import React, { useState } from "react";

import { Route, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { friendProfilesCall, friendIdsCall } from "../../API/apiCalls";
import { profileGetOther } from "../../API/apiCalls";
import OtherProfile from "./OtherProfile.page";


export default function ProfileOther() {
  const { param } = useParams();
  console.log("param", param);
  const [profile, setProfile] = useState({});
  const { user } = React.useContext(AuthContext);
  const [ setFriendProfiles] = React.useState([]);
  const [askings, setAskings] = useState([]);
  const [friends, setFriends] = useState([]);

  const loadProfile = async () => {
    const response = await profileGetOther(param);
    setProfile(response.userProfile);
  };

  React.useEffect(() => {
    loadFriends();
    loadProfile();
  }, []);

  console.log(profile);
  const loadFriends = async () => {
    let response = await friendProfilesCall(user.token);
    if (response) {
      // console.log(response);
      setFriendProfiles(response.profiles);
    } else {
      console.log("some error occured");
    }
    response = await friendIdsCall(user.token);
    if (response.friend) {
      // console.log(response);
      await setAskings(() => {
        return response.friend.askings;
      });
      await setFriends(() => {
        return response.friend.friendIds;
      });
    }
  };

  const updateAskings = (newAskings) => {
    setAskings(newAskings);
    loadFriends();
  };

  const updateFriends = (newFriends) => {
    setFriends(newFriends);
    loadFriends();
  };

  return (
    <OtherProfile
      profile={profile}
      askings={askings}
      friends={friends}
      updateAskings={updateAskings}
      updateFriends={updateFriends}
    />
  );
}
