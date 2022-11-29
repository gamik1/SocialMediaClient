import {createContext,useState} from "react";
import { profileGet, profileUpdate } from "../API/apiCalls";
import { friendProfilesCall, eventCountCall} from "../API/apiCalls";

export const ProfileContext = createContext({});

export const ProfileContextProvider = ({ children }) => {
  const [profile,setProfile] = useState({});
  const [friendProfiles, setFriendProfiles] = useState([]);
  const [evtCount, setEvtCount] = useState(0);

  

  const loadEventCount = async (secret_token) => {
    let response = await eventCountCall(secret_token);
    if (response) {
      // console.log(response);
      await setEvtCount(() => {
        return response.count;
      });

    } else {
      console.log("some error occured");
    }
  }



  const updateProfile = async (profile,secret_token) => {
    const response = await profileUpdate(profile,secret_token);
    console.log(response.data);
    getProfile(secret_token);
  }

  
  const getProfile = async (secret_token) => {
    const got = await profileGet(secret_token);
    await setProfile(got.userProfile);
  }

  const loadFriends = async (secret_token) => {
    console.log("token in fr",secret_token);
    let response = await friendProfilesCall(secret_token);
    if (response) {
      // console.log(response);
      await setFriendProfiles(response.profiles);
    } else {
      console.log("some error occured");
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile: profile,
        updateProfile,
        getProfile,
        friendProfiles: friendProfiles,
        loadFriends,
        evtCount: evtCount,
        loadEventCount     
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
