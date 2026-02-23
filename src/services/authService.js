const authService = {
  login: async (email, password) => {
    // Simulación
    return {
      user: { email, name: 'Usuario Demo', role: 'user' },
      token: 'demo-token-123'
    };
  }
};

export default authService;