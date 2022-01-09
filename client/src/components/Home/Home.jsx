// This component renders the home page.
import React, { Component } from "react";
import { Route, Redirect, NavLink } from "react-router-dom";
import MusicTab from "../MusicTab/MusicTab.jsx";
import { Container, Link, Button, Segment } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const admin = localStorage.getItem("admin");

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
      <Segment textAlign="right">
        {admin ? (
          <Button onClick={handleLogoutClick}>Logout </Button>
        ) : (
          <Button as={NavLink} to="/login">
            Login
          </Button>
        )}
      </Segment>
      <Segment>
        <MusicTab />
      </Segment>
      <ToastContainer></ToastContainer>
    </Container>
  );
};

export default Home;
