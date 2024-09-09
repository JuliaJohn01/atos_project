import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import { useNavigate } from 'react-router-dom';

export default function ButtonAppBar() {
  const { user, logout } = useAuth(); // Get user and logout from AuthContext
  const navigate = useNavigate(); // For navigation

  // Handle login button click
  const handleLogin = () => {
    navigate('/login');
  };

  // Handle logout button click
  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}> {/* Set custom background color */}
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Workspace Manager {/* Update the name to fit your app */}
          </Typography>

          {user ? ( // If user is logged in
            <>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Hello, {user.name} {/* Display user's name */}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : ( // If user is not logged in
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
