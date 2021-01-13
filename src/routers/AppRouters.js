import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; //browser router used once to create the new router and 'route' for every page.
import AddRecommendationPage from "../components/AddRecommendationPage";
import RecommendationDashboardPage from "../components/RecommendationDashboardPage";
import EditRecommendationPage from "../components/EditRecommendationPage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import SignUpPage from "../components/SignUpPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import AdminPage from "../components/AdminPage";

// P.Z: When the body of a tag is empty, it's usually prettier to use self-closing tags:
// Instead of <PublicRoute></PublicRoute> use <PublicRoute/>
const AppRouter = () => (
  <Router>
    <div>
      <Switch>
        <PublicRoute path="/login" component={LoginPage} exact={true}></PublicRoute>
        <PublicRoute
          path="/signUp"
          component={SignUpPage}
          exact={true}
        ></PublicRoute>
        <PrivateRoute
          path="/admin"
          component={AdminPage}
          exact={true}
        ></PrivateRoute>
        <PublicRoute
          path="/"
          component={RecommendationDashboardPage}
          exact={true}
        ></PublicRoute>
        <PrivateRoute
          path="/create"
          component={AddRecommendationPage}
        ></PrivateRoute>
        <PrivateRoute
          path="/edit/:id"
          component={EditRecommendationPage}
        ></PrivateRoute>
        <Route component={NotFoundPage}></Route>/
      </Switch>
    </div>
  </Router>
);

export { AppRouter as default };
