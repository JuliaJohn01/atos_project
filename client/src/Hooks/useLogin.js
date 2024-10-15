import { useCallback } from "react";
import axiosInstance from "../services/axiosInstance";
import { useAuthContext } from '../context/AuthContext';

export const useLogin = () => {
  const { dispatch } = useAuthContext();

  const loginUser = useCallback(async (userData) => {
    try {
      const response = await axiosInstance.post("/users/login", userData);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ token, user }));
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      dispatch({ type: "AUTH_ERROR" });
    }
  }, [dispatch]);

  return { loginUser };
};
