import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/signup";
import Home from "./components/Home/home"; // Import the Home component
import ButtonAppBar from "./components/MainAppBar";
import WorkspaceList from "./components/WorkspaceList";
import WorkspaceDetails from "./components/workspaceDetails"
import { useAuth } from "./context/AuthContext";

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize your primary color
    },
    secondary: {
      main: '#dc004e', // Customize your secondary color
    },
  },
  spacing: 8,
});

function App() {
  const { isAuthenticated } = useAuth(); // Get the user from the context

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {isAuthenticated && <ButtonAppBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/workspaces" element={<WorkspaceList />} />
          <Route path="/workspace/:workspaceId" element={<WorkspaceDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
