import { useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import SearchNIT from '../../components/dashboard/SearchNIT';
import CalendarTable from '../../components/dashboard/CalendarTable';
import { useCalendar } from '../../hooks/useCalendar';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { loading, error, data, searchCalendar } = useCalendar();
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async ({ nit, tipoContribuyente, mes, year }) => {
    try {
      await searchCalendar(nit, tipoContribuyente, mes, year);
      setSearchPerformed(true);
    } catch (err) {
      console.error('Error en búsqueda:', err);
    }
  };

  const dashboardStyle = {
    display: 'flex',
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: '#f3f4f6'
  };

  const mainContentStyle = {
    flex: 1,
    padding: '2rem'
  };

  const welcomeStyle = {
    marginBottom: '2rem'
  };

  const welcomeTitleStyle = {
    fontSize: '2rem',
    color: '#1e3a8a',
    marginBottom: '0.5rem'
  };

  const welcomeSubtitleStyle = {
    color: '#6b7280',
    fontSize: '1rem'
  };

  const errorStyle = {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    padding: '1rem',
    borderRadius: '5px',
    marginBottom: '1rem'
  };

  return (
    <div style={dashboardStyle}>
      <Sidebar />
      
      <main style={mainContentStyle}>
        <div style={welcomeStyle}>
          <h1 style={welcomeTitleStyle}>
            ¡Bienvenido, {user?.name || 'Usuario'}! 👋
          </h1>
          <p style={welcomeSubtitleStyle}>
            Consulta las obligaciones tributarias para cualquier NIT
          </p>
        </div>

        <SearchNIT onSearch={handleSearch} loading={loading} />

        {error && (
          <div style={errorStyle}>
            ❌ {error}
          </div>
        )}

        {searchPerformed && (
          <CalendarTable data={data} loading={loading} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;