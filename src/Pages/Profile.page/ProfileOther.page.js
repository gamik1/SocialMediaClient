import React, { useContext, useState } from "react";
import jwt from "jwt-decode";
import { Navigate, Route, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { friendProfilesCall, friendIdsCall } from "../../API/apiCalls";
import { profileGetOther } from "../../API/apiCalls";
import OtherProfile from "./OtherProfile.page";
import { ProfileContext } from "../../context/ProfileContext";


export default function ProfileOther() {
  const { param } = useParams();
  console.log("param", param , );
  const { user } = React.useContext(AuthContext);
  const decoded = jwt(user.token);
  const id = decoded.user._id;
  console.log("param", param , id);
  const navigate = useNavigate();
  if(id === param){
    navigate("/user/profile");
  }
  const [profile, setProfile] = useState({});
  const {loadFriends} = useContext(ProfileContext);
  const [askings, setAskings] = useState([]);
  const [friends, setFriends] = useState([]);

  const loadProfile = async () => {
    const response = await profileGetOther(param);
    setProfile(response.userProfile);
  };

  React.useEffect(() => {
    loadFriendsHere();
    loadProfile();

  }, []);

  console.log(profile);
  const loadFriendsHere = async () => {
    await loadFriends(user.token);
    let response = await friendIdsCall(user.token);
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

  const updateAskings = async (newAskings) => {
    await setAskings(newAskings);
    await loadFriendsHere();
  };

  const updateFriends = async (newFriends) => {
    await setFriends(newFriends);
    await loadFriendsHere();
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
