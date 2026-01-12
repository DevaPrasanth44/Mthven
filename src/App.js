import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Login from "./components/LoginDummy";
import Dashboard from "./components/DashBoard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/LoginDummy" element={<Login />} />
        <Route path="/Dashboard" element = {< Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
