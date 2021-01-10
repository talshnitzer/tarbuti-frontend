import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";
import UsersContext from "../context/users-context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UsersContext);
  const isAuthenticated = !!user.token;
  console.log("PrivateRoute---isAuthenticated", isAuthenticated);
  console.log("PrivateRoute---user", user);
  const { path } = { ...rest };
  const isAdmin = user.userType === "admin";
  const adminPath = path === "/admin";
  const isAuthorized = (adminPath && isAdmin) || !adminPath;

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated && isAuthorized ? (
          <div>
            <Header />
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
