import React, { useState } from "react";
import "../../styles/login.css"; // Adjust the path as needed
import { Link } from "react-router-dom";
import Login from './Login';

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({ email: "", password: "" });

    try {
      const res = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      console.log(data);

      if (data.errors) {
        setErrors(data.errors);
      }

      if (data.user) {
        window.location.assign('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <div className="firstName error"></div>

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <div className="lastName error"></div>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="email error">{errors.email}</div>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="password error">{errors.password}</div>

        <button type="submit">Sign Up</button>
      </form>

    </div>
  );
};

export default Register;
