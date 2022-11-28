import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL;

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    
    const res = await axios.post(`${API_URL}/login`, userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const logoutCall = async (dispatch) => {
  dispatch({ type: "LOGOUT" });
};

export const registerCall = async (userCredential) => {

    return await axios
      .post(`${API_URL}/signup`, userCredential)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
       console.log(error.response.data);
      });
  
};

export const profileUpdate = async (profile,secret_token) => {
  console.log({...profile})
  return await axios
    .post(`${API_URL}/user/profile`,profile,{
      headers: {
      Authorization: `Bearer ${secret_token}`,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error)=>{
      console.log(error.response.data);
    })

}

export const profileGet = async (secret_token) => {

  console.log(secret_token);
  return await axios
    .get(`${API_URL}/user/profile`,{
      headers: {
      Authorization: `Bearer ${secret_token}`,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error)=>{
      console.log(error.response.data);
    })

}

export const profileGetOther = async (_user_Id) => {

  return await axios
    .post(`${API_URL}/others/profile`,{_id: _user_Id})
    .then((response) => {
      return response.data;
    })
    .catch((error)=>{
      console.log(error.response.data);
    })

}

export const postAddCall = async (post, secret_token) => {
  console.log({...post, secret_token: secret_token})
  return await axios
    .post(`${API_URL}/user/post/add`, post, {
      headers: {
        Authorization: `Bearer ${secret_token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error)=>{
      console.log(error.response.data);
    })

}


export const postByIdCall = async (id, secret_token) => {
  return await axios
    .get(`${API_URL}/user/post/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${secret_token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error)=>{
      console.log(error.response.data);
    })

}


export const postListCall = async (secret_token) => {
  return await axios
    .get(`${API_URL}/user/post/list`,{
      headers: {
        Authorization: `Bearer ${secret_token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error)=>{
      console.log(error.response.data);
    })
}


export const commentAddCall = async (post, secret_token) => {
  // console.log({...post, secret_token: secret_token})
  return await axios
    .post(`${API_URL}/user/comment/add`, post, {
      headers: {
        Authorization: `Bearer ${secret_token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error)=>{
      console.log(error.response.data);
    })

}


export const commentListCall = async (topicPostId, secret_token) => {
  return await axios
    .get(`${API_URL}/user/post/comments/${topicPostId}`,{
      headers: {
        Authorization: `Bearer ${secret_token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error)=>{
      console.log(error.response.data);
    })

}

export const profleByIdCall = async (uid, secret_token) => {
  // console.log(secret_token);
  return await axios
    .get(`${API_URL}/user/profile/${uid}`,{
      headers: {
        Authorization: `Bearer ${secret_token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error)=>{
      console.log(error.response.data);
    })

}

export const friendIdsCall = async (secret_token) => {
  return await axios
    .get(`${API_URL}/user/friend/ids`,{
      headers: {
        Authorization: `Bearer ${secret_token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error)=>{
      console.log(error.response.data);
    })
}

export const friendProfilesCall = async (secret_token) => {
  return await axios
    .get(`${API_URL}/user/friend/profiles`,{
      headers: {
        Authorization: `Bearer ${secret_token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error)=>{
      console.log(error.response.data);
    })
}

export const friendAddCall = async (uid, secret_token) => {
  return await axios
    .post(`${API_URL}/user/friend/add`, {'fid': uid}, {
      headers: {
        Authorization: `Bearer ${secret_token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error)=>{
      console.log(error.response.data);
    })
}

export const friendRemoveCall = async (uid, secret_token) => {
  return await axios
    .post(`${API_URL}/user/friend/remove`, {'fid': uid}, {
      headers: {
        Authorization: `Bearer ${secret_token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error)=>{
      console.log(error.response.data);
    })
}

export const friendEventCall = async (eventId, operation, secret_token) => {
  return await axios
    .post(`${API_URL}/user/event/friend`, {'eventId': eventId, 'operation': operation}, {
      headers: {
        Authorization: `Bearer ${secret_token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error)=>{
      console.log(error.response.data);
    })
}

export const friendCloseCall = async (eventId, secret_token) => {
  return await axios
    .post(`${API_URL}/user/event/close`, {'eventId': eventId}, {
      headers: {
        Authorization: `Bearer ${secret_token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error)=>{
      console.log(error.response.data);
    })
}

export const eventCountCall = async (secret_token) => {
  return await axios
    .get(`${API_URL}/user/event/count`,{
      headers: {
        Authorization: `Bearer ${secret_token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error)=>{
      console.log(error.response.data);
    })
}

export const eventListCall = async (secret_token) => {
  return await axios
    .get(`${API_URL}/user/event/list`,{
      headers: {
        Authorization: `Bearer ${secret_token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error)=>{
      console.log(error.response.data);
    })
}


export const userListCall = async (secret_token) => {
  return await axios
    .get(`${API_URL}/user/allUsers`,{
      headers: {
        Authorization: `Bearer ${secret_token}`,
      },
    })
    .then((response) => {
      return response.data.users;
    })
    .catch((error)=>{
      console.log(error.response.data);
    })
}