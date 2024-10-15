import { useCallback } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate(); // For redirection

  const logout = useCallback(async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common["Authorization"];

      dispatch({ type: "LOGOUT_SUCCESS" });

      navigate('/'); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [dispatch, navigate]);

  return { logout };
};
