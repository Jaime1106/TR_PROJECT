import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import contribuyenteService from '../../services/contribuyenteService';

const Home = () => {
  const navigate = useNavigate();
  const [nit, setNit] = useState('');
  const [tipoContribuyente, setTipoContribuyente] = useState('');

  // Tipos de contribuyente obtenidos desde Neon
  const [tiposContribuyente, setTiposContribuyente] = useState([]);
  const [loadingTipos, setLoadingTipos] = useState(true);

  useEffect(() => {
    const cargarTipos = async () => {
      try {
        const tipos = await contribuyenteService.getTipos();
        setTiposContribuyente(tipos);
      } catch (error) {
        console.error(
          'Error cargando tipos de contribuyente:',
          error
        );
      } finally {
        setLoadingTipos(false);
      }
    };

    cargarTipos();
  }, []);

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
      alert(
        'Por favor ingresa el NIT y selecciona el tipo de contribuyente'
      );
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
            Ingresa tu NIT y tipo de contribuyente para obtener todas las
            fechas de pago importantes del calendario tributario.
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
                onChange={(e) =>
                  setTipoContribuyente(e.target.value)
                }
                disabled={loadingTipos}
              >
                <option value="">
                  {loadingTipos
                    ? 'Cargando tipos...'
                    : 'Tipo de Contribuyente'}
                </option>

                {tiposContribuyente.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              style={buttonStyle}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = '#2563eb')
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = '#1e3a8a')
              }
              onClick={handleConsultar}
            >
              Consultar Ahora
            </button>

            <p
              style={{
                color: '#6b7280',
                fontSize: '0.875rem',
                marginTop: '1rem'
              }}
            >
              * 3 consultas gratuitas sin registro
            </p>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2
            style={{
              fontSize: '2rem',
              color: '#1e3a8a',
              textAlign: 'center',
              marginBottom: '1rem'
            }}
          >
            Tipos de Contribuyente
          </h2>

          <p
            style={{
              textAlign: 'center',
              color: '#4b5563',
              maxWidth: '600px',
              margin: '0 auto 3rem'
            }}
          >
            Selecciona tu tipo de contribuyente para ver las fechas
            específicas que aplican a tu régimen tributario.
          </p>

          <div style={cardGridStyle}>
            {tiposContribuyente.map((tipo) => (
              <div
                key={tipo.id}
                style={cardStyle}
              >
                <h3 style={cardTitleStyle}>
                  {tipo.name}
                </h3>

                <p
                  style={{
                    color: '#4b5563',
                    lineHeight: '1.6'
                  }}
                >
                  {tipo.description}
                </p>
              </div>
            ))}
          </div>

          <div style={benefitsStyle}>
            <div style={benefitStyle}>
              <div style={benefitIconStyle}>
                📅
              </div>

              <h3 style={benefitTitleStyle}>
                Fechas Actualizadas
              </h3>

              <p style={{ color: '#4b5563' }}>
                Consulta las fechas de vencimiento de tus
                obligaciones tributarias.
              </p>
            </div>

            <div style={benefitStyle}>
              <div style={benefitIconStyle}>
                🔔
              </div>

              <h3 style={benefitTitleStyle}>
                No Pierdas Fechas
              </h3>

              <p style={{ color: '#4b5563' }}>
                Mantente al día con tus obligaciones tributarias.
              </p>
            </div>

            <div style={benefitStyle}>
              <div style={benefitIconStyle}>
                ⚡
              </div>

              <h3 style={benefitTitleStyle}>
                Consulta Rápida
              </h3>

              <p style={{ color: '#4b5563' }}>
                Obtén tus fechas tributarias de forma rápida y
                sencilla.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;