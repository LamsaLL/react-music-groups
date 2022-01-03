import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Grid, GridColumn, Form, Segment, Button } from "semantic-ui-react";
import PropTypes from "prop-types";

const Login = ({ setToken }) => {
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
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setToken(data.token);
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
              placeholder="Identifiant"
            />
            <Form.Input
              fluid
              icon="lock"
              value={password}
              onChange={handlePasswordChange}
              iconPosition="left"
              placeholder="Mot de passe"
              type="password"
            />

            <Button
              color="teal"
              fluid
              size="large"
              onClick={() => handleSubmit}
            >
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
