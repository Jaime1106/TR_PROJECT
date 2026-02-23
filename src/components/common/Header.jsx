import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const headerStyle = {
    backgroundColor: '#1e3a8a',
    color: 'white',
    padding: '1rem 2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none'
  };

  const navStyle = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s'
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: '2px solid white',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s',
    textDecoration: 'none'
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
           Consultas Tributarias
        </Link>

        <nav style={navStyle}>
          <Link to="/" style={linkStyle}>Inicio</Link>
          <Link to="/pricing" style={linkStyle}>Planes</Link>
          
          {user ? (
            <>
              <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
              <Link to="/profile" style={linkStyle}>Perfil</Link>
              <button 
                onClick={handleLogout}
                style={buttonStyle}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.color = '#1e3a8a';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'white';
                }}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={linkStyle}>Iniciar Sesión</Link>
              <Link 
                to="/register"
                style={{
                  ...buttonStyle,
                  backgroundColor: 'white',
                  color: '#1e3a8a'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e5e7eb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'white';
                }}
              >
                Registrarse
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;