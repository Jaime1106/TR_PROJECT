import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerStyle = {
    backgroundColor: '#1f2937',
    color: 'white',
    padding: '3rem 2rem 1.5rem',
    marginTop: 'auto'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  };

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  };

  const titleStyle = {
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    borderBottom: '2px solid #3b82f6',
    paddingBottom: '0.5rem',
    display: 'inline-block'
  };

  const linkStyle = {
    color: '#9ca3af',
    textDecoration: 'none',
    transition: 'color 0.3s',
    fontSize: '0.95rem'
  };

  const contactInfoStyle = {
    color: '#9ca3af',
    fontSize: '0.95rem',
    lineHeight: '1.6'
  };

  const socialIconsStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem'
  };

  const iconStyle = {
    color: '#9ca3af',
    fontSize: '1.5rem',
    textDecoration: 'none',
    transition: 'color 0.3s'
  };

  const bottomBarStyle = {
    borderTop: '1px solid #374151',
    paddingTop: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  };

  const copyrightStyle = {
    color: '#9ca3af',
    fontSize: '0.9rem'
  };

  const bottomLinksStyle = {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap'
  };

  const handleMouseEnter = (e) => {
    e.target.style.color = '#3b82f6';
  };

  const handleMouseLeave = (e) => {
    e.target.style.color = '#9ca3af';
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={gridStyle}>
          <div style={sectionStyle}>
            <h3 style={titleStyle}>Consultas Tributarias</h3>
            <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>
              Plataforma especializada en consultas de calendarios tributarios 
              para todo tipo de contribuyentes en Colombia.
            </p>
            <div style={socialIconsStyle}>
              <a 
                href="#" 
                style={iconStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                
              </a>
              <a 
                href="#" 
                style={iconStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                
              </a>
              <a 
                href="#" 
                style={iconStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                
              </a>
            </div>
          </div>

          <div style={sectionStyle}>
            <h3 style={titleStyle}>Enlaces Rápidos</h3>
            <Link 
              to="/" 
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Inicio
            </Link>
            <Link 
              to="/pricing" 
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Planes y Precios
            </Link>
            <Link 
              to="/login" 
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Iniciar Sesión
            </Link>
            <Link 
              to="/register" 
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Registrarse
            </Link>
          </div>

          <div style={sectionStyle}>
            <h3 style={titleStyle}>Contacto</h3>
            <div style={contactInfoStyle}>
              <div>📍 Barranquilla, Colombia</div>
              <div>📞 +57 (300) 123 45 67</div>
              <div>✉️ info@consultastributarias.com</div>
            </div>
          </div>
        </div>

        <div style={bottomBarStyle}>
          <div style={copyrightStyle}>
            © {currentYear} Consultas Tributarias. Todos los derechos reservados.
          </div>
          <div style={bottomLinksStyle}>
            <Link 
              to="/terms" 
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Términos y Condiciones
            </Link>
            <Link 
              to="/privacy" 
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;