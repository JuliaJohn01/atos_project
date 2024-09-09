import React from "react";
import { createRoot } from "react-dom/client"; // Updated import for React 18
import App from "./App";
import { AuthProvider } from './context/AuthContext';
import { WorkSpaceProvider } from './context/workSpaceContext';

const container = document.getElementById("root");
const root = createRoot(container); // Create a root using React 18's API

root.render(

  <React.StrictMode>
    <AuthProvider>
    <WorkSpaceProvider> 
        <App />
    </WorkSpaceProvider>
    </AuthProvider>
  </React.StrictMode>
);
