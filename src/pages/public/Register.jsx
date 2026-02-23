import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    aceptaTerminos: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Limpiar error cuando el usuario empieza a escribir
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!formData.nombre || !formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!formData.aceptaTerminos) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    setLoading(true);

    // Simular registro (conectar con backend después)
    setTimeout(() => {
      const user = {
        name: formData.nombre,
        email: formData.email
      };
      login(user);
      navigate('/dashboard');
      setLoading(false);
    }, 1500);
  };

  const containerStyle = {
    maxWidth: '450px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  const titleStyle = {
    color: '#1e3a8a',
    fontSize: '2rem',
    marginBottom: '0.5rem',
    textAlign: 'center'
  };

  const subtitleStyle = {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '2rem'
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

  const checkboxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1.5rem'
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
    cursor: loading ? 'wait' : 'pointer',
    opacity: loading ? 0.7 : 1,
    transition: 'background-color 0.3s'
  };

  const errorStyle = {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    padding: '0.75rem',
    borderRadius: '5px',
    marginBottom: '1rem',
    textAlign: 'center'
  };

  const linkStyle = {
    color: '#1e3a8a',
    textDecoration: 'none',
    fontWeight: '500'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Crear Cuenta</h1>
      <p style={subtitleStyle}>Regístrate para acceder a todas las funcionalidades</p>

      {error && <div style={errorStyle}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Nombre completo</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Ej: Juan Pérez"
            onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            required
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            placeholder="ejemplo@correo.com"
            onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            required
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Mínimo 6 caracteres"
            onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            required
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Confirmar Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Repite tu contraseña"
            onFocus={(e) => e.target.style.borderColor = '#1e3a8a'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            required
          />
        </div>

        <div style={checkboxStyle}>
          <input
            type="checkbox"
            name="aceptaTerminos"
            checked={formData.aceptaTerminos}
            onChange={handleChange}
            id="terminos"
            required
          />
          <label htmlFor="terminos" style={{ color: '#4b5563' }}>
            Acepto los{' '}
            <Link to="/terms" style={linkStyle}>términos y condiciones</Link>
            {' '}y la{' '}
            <Link to="/privacy" style={linkStyle}>política de privacidad</Link>
          </label>
        </div>

        <button 
          type="submit"
          style={buttonStyle}
          disabled={loading}
          onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
          onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#1e3a8a')}
        >
          {loading ? 'Creando cuenta...' : 'Registrarse'}
        </button>
      </form>

      <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#6b7280' }}>
        ¿Ya tienes cuenta?{' '}
        <Link 
          to="/login" 
          style={linkStyle}
          onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
        >
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
};

export default Register;