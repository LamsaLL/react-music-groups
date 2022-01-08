// This component renders the home page.
import React, { Component } from "react";
import { Route, Redirect, NavLink } from "react-router-dom";
import MusicTab from "../MusicTab/MusicTab.jsx";
import { Container, Link, Button } from "semantic-ui-react";

const Home = () => {
  const handleLogoutClick = () => {
    localStorage.removeItem("admin");

    fetch("http://localhost:3001/logout", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    window.location.reload();
  };

  return (
    <Container>
      <NavLink to="/login" activeClassName="hurray">
        Login
      </NavLink>
      <Button onClick={handleLogoutClick}>Logout </Button>
      <MusicTab />
    </Container>
  );
};

export default Home;
