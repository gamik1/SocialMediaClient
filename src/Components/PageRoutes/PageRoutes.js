import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../../Pages/Login.page/Login.page";
import Register from "../../Pages/Register.page/Register.page";
import Success from "../../Pages/Success.page/Success.page";
import UserHome from "../../Pages/UserHome.page/UserHome.page";
import ProfileMain from "../../Pages/Profile.page/Profile.Main.Page";
import News from "../../Pages/News.page/News.page";

import PostDetail from "../../Pages/PostDetail.page/PostDetail.page";
import DonateApp from "../../Pages/Donation.page/DonateApp";
import Jobs from "../../Pages/Jobs.page/Jobs.page";

import Events from "../../Pages/Events.page/Events.page";

import ProfileOther from "../../Pages/Profile.page/ProfileOther.page";
import { AuthContext } from "../../context/AuthContext";
import UsersList from "../../Pages/UsersList.page/UsersList.page";

export default function PageRoutes() {
  // const [secretToken, setSecretToken] = useState();
  const { user } = useContext(AuthContext);
  console.log("user user ", user);
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Navigate replace to="/userHome" /> : <Success />}
        />
        <Route
          path="/login"
          element={user ? <Navigate replace to="/userHome" /> : <Login />}
        />
        <Route
          path="/Register"
          element={user ? <Navigate replace to="/userHome" /> : <Register />}
        />
        <Route path="/success" element={<Success />} />
        <Route
          path="/userHome"
          element={user ? <UserHome /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/events"
          element={user ? <Events /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/profile/:param"
          element={user ? <ProfileMain /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/others/profile/:param"
          element={user ? <ProfileOther/> : <Navigate replace to="/login" />}
        />
        <Route
          path="/news"
          element={user ? <News /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/allusers"
          element={user ? <UsersList /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/jobs"
          element={user ? <Jobs /> : <Navigate replace to="/jobs" />}
        />
         <Route
          path="/donate"
          element={user ? <DonateApp /> : <Navigate replace to="/donate" />}
        />
        <Route 
          path="/post/:id" 
          element={user? <PostDetail/> : <Navigate replace to="/login" />} 
        />
       
      </Routes>
    </Router>
  );
}
