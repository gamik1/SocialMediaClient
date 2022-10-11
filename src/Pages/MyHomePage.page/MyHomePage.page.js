import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Login.page/Login.page";
import Register from "../Register.page/Register.page";
import Success from "../Success.page/Success.page";

export default function MyHomePage() {
  const [secretToken, setSecretToken] = useState();
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<Login setToken={setSecretToken} />} />
      <Route path="/login" element={<Login setToken={setSecretToken} />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/success" element={<Success />} />
    </Routes>
    </Router>
    
  );
}
