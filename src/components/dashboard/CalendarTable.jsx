import { useState } from 'react';

const CalendarTable = ({ data, loading }) => {
  const [filterStatus, setFilterStatus] = useState('todos');

  if (loading) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '3rem',
        textAlign: 'center',
        color: '#6b7280'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        <p>Cargando resultados...</p>
      </div>
    );
  }

  if (!data || !data.obligations || data.obligations.length === 0) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '3rem',
        textAlign: 'center',
        color: '#6b7280'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📭</div>
        <p>No hay resultados para mostrar. Realiza una consulta para ver las obligaciones.</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'vencido': return { bg: '#fee2e2', text: '#b91c1c' };
      case 'próximo a vencer': return { bg: '#fef3c7', text: '#b45309' };
      case 'vigente': return { bg: '#dcfce7', text: '#166534' };
      case 'pagado': return { bg: '#dbeafe', text: '#1e3a8a' };
      default: return { bg: '#f3f4f6', text: '#4b5563' };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'vencido': return 'Vencido';
      case 'próximo a vencer': return 'Próximo a vencer';
      case 'vigente': return 'Vigente';
      case 'pagado': return 'Pagado';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const filteredObligations = filterStatus === 'todos' 
    ? data.obligations 
    : data.obligations.filter(ob => ob.status === filterStatus);

  const tableStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const headerStyle = {
    backgroundColor: '#1e3a8a',
    color: 'white',
    padding: '1rem',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: '600'
  };

  const rowStyle = {
    borderBottom: '1px solid #e5e7eb',
    transition: 'background-color 0.3s'
  };

  const cellStyle = {
    padding: '1rem',
    fontSize: '0.875rem'
  };

  const summaryStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '1.5rem'
  };

  const summaryCardStyle = {
    backgroundColor: '#f8fafc',
    padding: '1rem',
    borderRadius: '8px',
    textAlign: 'center'
  };

  const filterButtonsStyle = {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
    flexWrap: 'wrap'
  };

  const filterButtonStyle = (status) => ({
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: filterStatus === status ? '#1e3a8a' : '#e5e7eb',
    color: filterStatus === status ? 'white' : '#4b5563',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'all 0.3s'
  });

  return (
    <div>
      {/* Resumen de la consulta */}
      <div style={summaryStyle}>
        <div style={summaryCardStyle}>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>NIT</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e3a8a' }}>
            {data.nit}
          </div>
        </div>
        <div style={summaryCardStyle}>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Tipo Contribuyente</div>
          <div style={{ fontSize: '1rem', fontWeight: '500', color: '#1f2937' }}>
            {data.contribuyenteType}
          </div>
        </div>
        <div style={summaryCardStyle}>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Total Obligaciones</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e3a8a' }}>
            {data.totalObligations}
          </div>
        </div>
        <div style={summaryCardStyle}>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Último dígito NIT</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e3a8a' }}>
            {data.lastDigit}
          </div>
        </div>
      </div>

      {/* Filtros por estado */}
      <div style={filterButtonsStyle}>
        <button 
          style={filterButtonStyle('todos')}
          onClick={() => setFilterStatus('todos')}
        >
          Todos ({data.obligations.length})
        </button>
        <button 
          style={filterButtonStyle('vigente')}
          onClick={() => setFilterStatus('vigente')}
        >
          Vigentes ({data.obligations.filter(o => o.status === 'vigente').length})
        </button>
        <button 
          style={filterButtonStyle('próximo a vencer')}
          onClick={() => setFilterStatus('próximo a vencer')}
        >
          Próximos ({data.obligations.filter(o => o.status === 'próximo a vencer').length})
        </button>
        <button 
          style={filterButtonStyle('vencido')}
          onClick={() => setFilterStatus('vencido')}
        >
          Vencidos ({data.obligations.filter(o => o.status === 'vencido').length})
        </button>
      </div>

      {/* Tabla de resultados */}
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerStyle}>Impuesto</th>
              <th style={headerStyle}>Período</th>
              <th style={headerStyle}>Frecuencia</th>
              <th style={headerStyle}>Institución</th>
              <th style={headerStyle}>Fecha Límite</th>
              <th style={headerStyle}>Días</th>
              <th style={headerStyle}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredObligations.map((item, index) => {
              const colors = getStatusColor(item.status);
              return (
                <tr 
                  key={index} 
                  style={rowStyle}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={cellStyle}>
                    <div style={{ fontWeight: '500' }}>{item.taxType}</div>
                  </td>
                  <td style={cellStyle}>
                    <div>{item.period}</div>
                  </td>
                  <td style={cellStyle}>
                    <div style={{ color: '#6b7280' }}>{item.frequency}</div>
                  </td>
                  <td style={cellStyle}>
                    <div style={{ color: '#6b7280' }}>{item.institution}</div>
                  </td>
                  <td style={cellStyle}>
                    <div style={{ fontWeight: '500' }}>{formatDate(item.dueDate)}</div>
                  </td>
                  <td style={cellStyle}>
                    <div style={{ 
                      fontWeight: '600',
                      color: item.daysUntil < 0 ? '#b91c1c' : '#1e3a8a'
                    }}>
                      {item.daysUntil < 0 ? `${Math.abs(item.daysUntil)} días` : item.daysUntil}
                    </div>
                  </td>
                  <td style={cellStyle}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: colors.bg,
                      color: colors.text
                    }}>
                      {getStatusText(item.status)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Resumen mensual */}
      {data.monthlySummary && data.monthlySummary.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h4 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>Resumen por Mes</h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {data.monthlySummary.map((month, index) => (
              <div key={index} style={{
                backgroundColor: '#f8fafc',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ fontWeight: 'bold', color: '#1e3a8a', marginBottom: '0.5rem' }}>
                  {month.month}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                  Total: {month.count} obligaciones
                </div>
                {month.vencidos > 0 && (
                  <div style={{ fontSize: '0.875rem', color: '#b91c1c' }}>
                    Vencidos: {month.vencidos}
                  </div>
                )}
                {month.proximos > 0 && (
                  <div style={{ fontSize: '0.875rem', color: '#b45309' }}>
                    Próximos: {month.proximos}
                  </div>
                )}
                {month.vigentes > 0 && (
                  <div style={{ fontSize: '0.875rem', color: '#166534' }}>
                    Vigentes: {month.vigentes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarTable;