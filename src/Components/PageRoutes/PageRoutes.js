import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import Login from "../../Pages/Login.page/Login.page";
import Register from "../../Pages/Register.page/Register.page";
import Success from "../../Pages/Success.page/Success.page";
import UserHome from "../../Pages/UserHome.page/UserHome.page";
import ProfileMain from "../../Pages/Profile.page/Profile.Main.Page";
import News from "../../Pages/News.page/News.page"


import { AuthContext } from "../../context/AuthContext";

export default function PageRoutes() {
 // const [secretToken, setSecretToken] = useState();
 const { user } = useContext(AuthContext);
 console.log("user user ",user);
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={user ? <Navigate replace to="/success"/> : <Login />} />
      <Route path="/login" element={user ? <Navigate replace to="/success"/> : <Login />} />
      <Route path="/Register" element={user ? <Navigate replace to="/success" /> : <Register />} />
      <Route path="/success" element={user ? <Success /> : <Navigate replace to="/login" />} />
      <Route path="/userHome" element={user? <UserHome/> : <Navigate replace to="/login"/>} />
      <Route path="/profile/:param" element={user? <ProfileMain/> : <Navigate replace to="/login" />} />
      <Route path="/news" element={user? <News/> : <Navigate replace to="/news" />} />
   </Routes>
    </Router>
    
  );
}
