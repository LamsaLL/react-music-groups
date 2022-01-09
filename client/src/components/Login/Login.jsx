import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Form, Segment, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import base64 from "base-64";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // State for username and password
  const navigate = useNavigate();
  const [screen, setScreen] = useState("auth");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle username change
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Function to handle password change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const headers = new Headers();
    headers.set(
      "Authorization",
      "Basic " + base64.encode(username + ":" + password)
    );

    fetch("http://localhost:3001/login", { headers: headers })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("admin", JSON.stringify(data.screen));
        navigate("/");
      });
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              value={username}
              onChange={handleUsernameChange}
              iconPosition="left"
              placeholder="admin"
            />
            <Form.Input
              fluid
              icon="lock"
              value={password}
              onChange={handlePasswordChange}
              iconPosition="left"
              placeholder="ajax"
              type="password"
            />

            <Button color="teal" fluid size="large" onClick={handleSubmit}>
              Connexion
            </Button>
          </Segment>
        </Form>
        <NavLink to="/">Accueil</NavLink>
      </Grid.Column>
    </Grid>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
