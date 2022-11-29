import React from "react";
import './App.css';
import Navigation from './Components/Navigation.component/Navigation.component';
import PageRoutes from './Components/PageRoutes/PageRoutes';
import NewPageRoutes from './Components/PageRoutes/NewPageRoutes';
//import Geolocation from "./Geolocation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <NewPageRoutes />
    </div>
  );
}

export default App;
