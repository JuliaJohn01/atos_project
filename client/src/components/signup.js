import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, Box, Alert } from '@mui/material';
import useSignup from '../Hooks/useSignup';
import AuthPage from './AuthPage';
import './Styles/signup.css'

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
    <AuthPage goToPage="/login" buttonLabel="Login" sideText="Already have an account?">
      <div className="signup-form">
        <form className="signup-form" onSubmit={handleSubmit}>
          <input 
            type="text"
            className="form-control"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="National ID"
            value={NationalId}
            onChange={(e) => setNationalId(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-dark">Sign Up</button>
        </form>
      </div>
    </AuthPage>
  );
};


export default Register;
