import { useState } from 'react';
import calendarService from '../services/calendarService';

export const useCalendar = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const searchCalendar = async (
    nit,
    contribuyenteType,
    month = null,
    year = null
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await calendarService.queryCalendar(
        nit,
        contribuyenteType,
        month,
        year
      );

      setData(result.data);

      return result.data;
    } catch (err) {
      const errorMessage =
        err?.message || 'Error al realizar la consulta';

      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setData(null);
    setError(null);
  };

  return {
    loading,
    error,
    data,
    searchCalendar,
    clearResults,
  };
};