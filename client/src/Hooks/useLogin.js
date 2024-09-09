import { useState } from 'react';
import axios from 'axios';

const useLogin = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    setErrors({});
    try {
      const response = await axios.post('http://localhost:5000/users/login', { email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.data.errors) {
        setErrors(response.data.errors);
      }
      if (response.data.token) {
        // Save the token to local storage
        localStorage.setItem('authToken', response.data.token);
        window.location.assign('/workspaces');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Login failed, please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return { login, errors, loading };
};

export default useLogin;
