import { useContext } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navigation from "../Navigation.component/Navigation.component";

export const NoAuthPages = () => {
  const { user } = useContext(AuthContext);
  const outlet = useOutlet();

//   if (user) {
//     return <Navigate to="/dashboard/profile" replace />;
//   }

  return (
    <div>
  
      {outlet}
    </div>
  );
};
