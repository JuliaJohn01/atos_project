import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLogout } from '../../Hooks/useLogout';

export default function NavBar() {
  const { state: { isAuthenticated } } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogout = () => {
    logout().then(() => {
      navigate('/'); // Navigate to home after logout
    }).catch((error) => {
      console.error("Logout error:", error);
    });
  };

  const handleWorkspace = () => {
    navigate('/workspaces');
  };

  const handleDocuments = () => {
    navigate('/documents');
  };

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">Workspace Manager</Navbar.Brand>
        <Nav className="me-auto">
          {isAuthenticated && (
            <>
              <Nav.Link onClick={handleWorkspace}>Workspaces</Nav.Link>
              <Nav.Link onClick={handleDocuments}>Documents</Nav.Link>
            </>
          )}
        </Nav>
        <Nav>
          {isAuthenticated ? (
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="outline-light" onClick={handleLogin} className="me-2">
                Login
              </Button>
              <Button variant="outline-light" onClick={handleSignup}>
                Signup
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
