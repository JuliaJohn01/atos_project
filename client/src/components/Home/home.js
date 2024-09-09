// src/components/Home/home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Home</h1>
      <div style={{ marginTop: "20px" }}>
        <Link to="/signup">
          <button style={{ marginRight: "10px", padding: "10px 20px" }}>
            Sign Up
          </button>
        </Link>
        <Link to="/login">
          <button style={{ padding: "10px 20px" }}>
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
