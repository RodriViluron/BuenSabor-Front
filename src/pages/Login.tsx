import React, { useState } from 'react';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import HomePage from './HomePage';

interface LoginRequest {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
      try {
          const loginData: LoginRequest = {
              username: username,
              password: password,
          };
          const response = await axios.post('http://localhost:8088/auth/login', loginData);
          
          localStorage.setItem('token', response.data.token);
          console.log('Respuesta del backend:', response.data);
          window.localStorage.setItem('isLoggedIn', 'true')
          navigate('/');
          
      } catch (error) {
          // Manejar errores de red u otros errores
          setError('Error de red o servidor');
      }
  };

  return (
      <div>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
  );
};

export default Login;