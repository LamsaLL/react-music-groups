import React, { Component, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
//
// PrivateRoute component
//
// This component renders the private route.
//
const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
