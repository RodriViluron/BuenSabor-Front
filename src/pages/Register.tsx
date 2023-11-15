import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface RegisterRequest {
  username: string;
  password: string;
  apellido: string;
  nombre: string;
  telefono: string;
  email: string;
}

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const registerData: RegisterRequest = {
        username,
        password,
        apellido,
        nombre,
        telefono,
        email,
      };

      const response = await axios.post('http://localhost:8088/auth/register', registerData);
      
      console.log('Respuesta del backend:', response.data);

      // Puedes redirigir al usuario a la página de inicio de sesión después del registro
      navigate('/login');
    } catch (error) {
      // Manejar errores de red u otros errores
      setError('Error de red o servidor');
    }
  };

  return (
    <div>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Register;
