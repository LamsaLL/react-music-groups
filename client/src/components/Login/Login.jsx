import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  //State for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Function to handle username change
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  //Function to handle password change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  //Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username: " + username);
    console.log("Password: " + password);
  };

  return (
    <div className="Login">
      <h1>Authentification</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Identifiant:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Mot de passe:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <NavLink to="/">Accueil</NavLink>
    </div>
  );
};

export default Login;
