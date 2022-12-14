import { createContext, useEffect, useReducer, useState } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  console.log(state);
  const [uid, setUid] = useState(null);
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])

  const getUid = () => {
    return uid;
  }
  const initUid = async (id) => {
    await setUid(id);
  }
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        initUid,
        getUid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
