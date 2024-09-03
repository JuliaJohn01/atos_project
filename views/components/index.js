import React from "react";
import { createRoot } from "react-dom/client"; // Updated import for React 18
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./Frontend/context/AuthContext"; // Adjust the path as necessary

const container = document.getElementById("root");
const root = createRoot(container); // Create a root using React 18's API

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
