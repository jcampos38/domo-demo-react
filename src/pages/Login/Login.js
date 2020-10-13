import React, { useState, useContext } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Col, Alert } from 'reactstrap';
import UserService from './../../services/UserService';
import UserContext from './../../context/UserContext';
import { Redirect } from 'react-router-dom';


const Login = () => {
    const { user, setUser } = useContext(UserContext);
    const [state, setState ] = useState({
        username: "",
        password: ""
    });
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

    const onChange = ({ target }) => {
        let { id, value } = target;
        setState({
            ...state,
            [id]: value
        });
    }

    const onValidSubmit = async () => {
        try {
            const res = await UserService.authenticate(state);
            console.log(res.headers)
            //console.log(headers['set-cookie'])
            setUser(res.data);
        }catch(e) {
            handleError(String(e));
        }
    }

    return(
        <Col className="login" md={{ size: 6, offset: 3 }}>
            {!user ? <AvForm onValidSubmit={onValidSubmit}>
                <h3>Login</h3>
                <Alert isOpen={alert.isOpen}
                    color={alert.color}
                    toggle={()=>{ setAlert({ ...alert, isOpen: !alert.isOpen}) }}>
                        {alert.text}
                </Alert>
                <AvField name="username" label="Name" required onChange={onChange}/>
                <AvField name="password" label="Password" type="password" required onChange={onChange}/>
                <div className="text-center">
                    <Button color="primary">Submit</Button>
                </div>
            </AvForm> : <Redirect to='/dashboards'/>}
        </Col>
    );
}

export default Login;
