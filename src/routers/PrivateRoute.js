import React from 'react';
import { Route, Redirect } from 'react-router-dom'; 
import Header from '../components/Header';

const PrivateRoute = ({ 
    isAuthenticated, 
    component: Component, 
    ...rest 
 }) => {
     return ( 
        
        <Route {...rest} component={(props) => ( 
            isAuthenticated ? (
                <div>
                    <Header />
                    <Component  {...props}/> 
                </div>
            ) : (
                <Redirect to="/" /> 
            )
        )}/> 
    ); 
 }
 


export default PrivateRoute;