const API_BASE_URL = "http://localhost:3001";

// Configuración base para las peticiones
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en petición API:", error);
    throw error;
  }
};

// Servicios de usuarios
export const userService = {
  // Obtener todos los usuarios
  getAllUsers: async () => {
    return await apiRequest("/api/users");
  },

  // Obtener usuario por ID
  getUserById: async (id) => {
    return await apiRequest(`/api/users/${id}`);
  },

  // Crear nuevo usuario (registro)
  createUser: async (userData) => {
    return await apiRequest("/api/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Iniciar sesión
  login: async (credentials) => {
    return await apiRequest("/api/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
};

export default userService;
