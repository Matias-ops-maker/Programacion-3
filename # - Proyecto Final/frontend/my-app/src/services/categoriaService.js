const API_BASE_URL = "http://localhost:3001/api";

class CategoriaService {
  /**
   * Obtiene todas las categorías
   */
  async obtenerTodasLasCategorias() {
    try {
      const response = await fetch(`${API_BASE_URL}/categorias`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error HTTP! status: ${response.status}`);
      }

      const data = await response.json();
      return data.categorias || [];
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      throw new Error(
        "No se pudieron cargar las categorías. Verifica tu conexión."
      );
    }
  }

  /**
   * Obtiene una categoría por ID
   */
  async obtenerCategoriaPorId(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Categoría no encontrada");
        }
        throw new Error(`Error HTTP! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error al obtener categoría:", error);
      throw error;
    }
  }

  /**
   * Crea una nueva categoría
   */
  async crearCategoria(categoria) {
    try {
      const response = await fetch(`${API_BASE_URL}/categorias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(categoria),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Error HTTP! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error al crear categoría:", error);
      throw new Error(error.message || "No se pudo crear la categoría");
    }
  }

  /**
   * Actualiza una categoría existente
   */
  async actualizarCategoria(id, categoria) {
    try {
      const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(categoria),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Error HTTP! status: ${response.status}`
        );
      }

      // Verificar si hay contenido en la respuesta
      const text = await response.text();
      return text ? JSON.parse(text) : { success: true };
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      throw new Error(error.message || "No se pudo actualizar la categoría");
    }
  }

  /**
   * Elimina una categoría
   */
  async eliminarCategoria(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Error HTTP! status: ${response.status}`
        );
      }

      return { success: true };
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      throw new Error(error.message || "No se pudo eliminar la categoría");
    }
  }

  /**
   * Obtiene las top 5 categorías más vendidas
   */
  async obtenerCategoriasMasVendidas() {
    try {
      const response = await fetch(`${API_BASE_URL}/categorias/mas-vendidas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error HTTP! status: ${response.status}`);
      }

      const data = await response.json();
      return data.categorias || [];
    } catch (error) {
      console.error("Error al obtener categorías más vendidas:", error);
      throw new Error("No se pudieron cargar las categorías más vendidas");
    }
  }
}

// Exportar una instancia única del servicio
export default new CategoriaService();
