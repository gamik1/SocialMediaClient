import { useContext } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navigation from "../Navigation.component/Navigation.component";
import TopBar from "../TopBar.component/TopBar.component";

export const NoAuthPages = () => {
  const { user } = useContext(AuthContext);
  const outlet = useOutlet();

//   if (user) {
//     return <Navigate to="/dashboard/profile" replace />;
//   }

  return (
    <div>
     {// <TopBar pages={[{page: "Login", path:"/login"},{page: "Register", path:"/register"}]}/>
  }
  {outlet}
    </div>
  );
};
