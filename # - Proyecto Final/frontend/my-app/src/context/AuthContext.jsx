import React, { createContext, useContext, useState, useEffect } from "react";
import { userService } from "../services/userService";

const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error al cargar usuario desde localStorage:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const loginData = await userService.login({ email, password });

      // Obtener datos completos del usuario usando getAllUsers
      const allUsersResponse = await userService.getAllUsers();
      const completeUserData = allUsersResponse.users.find(
        (user) => user.id === loginData.id
      );

      // Usar los datos completos si están disponibles, si no usar los del login
      const userData = completeUserData || loginData;

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      return { success: true, user: userData };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Función para registrar nuevo usuario
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const newUser = await userService.createUser(userData);

      // Después del registro, hacer login automáticamente
      const loginResult = await login(userData.email, userData.password);

      return loginResult;
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem("user");
  };

  // Función para limpiar errores
  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
