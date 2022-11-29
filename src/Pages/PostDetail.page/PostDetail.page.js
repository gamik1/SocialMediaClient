import React, { useState, useEffect } from "react";
import PostDetail from "../../Components/Posts.comonent/PostDetail.component";
import { Route, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { friendProfilesCall } from "../../API/apiCalls";

export default function PostsDetail() {
  const { id } = useParams();
  const { user } = React.useContext(AuthContext);
  const [setFriendProfiles] = React.useState([]);

  React.useEffect(() => {
    loadFriends();
  }, []);

  const loadFriends = async () => {
    let response = await friendProfilesCall(user.token);
    if (response) {
      // console.log(response);
      setFriendProfiles(response.profiles);
    } else {
      console.log("some error occured");
    }
  };

  return <PostDetail postId={id} trigger={loadFriends} />;
}
