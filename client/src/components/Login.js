import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Navigation after login
import { useLogin } from '../Hooks/useLogin'; // Custom hook for login
import AuthPage from './AuthPage'; // Custom auth page for layout
import './Styles/Login.css';

const Login = () => {
  const { loginUser } = useLogin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Reset errors before the new login attempt

    try {
      const loginSuccess = await loginUser({ email, password });
      if (loginSuccess) {
        navigate('/workspaces');
      } else {
        setErrors({ general: "Invalid credentials, please try again." });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: "Login failed due to server error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPage goToPage="/signup" buttonLabel="Sign Up" sideText="Need an account?">
      <div className="login-form login-container">
        <form className="login-container" onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button type="submit" className="btn btn-dark" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {errors.general && <div className="alert alert-danger" role="alert">
          {errors.general}
        </div>}
      </div>
    </AuthPage>
  );
};

export default Login;
