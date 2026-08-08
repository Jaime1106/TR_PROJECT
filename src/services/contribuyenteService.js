const contribuyenteService = {
  async getTipos() {
    const response = await fetch('/api/tipos-contribuyente');

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error || 'Error al obtener los tipos de contribuyente'
      );
    }

    return data.map((tipo) => {
      const idMap = {
        gran: 'gran-contribuyente',
        iva_bimestral: 'responsable-iva-bimestral',
        iva_cuatrimestral: 'responsable-iva-cuatrimestral',
        no_iva: 'no-responsable-iva',
      };

      const frontendId = idMap[tipo.id];

      return {
        id: frontendId,
        name: getName(tipo.id),
        label: getName(tipo.id),
        description: getDescription(tipo.id),
      };
    });
  },
};

function getName(id) {
  const names = {
    gran: 'Gran Contribuyente',
    iva_bimestral: 'Responsable de IVA Bimestral',
    iva_cuatrimestral: 'Responsable de IVA Cuatrimestral',
    no_iva: 'No Responsable de IVA',
  };

  return names[id] || id;
}

function getDescription(id) {
  const descriptions = {
    gran: 'Empresas o personas calificadas como grandes contribuyentes por la DIAN',
    iva_bimestral: 'Contribuyentes que declaran IVA cada 2 meses',
    iva_cuatrimestral: 'Contribuyentes que declaran IVA cada 4 meses',
    no_iva: 'Contribuyentes no responsables del impuesto a las ventas',
  };

  return descriptions[id] || '';
}

export default contribuyenteService;