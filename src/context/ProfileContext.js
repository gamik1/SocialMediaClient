import {createContext,useState} from "react";
import { profileGet, profileUpdate } from "../API/apiCalls";


export const ProfileContext = createContext({});

export const ProfileContextProvider = ({ children }) => {
  const [profile,setProfile] = useState({});

  const updateProfile = async (profile,secret_token) => {
    const response = await profileUpdate(profile,secret_token);
    console.log(response.data);
    getProfile(secret_token);
  }

  const getProfile = async (secret_token) => {
    const got = await profileGet(secret_token);
    await setProfile(got.userProfile);
  }



  return (
    <ProfileContext.Provider
      value={{
        profile: profile,
        updateProfile,
        getProfile        
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
