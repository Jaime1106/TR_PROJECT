import { Link, useNavigate } from 'react-router-dom';
import { TIPOS_CONTRIBUYENTE } from '../../utils/constants';
import { useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [nit, setNit] = useState('');
  const [tipoContribuyente, setTipoContribuyente] = useState('');

  const heroSectionStyle = {
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    color: 'white',
    padding: '4rem 2rem',
    textAlign: 'center'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    lineHeight: '1.2'
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    opacity: '0.9',
    maxWidth: '600px',
    margin: '0 auto 2rem'
  };

  const searchBoxStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  const searchTitleStyle = {
    color: '#1e3a8a',
    fontSize: '1.5rem',
    marginBottom: '1.5rem'
  };

  const inputGroupStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  };

  const inputStyle = {
    flex: '1',
    padding: '0.75rem',
    border: '2px solid #e5e7eb',
    borderRadius: '5px',
    fontSize: '1rem'
  };

  const selectStyle = {
    flex: '1',
    padding: '0.75rem',
    border: '2px solid #e5e7eb',
    borderRadius: '5px',
    fontSize: '1rem',
    backgroundColor: 'white'
  };

  const buttonStyle = {
    backgroundColor: '#1e3a8a',
    color: 'white',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  };

  const sectionStyle = {
    padding: '4rem 2rem',
    backgroundColor: '#f8fafc'
  };

  const cardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '3rem'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s'
  };

  const cardTitleStyle = {
    color: '#1e3a8a',
    fontSize: '1.25rem',
    marginBottom: '1rem',
    borderBottom: '2px solid #e5e7eb',
    paddingBottom: '0.5rem'
  };

  const cardListStyle = {
    listStyle: 'none',
    padding: '0'
  };

  const cardListItemStyle = {
    padding: '0.5rem 0',
    color: '#4b5563',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const benefitsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '3rem'
  };

  const benefitStyle = {
    textAlign: 'center',
    padding: '2rem'
  };

  const benefitIconStyle = {
    fontSize: '3rem',
    marginBottom: '1rem'
  };

  const benefitTitleStyle = {
    color: '#1e3a8a',
    fontSize: '1.25rem',
    marginBottom: '0.5rem'
  };

  const handleConsultar = () => {
    if (!nit || !tipoContribuyente) {
      alert('Por favor ingresa el NIT y selecciona el tipo de contribuyente');
      return;
    }

    // Redirigir al login con los datos
    navigate('/login', { 
      state: { 
        from: '/dashboard',
        nit, 
        tipoContribuyente 
      } 
    });
  };

  return (
    <>
      <section style={heroSectionStyle}>
        <div style={containerStyle}>
          <h1 style={titleStyle}>
            Consulta tus Fechas Tributarias al Instante
          </h1>
          <p style={subtitleStyle}>
            Ingresa tu NIT y tipo de contribuyente para obtener todas las fechas 
            de pago importantes del calendario tributario.
          </p>
          
          <div style={searchBoxStyle}>
            <h2 style={searchTitleStyle}>
              Prueba gratuita
            </h2>
            <div style={inputGroupStyle}>
              <input
                type="text"
                placeholder="NIT (ej: 123.456.789)"
                style={inputStyle}
                value={nit}
                onChange={(e) => setNit(e.target.value)}
              />
              <select 
                style={selectStyle}
                value={tipoContribuyente}
                onChange={(e) => setTipoContribuyente(e.target.value)}
              >
                <option value="">Tipo de Contribuyente</option>
                {TIPOS_CONTRIBUYENTE.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>
            <button 
              style={buttonStyle}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#1e3a8a'}
              onClick={handleConsultar}
            >
              Consultar Ahora
            </button>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '1rem' }}>
              * 3 consultas gratuitas sin registro
            </p>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={{ 
            fontSize: '2rem', 
            color: '#1e3a8a', 
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            Tipos de Contribuyente
          </h2>
          <p style={{ 
            textAlign: 'center', 
            color: '#4b5563',
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            Selecciona tu tipo de contribuyente para ver las fechas específicas 
            que aplican a tu régimen tributario.
          </p>

          <div style={cardGridStyle}>
            {TIPOS_CONTRIBUYENTE.map(tipo => (
              <div 
                key={tipo.id} 
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
              >
                <h3 style={cardTitleStyle}>{tipo.label}</h3>
                <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                  {tipo.description}
                </p>
                <h4 style={{ 
                  color: '#374151', 
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                  fontWeight: '600'
                }}>
                  Próximas fechas:
                </h4>
                <ul style={cardListStyle}>
                  <li style={cardListItemStyle}>
                    <span style={{ color: '#10b981' }}>✓</span>
                    Declaración mensual
                  </li>
                  <li style={cardListItemStyle}>
                    <span style={{ color: '#10b981' }}>✓</span>
                    Pago de impuestos
                  </li>
                  <li style={cardListItemStyle}>
                    <span style={{ color: '#10b981' }}>✓</span>
                    Obligaciones formales
                  </li>
                </ul>
                <Link 
                  to="/register" 
                  style={{
                    display: 'inline-block',
                    marginTop: '1rem',
                    color: '#1e3a8a',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                >
                  Ver calendario completo →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', backgroundColor: 'white' }}>
        <div style={containerStyle}>
          <h2 style={{ 
            fontSize: '2rem', 
            color: '#1e3a8a', 
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            ¿Por qué usar nuestra plataforma?
          </h2>
          
          <div style={benefitsStyle}>
            <div style={benefitStyle}>
              <div style={benefitIconStyle}>📅</div>
              <h3 style={benefitTitleStyle}>Calendario Actualizado</h3>
              <p style={{ color: '#6b7280' }}>
                Fechas oficiales actualizadas automáticamente según resoluciones DIAN
              </p>
            </div>
            
            <div style={benefitStyle}>
              <div style={benefitIconStyle}>🔔</div>
              <h3 style={benefitTitleStyle}>Recordatorios</h3>
              <p style={{ color: '#6b7280' }}>
                Recibe notificaciones antes de cada fecha límite
              </p>
            </div>
            
            <div style={benefitStyle}>
              <div style={benefitIconStyle}>📊</div>
              <h3 style={benefitTitleStyle}>Reportes Personalizados</h3>
              <p style={{ color: '#6b7280' }}>
                Descarga tu calendario en PDF o Excel
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={containerStyle}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Comienza hoy mismo
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: '0.9' }}>
            Obtén acceso completo a todos los calendarios tributarios
          </p>
          <Link 
            to="/register"
            style={{
              backgroundColor: 'white',
              color: '#1e3a8a',
              border: 'none',
              padding: '1rem 3rem',
              borderRadius: '5px',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'transform 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Ver Planes y Precios
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;