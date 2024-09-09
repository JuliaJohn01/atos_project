import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, Box, Alert } from '@mui/material';
import useSignup from '../Hooks/useSignup';

const Register = () => {
  const { signup, errors, loading } = useSignup();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [NationalId, setNationalId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(firstName, lastName, email, password, NationalId);
  };

  return (
    <Container>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="National ID"
                value={NationalId}
                onChange={(e) => setNationalId(e.target.value)}
                required
                error={!!errors.NationalId}
                helperText={errors.NationalId}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
        {errors.general && <Box sx={{ mt: 2 }}><Alert severity="error">{errors.general}</Alert></Box>}
      </Box>
    </Container>
  );
};

export default Register;
