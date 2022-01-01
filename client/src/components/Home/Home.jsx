// This component renders the home page.
import React, { Component } from "react";
import { Route, Redirect, NavLink } from "react-router-dom";
import MusicTab from "../MusicTab/MusicTab.jsx";
import { Container } from "semantic-ui-react";

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <NavLink to="/login" activeClassName="hurray">
            Login
          </NavLink>
          <MusicTab />
        </Container>
      </header>
    </div>
  );
};

export default Home;
