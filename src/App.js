import React from "react";
import './App.css';
import Navigation from './Components/Navigation.component/Navigation.component';
import PageRoutes from './Components/PageRoutes/PageRoutes';
import NewPageRoutes from './Components/PageRoutes/NewPageRoutes';
import { ProfileContextProvider } from "./context/ProfileContext";
import TopBar from "./Components/TopBar.component/TopBar.component";
//import Geolocation from "./Geolocation";

function App() {
  return (
    <div className="App">
    <ProfileContextProvider>
      <Navigation />
      <NewPageRoutes />
    </ProfileContextProvider>
      
    </div>
  );
}

export default App;
