import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const state = location.state || {};
  const { from = '/dashboard', nit, tipoContribuyente } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = { email, name: 'Usuario Demo' };
    login(user);
    
    navigate(from, { state: { nit, tipoContribuyente } });
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '4rem auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  const titleStyle = {
    color: '#1e3a8a',
    fontSize: '2rem',
    marginBottom: '2rem',
    textAlign: 'center'
  };

  const inputGroupStyle = {
    marginBottom: '1.5rem'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#4b5563',
    fontWeight: '500'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #e5e7eb',
    borderRadius: '5px',
    fontSize: '1rem',
    transition: 'border-color 0.3s'
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#1e3a8a',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  };

  const linkStyle = {
    color: '#1e3a8a',
    textDecoration: 'none',
    fontWeight: '500'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Iniciar Sesión</h1>
      
      {nit && tipoContribuyente && (
        <div style={{ 
          backgroundColor: '#dbeafe', 
          padding: '1rem', 
          borderRadius: '5px',
          marginBottom: '1.5rem',
          border: '1px solid #93c5fd'
        }}>
          <p style={{ color: '#1e3a8a', margin: 0 }}>
            Consulta pendiente: NIT <strong>{nit}</strong> 
            <br />
            <small>({tipoContribuyente})</small>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="usuario@ejemplo.com"
            required
            onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>
        
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="••••••••"
            required
            onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        <button 
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#1e3a8a'}
        >
          Iniciar Sesión
        </button>
      </form>

      <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#6b7280' }}>
        ¿No tienes cuenta?{' '}
        <Link 
          to="/register" 
          style={linkStyle}
          onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
        >
          Regístrate
        </Link>
      </p>
    </div>
  );
};

export default Login;