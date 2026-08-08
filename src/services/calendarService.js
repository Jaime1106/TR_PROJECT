const API_BASE = '/api/calendar';

const calendarService = {
  /**
   * Consulta las obligaciones tributarias según:
   * NIT, tipo de contribuyente, mes y año.
   */
  async queryCalendar(nit, contribuyenteType, month = null, year = null) {
    const params = new URLSearchParams();

    if (nit) {
      params.set('nit', nit);
    }

    if (contribuyenteType) {
      params.set('contribuyenteType', contribuyenteType);
    }

    if (month) {
      params.set('month', month);
    }

    if (year) {
      params.set('year', year);
    }

    const response = await fetch(
      `${API_BASE}/query?${params.toString()}`
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.error || 'Error al consultar el calendario'
      );
    }

    return result;
  },

  /**
   * Obtiene los próximos vencimientos.
   */
  async getUpcoming(nit, contribuyenteType, days = 30) {
    const params = new URLSearchParams();

    if (nit) {
      params.set('nit', nit);
    }

    if (contribuyenteType) {
      params.set('contribuyenteType', contribuyenteType);
    }

    params.set('days', days);

    const response = await fetch(
      `${API_BASE}/upcoming?${params.toString()}`
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.error || 'Error al consultar próximos vencimientos'
      );
    }

    return result;
  },
};

export default calendarService;