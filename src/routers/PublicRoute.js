import React from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

const PublicRoute = ({ component: Component, ...rest }) => {
  const { path } = { ...rest };
  return (
    <div>
      {path === "/" ? <Header /> : ""}
      <Route {...rest} component={(props) => <Component {...props} />} />
    </div>
  );
};

export { PublicRoute as default };
