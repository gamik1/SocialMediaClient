import React, { useState, useEffect,useContext } from "react";
import PostDetail from "../../Components/Posts.comonent/PostDetail.component";
import { Route, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { friendProfilesCall } from "../../API/apiCalls";
import { ProfileContext } from "../../context/ProfileContext";

export default function PostsDetail() {
  const { id } = useParams();
  const { user } = React.useContext(AuthContext);
  const {loadFriends} = useContext(ProfileContext);

  React.useEffect(() => {
    loadFriends(user.token);
  }, []);

  const trigger = ()=>{
    loadFriends(user.token);
  }
 

  return <PostDetail postId={id} trigger={trigger} />;
}
