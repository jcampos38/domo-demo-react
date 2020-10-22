import React, { useState, useContext } from 'react';
import { Col, Alert } from 'reactstrap';
import { MicrosoftLoginButton } from "react-social-login-buttons";
import AuthService from './../../services/AuthService';
import UserContext from './../../context/UserContext';
import { Redirect } from 'react-router-dom';


const Login = () => {
    const { user, setUser } = useContext(UserContext);

    const [alert, setAlert ] = useState({
        color: 'info',
        text: 'Info',
        isOpen: false
    });

    const handleError = (error) => {
        setAlert({
            isOpen: true,
            color: 'danger',
            text: error
        });
    }

    const onValidSubmit = async () => {
        try {
            //const res = await UserService.authenticate(state);
            const res = await AuthService.signIn();
            console.log(res)
            setUser(res);
        }catch(e) {
            handleError(String(e));
        }
    }

    return(
        <Col className="login" md={{ size: 6, offset: 3 }}>
            {!user ?  
            <div><Alert isOpen={alert.isOpen}
            color={alert.color}
            toggle={()=>{ setAlert({ ...alert, isOpen: !alert.isOpen}) }}>
                {alert.text}
            </Alert>
            <MicrosoftLoginButton onClick={onValidSubmit} /></div>
            : <Redirect to='/dashboards'/>}
        </Col>
    );
}

export default Login;
