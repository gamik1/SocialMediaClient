import axios from "axios";

const API_URL = "http://localhost:8800";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    
    const res = await axios.post(`${API_URL}/login`, userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    console.log("res.data",res.data);
    console.log("data token",res.data.token);
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


