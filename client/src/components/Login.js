import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Box } from "@mui/material";
import useLogin from '../Hooks/useLogin';

import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { loginUser } = useAuth();
  const { login, errors, loading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    await loginUser({email, password})
  };

  return (
    <Container>
      <Paper>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        {errors.general && <Typography color="error">{errors.general}</Typography>}
      </Paper>
    </Container>
  );
};

export default Login;
