export function validateNIT(nit) {
  if (!nit) {
    return {
      valid: false,
      error: 'Debe proporcionar un NIT',
    };
  }

  const cleanNIT = String(nit).replace(/[\.\-\s]/g, '');

  if (!/^\d+$/.test(cleanNIT)) {
    return {
      valid: false,
      error: 'El NIT solo debe contener números',
    };
  }

  if (cleanNIT.length !== 9) {
    return {
      valid: false,
      error: 'El NIT debe tener exactamente 9 dígitos',
    };
  }

  return {
    valid: true,
    fullNIT: cleanNIT,
    lastDigit: Number(cleanNIT.at(-1)),
  };
}