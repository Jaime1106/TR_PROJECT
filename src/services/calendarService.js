import api from './api';

const calendarService = {
  // Consultar calendario por NIT y tipo de contribuyente
  queryCalendar: async (nit, contribuyenteType, month = null, year = null) => {
    try {
      const params = { nit, contribuyenteType };
      
      if (month) params.month = month;
      if (year) params.year = year;
      
      const response = await api.get('/calendar/query', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error al conectar con el servidor' };
    }
  },

  // Obtener próximos vencimientos
  getUpcomingDeadlines: async (nit, contribuyenteType, days = 30) => {
    try {
      const response = await api.get('/calendar/upcoming', {
        params: { nit, contribuyenteType, days }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error al obtener vencimientos' };
    }
  }
};

export default calendarService;