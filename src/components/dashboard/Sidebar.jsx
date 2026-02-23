// src/components/dashboard/Sidebar.jsx - Versión mínima para prueba
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ 
      width: '250px', 
      backgroundColor: '#1e3a8a', 
      color: 'white',
      padding: '1rem'
    }}>
      <h3>Menú</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/dashboard" style={{ color: 'white' }}>Dashboard</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;