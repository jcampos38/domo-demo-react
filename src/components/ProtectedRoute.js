import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from './../context/UserContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(UserContext);
    return (
        <Route {...rest} render={
            props => (user ? <Component {...rest} {...props} /> : 
                        <Redirect to={"/login"}/>)
        } />
    )
}

export default ProtectedRoute;
