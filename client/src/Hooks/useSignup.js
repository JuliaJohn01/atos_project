import { useState } from 'react';
import axios from 'axios';

const useSignup = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const signup = async (firstName, lastName, email, password, NationalId) => {
    setLoading(true);
    setErrors({});
    try {
      const response = await axios.post('http://localhost:5000/users/signup', { firstName, lastName, email, password, NationalId }, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.data.errors) {
        setErrors(response.data.errors);
      }
      if (response.data.user) {
        window.location.assign('/login');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ general: 'Signup failed, please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return { signup, errors, loading };
};

export default useSignup;
