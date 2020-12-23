import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';//browser router used once to create the new router and 'route' for every page.
import AddRecommendationPage from '../components/AddRecommendationPage';
import RecommendationDashboardPage from '../components/RecommendationDashboardPage';
import EditRecommendationPage from '../components/EditRecommendationPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import SignUpPage from '../components/SignUpPage'
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = ()  => ( 
    <Router>
        <div>
            <Switch>
            {/*
                <Route exact={true} path="/">
                    <LoginPage />
                </Route>
                <Route exact={true} path="/dashboard">
                    <RecommendationDashboardPage />
                </Route>
                <Route exact={true} path="/create">
                    <AddRecommendationPage />
                </Route>
                <Route exact={true} path="/edit/:id">
                    <EditRecommendationPage />
                </Route>
                <Route path="*">
                    <NotFoundPage />
                </Route>
*/}
                 <PublicRoute path="/" component={LoginPage} isAuthenticated={false} exact={true} ></PublicRoute>
                 <PublicRoute path="/signUp" component={SignUpPage} isAuthenticated={false} exact={true} ></PublicRoute>
                 <PrivateRoute path="/dashboard" component={RecommendationDashboardPage} isAuthenticated={true} exact={true}></PrivateRoute>
                 <PrivateRoute path="/create" component={AddRecommendationPage} isAuthenticated={true}></PrivateRoute>
                 <PrivateRoute path="/edit/:id" component={EditRecommendationPage} isAuthenticated={true} ></PrivateRoute>
                 <Route component={NotFoundPage}></Route>/
                
            </Switch>
        </div>
    </Router>
);

export {AppRouter as default} ;
