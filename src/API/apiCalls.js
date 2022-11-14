import axios from "axios";

const API_URL = "http://localhost:8800";
// const API_URL = process.env.API_URL;

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
  console.log({...profile,secret_token: secret_token})
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

export const postListCall = async (secret_token) => {

  console.log(secret_token);
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