import { useEffect, useState } from 'react';
import contribuyenteService from '../../services/contribuyenteService';

const SearchNIT = ({ onSearch, loading }) => {
  const [nit, setNit] = useState('');
  const [tipoContribuyente, setTipoContribuyente] = useState('');
  const [mes, setMes] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [error, setError] = useState('');

  // Tipos de contribuyente provenientes de Neon
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
        setError('No se pudieron cargar los tipos de contribuyente');
      } finally {
        setLoadingTipos(false);
      }
    };

    cargarTipos();
  }, []);

  const meses = [
    { value: '', label: 'Todos los meses' },
    { value: '1', label: 'Enero' },
    { value: '2', label: 'Febrero' },
    { value: '3', label: 'Marzo' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Mayo' },
    { value: '6', label: 'Junio' },
    { value: '7', label: 'Julio' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' }
  ];

  const years = [
    '2024',
    '2025',
    '2026',
    '2027'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!nit || !tipoContribuyente) {
      setError(
        'Por favor ingresa el NIT y selecciona el tipo de contribuyente'
      );
      return;
    }

    // Validar NIT (9 dígitos)
    const nitLimpio = nit.replace(/[\.\-\s]/g, '');

    if (!/^\d{9}$/.test(nitLimpio)) {
      setError('El NIT debe tener exactamente 9 dígitos');
      return;
    }

    onSearch({
      nit: nitLimpio,
      tipoContribuyente,
      mes: mes || null,
      year: parseInt(year)
    });
  };

  const formatNit = (value) => {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length <= 3) return numbers;

    if (numbers.length <= 6) {
      return numbers.replace(
        /(\d{3})(\d{1,3})/,
        '$1.$2'
      );
    }

    return numbers.replace(
      /(\d{3})(\d{3})(\d{1,3})/,
      '$1.$2.$3'
    );
  };

  const handleNitChange = (e) => {
    const formatted = formatNit(e.target.value);
    setNit(formatted);
  };

  const containerStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '1.5rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  };

  const titleStyle = {
    color: '#1e3a8a',
    fontSize: '1.25rem',
    marginBottom: '1.5rem',
    fontWeight: '600'
  };

  const formStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    alignItems: 'end'
  };

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  };

  const labelStyle = {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#4b5563'
  };

  const inputStyle = {
    padding: '0.75rem',
    border: '2px solid #e5e7eb',
    borderRadius: '5px',
    fontSize: '1rem',
    transition: 'border-color 0.3s',
    width: '100%'
  };

  const selectStyle = {
    ...inputStyle,
    backgroundColor: 'white',
    cursor: 'pointer'
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#1e3a8a',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor:
      loading || loadingTipos ? 'wait' : 'pointer',
    opacity:
      loading || loadingTipos ? 0.7 : 1,
    transition: 'background-color 0.3s',
    height: 'fit-content'
  };

  const errorStyle = {
    color: '#dc2626',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
    gridColumn: '1 / -1'
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>
        Consultar Calendario Tributario
      </h3>

      <form onSubmit={handleSubmit}>
        <div style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>
              NIT *
            </label>

            <input
              type="text"
              value={nit}
              onChange={handleNitChange}
              placeholder="123.456.789"
              style={inputStyle}
              disabled={loading}
              onFocus={(e) =>
                (e.target.style.borderColor = '#1e3a8a')
              }
              onBlur={(e) =>
                (e.target.style.borderColor = '#e5e7eb')
              }
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>
              Tipo Contribuyente *
            </label>

            <select
              value={tipoContribuyente}
              onChange={(e) =>
                setTipoContribuyente(e.target.value)
              }
              style={selectStyle}
              disabled={loading || loadingTipos}
            >
              <option value="">
                {loadingTipos
                  ? 'Cargando tipos...'
                  : 'Seleccione...'}
              </option>

              {tiposContribuyente.map((tipo) => (
                <option
                  key={tipo.id}
                  value={tipo.name}
                >
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>
              Mes
            </label>

            <select
              value={mes}
              onChange={(e) =>
                setMes(e.target.value)
              }
              style={selectStyle}
              disabled={loading}
            >
              {meses.map((m) => (
                <option
                  key={m.value}
                  value={m.value}
                >
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>
              Año
            </label>

            <select
              value={year}
              onChange={(e) =>
                setYear(e.target.value)
              }
              style={selectStyle}
              disabled={loading}
            >
              {years.map((y) => (
                <option
                  key={y}
                  value={y}
                >
                  {y}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            style={buttonStyle}
            disabled={loading || loadingTipos}
            onMouseEnter={(e) =>
              !loading &&
              !loadingTipos &&
              (e.target.style.backgroundColor = '#2563eb')
            }
            onMouseLeave={(e) =>
              !loading &&
              !loadingTipos &&
              (e.target.style.backgroundColor = '#1e3a8a')
            }
          >
            {loading
              ? 'Consultando...'
              : 'Consultar'}
          </button>
        </div>

        {error && (
          <div style={errorStyle}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchNIT;