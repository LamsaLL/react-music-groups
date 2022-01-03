import React, { Fragment, useState } from "react";
import Login from "../Login/Login.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home/Home.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
