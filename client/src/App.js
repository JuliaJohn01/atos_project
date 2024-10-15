import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/signup";
import Home from "./components/Home/home";
import WorkspaceList from "./components/WorkspaceList";
import WorkspaceDetails from "./components/workspaceDetails";
import DocumentList from "./components/DocumentList";
import RecycleBin from './components/RecycleBin';
import NavBar from "./components/Home/NavBar";
import { useAuthContext } from "./context/AuthContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  spacing: 8,
});

function App() {
  const { state: { isAuthenticated, loading } } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {isAuthenticated && <NavBar />}
        <Routes>
        <Route
          path="/"
          element={
            <>
           
              <Home />
 
            </>
          }
        />
          <Route path="/login" element={
            <> 
          

            <Login />
            
            </> } />
          <Route path="/signup" element={
            <>
         
            
            <SignUp />
          </>    } />
          <Route path="/workspaces" element={isAuthenticated ? <WorkspaceList /> : <Login />} />
          <Route path="/recycle-bin" element={isAuthenticated ? <RecycleBin /> : <Login />} />
          <Route path="/documents" element={isAuthenticated ? <DocumentList /> : <Login />} />
          <Route path="/workspace/:workspaceId" element={isAuthenticated ? <WorkspaceDetails /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
