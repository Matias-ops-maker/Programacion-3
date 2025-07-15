const API_BASE_URL = "http://localhost:3001/api";

class ProductoService {
  /**
   * Obtiene todos los productos
   */
  async obtenerTodosLosProductos() {
    try {
      const response = await fetch(`${API_BASE_URL}/productos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      // Siempre retornar un array, aunque esté vacío
      return data.productos || [];
    } catch (error) {
      console.error("Error al obtener productos:", error);

      // Si es error de red/conexión
      if (error.name === "TypeError" || error.message.includes("fetch")) {
        throw new Error(
          "No se pudo conectar con el servidor. Verifica que esté ejecutándose en localhost:3001"
        );
      }

      // Para otros errores del servidor
      throw new Error(`Error del servidor: ${error.message}`);
    }
  }

  /**
   * Obtiene un producto por ID
   */
  async obtenerProductoPorId(id) {
    try {
      console.log("🔍 Buscando producto con ID:", id);
      console.log("🔍 URL de la petición:", `${API_BASE_URL}/productos/${id}`);

      const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      console.log("🔍 Status de respuesta:", response.status);
      console.log(
        "🔍 Headers de respuesta:",
        response.headers.get("content-type")
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Producto no encontrado");
        }
        throw new Error(`Error HTTP! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("🔍 Respuesta completa del backend:", data);
      console.log("🔍 data.producto:", data.producto);
      console.log("🔍 data directamente:", data);

      // Intentar diferentes estructuras de respuesta
      if (data.producto) {
        console.log("✅ Encontrado en data.producto");
        return data.producto;
      } else if (data && typeof data === "object" && data.id) {
        console.log("✅ Encontrado directamente en data");
        return data;
      } else {
        console.log("❌ No se encontró estructura de producto válida");
        return null;
      }
    } catch (error) {
      console.error("❌ Error al obtener producto:", error);
      throw error;
    }
  }

  /**
   * Crea un nuevo producto
   */
  async crearProducto(producto) {
    try {
      // Mapear los datos al formato esperado por el backend
      const productoParaBackend = {
        nombre: producto.nombre,
        categoria_id: producto.categoria_id, // Enviar el ID de la categoría
        cantidad: producto.cantidad, // Probar con 'cantidad'
        stock: producto.cantidad, // También probar con 'stock'
        precio: producto.precio,
        estado: producto.estado || "activo",
      };

      console.log("Datos originales del formulario:", producto);
      console.log("Datos enviados al backend:", productoParaBackend);

      const response = await fetch(`${API_BASE_URL}/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(productoParaBackend),
      });

      console.log("Status de respuesta:", response.status);
      console.log(
        "Headers de respuesta:",
        response.headers.get("content-type")
      );

      if (!response.ok) {
        // Intentar obtener el error, pero manejar respuestas vacías
        let errorMessage = `Error HTTP! status: ${response.status}`;
        try {
          const errorData = await response.json();
          console.log("Error del backend:", errorData);
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          console.log("Error al parsear JSON del error:", jsonError);
          // Si no se puede parsear el JSON del error, usar el mensaje por defecto
        }
        throw new Error(errorMessage);
      }

      // Verificar si hay contenido en la respuesta
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Respuesta del backend:", data);
        return data;
      } else {
        // Si no hay JSON en la respuesta, pero el status es ok, devolver un objeto por defecto
        console.log("Respuesta sin JSON, pero exitosa");
        return { message: "Producto creado exitosamente" };
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
      throw error;
    }
  }

  /**
   * Actualiza un producto existente
   */
  async actualizarProducto(id, producto) {
    try {
      // Mapear los datos al formato esperado por el backend
      const productoParaBackend = {
        nombre: producto.nombre,
        categoria_id: producto.categoria_id, // Enviar el ID de la categoría
        cantidad: producto.cantidad, // Probar con 'cantidad'
        stock: producto.cantidad, // También probar con 'stock'
        precio: producto.precio,
        estado: producto.estado || "activo",
      };

      console.log("Datos originales para actualizar:", producto);
      console.log(
        "Datos enviados al backend para actualizar:",
        productoParaBackend
      );

      const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(productoParaBackend),
      });

      console.log("Status de respuesta:", response.status);
      console.log(
        "Headers de respuesta:",
        response.headers.get("content-type")
      );

      if (!response.ok) {
        // Intentar obtener el error, pero manejar respuestas vacías
        let errorMessage = `Error HTTP! status: ${response.status}`;
        try {
          const errorData = await response.json();
          console.log("Error del backend al actualizar:", errorData);
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          console.log("Error al parsear JSON del error:", jsonError);
          // Si no se puede parsear el JSON del error, usar el mensaje por defecto
        }
        throw new Error(errorMessage);
      }

      // Verificar si hay contenido en la respuesta
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Respuesta del backend al actualizar:", data);
        return data;
      } else {
        // Si no hay JSON en la respuesta, pero el status es ok, devolver un objeto por defecto
        console.log("Respuesta sin JSON, pero exitosa");
        return { message: "Producto actualizado exitosamente" };
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      throw error;
    }
  }

  /**
   * Elimina un producto
   */
  async eliminarProducto(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Error HTTP! status: ${response.status}`
        );
      }

      return { message: "Producto eliminado exitosamente" };
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      throw error;
    }
  }

  /**
   * Obtiene los últimos productos agregados
   */
  async obtenerUltimosProductos() {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/ultimos`, {
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
      return data.productos || [];
    } catch (error) {
      console.error("Error al obtener últimos productos:", error);
      throw error;
    }
  }

  /**
   * Obtiene los productos más vendidos
   */
  async obtenerProductosMasVendidos() {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/mas-vendidos`, {
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
      return data.productos || [];
    } catch (error) {
      console.error("Error al obtener productos más vendidos:", error);
      throw error;
    }
  }

  /**
   * Obtiene productos sin stock
   */
  async obtenerProductosSinStock() {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/sin-stock`, {
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
      return data.productos || [];
    } catch (error) {
      console.error("Error al obtener productos sin stock:", error);
      throw error;
    }
  }

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
      throw error;
    }
  }

  /**
   * Obtiene las categorías más vendidas
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
      throw error;
    }
  }
}

export default new ProductoService();
