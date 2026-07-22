import api from './api';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  register: async (data) => {
    try {
      const response = await api.post('/register', {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.passwordConfirmation,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  logout: async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      // Ignore error on logout
    }
  },
  
  getMe: async () => {
    try {
      const response = await api.get('/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};