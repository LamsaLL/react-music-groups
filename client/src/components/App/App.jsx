import React, { Fragment } from "react";
import Login from "../Login/Login.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home/Home.jsx";

const App = () => {
  return (
    <div>
      <Router>
        <Fragment>
          <Routes>
            {/* If none of the previous routes render anything,
        this route acts as a fallback.

        Important: A route with path="/" will *always* match
        the URL because all URLs begin with a /. So that's
        why we put this one last of all */}
            <Route path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
};

export default App;
