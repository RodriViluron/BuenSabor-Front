import Button from 'react-bootstrap/Button';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
    //Utils
    const navigate = useNavigate();

    // Handlers
    function onLogIn() {
        window.localStorage.setItem('isLoggedIn', 'true');
        navigate('/')
    }
    // Render
    return (
        <div className='container_buttonLogIn'>  
            <Button onClick={onLogIn}>Log In</Button>
        </div>
    );
};
export default Login;