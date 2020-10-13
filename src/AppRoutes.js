import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App'
import ContextProvider from './context/ContextProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboards from './pages/Dashboards';

const AppRoutes = () =>
    <ContextProvider>
        <App>
            <Switch>
                <Route exact path="/login" component={Login} />
                <ProtectedRoute exact path="/dashboards" component={Dashboards}/>
                <ProtectedRoute exact path="/" component={Dashboards}/>
            </Switch>
        </App>
    </ContextProvider>
    
export default AppRoutes;