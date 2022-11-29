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
import Events from "../../Pages/Events.page/Events.page";
import PosstDetail from "../../Pages/PostDetail.page/PostDetail.page";
import ProfileOther from "../../Pages/Profile.page/ProfileOther.page";

import { AuthContext } from "../../context/AuthContext";
import UsersList from "../../Pages/UsersList.page/UsersList.page";
import ProfileShow from "../../Pages/Profile.page/Profile.Show.Page";
import { NoAuthPages } from "../RouteOutlets.component/NoAuth.component";
import YesAuthPages from "../RouteOutlets.component/YesAuth.component";
import OtherProfile from "../../Pages/Profile.page/OtherProfile.page";

export default function PageRoutes() {
  // const [secretToken, setSecretToken] = useState();
  const { user } = useContext(AuthContext);
  console.log("user user ", user);
  return (
    <Router>
      <Routes>
        <Route
          element={
            user ? <Navigate replace to="/user/home" /> : <NoAuthPages />
          }
        >
          <Route exact path="/" element={<Success />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Route>
        <Route
          path="/user"
          element={!user ? <Navigate replace to="/" /> : <YesAuthPages />}
        >
          <Route path="home" element={<UserHome />} />
          <Route path="profile" element={<ProfileShow />} />
          <Route path="others/profile/:param" element={<ProfileOther />} />
          <Route path="news" element={<News />} />
          <Route path="userlist" element={<UsersList />} />
          <Route path="post/:id" element={<PosstDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}
